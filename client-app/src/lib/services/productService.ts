import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  writeBatch,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/config';
import { Product, ProductCategory, StockMovement, ProductFilters, ProductStats } from '@/types/product';

export class ProductService {
  private static instance: ProductService;
  private businessId: string;

  constructor(businessId: string) {
    this.businessId = businessId;
  }

  static getInstance(businessId: string): ProductService {
    if (!ProductService.instance || ProductService.instance.businessId !== businessId) {
      ProductService.instance = new ProductService(businessId);
    }
    return ProductService.instance;
  }

  // Product CRUD Operations
  async getProducts(filters: Partial<ProductFilters> = {}): Promise<Product[]> {
    try {
      let q = query(
        collection(db, 'businesses', this.businessId, 'products'),
        orderBy(filters.sortBy || 'createdAt', filters.sortOrder || 'desc')
      );

      // Apply filters
      if (filters.status) {
        q = query(q, where('status', '==', filters.status));
      }
      if (filters.category) {
        q = query(q, where('category', '==', filters.category));
      }

      const snapshot = await getDocs(q);
      let products = snapshot.docs.map(doc => ({
        productId: doc.id,
        ...doc.data()
      })) as Product[];

      // Apply client-side filters
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        products = products.filter(product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.sku.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
        );
      }

      if (filters.stockStatus && filters.stockStatus !== 'all') {
        products = products.filter(product => {
          switch (filters.stockStatus) {
            case 'in_stock':
              return product.inventory.quantity > product.inventory.lowStockAlert;
            case 'low_stock':
              return product.inventory.quantity <= product.inventory.lowStockAlert && product.inventory.quantity > 0;
            case 'out_of_stock':
              return product.inventory.quantity <= 0;
            default:
              return true;
          }
        });
      }

      return products;
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  }

  async getProduct(productId: string): Promise<Product | null> {
    try {
      const docRef = doc(db, 'businesses', this.businessId, 'products', productId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          productId: docSnap.id,
          ...docSnap.data()
        } as Product;
      }
      return null;
    } catch (error) {
      console.error('Error getting product:', error);
      throw error;
    }
  }

  async createProduct(productData: Omit<Product, 'productId' | 'businessId' | 'metadata'>): Promise<string> {
    try {
      const product: Omit<Product, 'productId'> = {
        ...productData,
        businessId: this.businessId,
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: 'current-user-id', // This should come from auth context
        }
      };

      const docRef = await addDoc(collection(db, 'businesses', this.businessId, 'products'), product);
      return docRef.id;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async updateProduct(productId: string, updates: Partial<Product>): Promise<void> {
    try {
      const docRef = doc(db, 'businesses', this.businessId, 'products', productId);
      await updateDoc(docRef, {
        ...updates,
        'metadata.updatedAt': new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    try {
      // Get product to delete associated images
      const product = await this.getProduct(productId);
      if (product) {
        // Delete product images from storage
        for (const imageUrl of product.images) {
          try {
            const imageRef = ref(storage, imageUrl);
            await deleteObject(imageRef);
          } catch (error) {
            console.warn('Error deleting image:', error);
          }
        }
      }

      // Delete product document
      const docRef = doc(db, 'businesses', this.businessId, 'products', productId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  // Real-time product updates
  subscribeToProducts(
    callback: (products: Product[]) => void,
    filters: Partial<ProductFilters> = {}
  ): () => void {
    let q = query(
      collection(db, 'businesses', this.businessId, 'products'),
      orderBy(filters.sortBy || 'createdAt', filters.sortOrder || 'desc')
    );

    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }

    return onSnapshot(q, (snapshot) => {
      let products = snapshot.docs.map(doc => ({
        productId: doc.id,
        ...doc.data()
      })) as Product[];

      // Apply client-side filters
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        products = products.filter(product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.sku.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
        );
      }

      callback(products);
    });
  }

  // Inventory Management
  async updateStock(productId: string, newQuantity: number, reason: string): Promise<void> {
    try {
      const product = await this.getProduct(productId);
      if (!product) throw new Error('Product not found');

      const oldQuantity = product.inventory.quantity;
      const quantityChange = newQuantity - oldQuantity;

      // Update product quantity
      await this.updateProduct(productId, {
        inventory: {
          ...product.inventory,
          quantity: newQuantity
        }
      });

      // Record stock movement
      await this.recordStockMovement({
        productId,
        businessId: this.businessId,
        type: quantityChange > 0 ? 'in' : 'out',
        quantity: Math.abs(quantityChange),
        reason,
        reference: 'manual_adjustment',
        location: 'main_warehouse',
        performedBy: 'current-user-id', // This should come from auth context
        metadata: {
          createdAt: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Error updating stock:', error);
      throw error;
    }
  }

  async recordStockMovement(movement: Omit<StockMovement, 'movementId'>): Promise<string> {
    try {
      const docRef = await addDoc(
        collection(db, 'businesses', this.businessId, 'stockMovements'),
        movement
      );
      return docRef.id;
    } catch (error) {
      console.error('Error recording stock movement:', error);
      throw error;
    }
  }

  // Image Management
  async uploadProductImage(file: File, productId: string): Promise<string> {
    try {
      const fileName = `${productId}_${Date.now()}_${file.name}`;
      const imageRef = ref(storage, `products/${this.businessId}/${fileName}`);
      
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  async deleteProductImage(imageUrl: string): Promise<void> {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }

  // Categories
  async getCategories(): Promise<ProductCategory[]> {
    try {
      const q = query(
        collection(db, 'businesses', this.businessId, 'categories'),
        orderBy('sortOrder')
      );
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        categoryId: doc.id,
        ...doc.data()
      })) as ProductCategory[];
    } catch (error) {
      console.error('Error getting categories:', error);
      throw error;
    }
  }

  async createCategory(categoryData: Omit<ProductCategory, 'categoryId' | 'businessId' | 'metadata'>): Promise<string> {
    try {
      const category: Omit<ProductCategory, 'categoryId'> = {
        ...categoryData,
        businessId: this.businessId,
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      };

      const docRef = await addDoc(collection(db, 'businesses', this.businessId, 'categories'), category);
      return docRef.id;
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  }

  // Product Statistics
  async getProductStats(): Promise<ProductStats> {
    try {
      const products = await this.getProducts();
      
      const stats: ProductStats = {
        totalProducts: products.length,
        activeProducts: products.filter(p => p.status === 'active').length,
        lowStockProducts: products.filter(p => 
          p.inventory.trackInventory && 
          p.inventory.quantity <= p.inventory.lowStockAlert && 
          p.inventory.quantity > 0
        ).length,
        outOfStockProducts: products.filter(p => 
          p.inventory.trackInventory && p.inventory.quantity <= 0
        ).length,
        totalValue: products.reduce((sum, p) => sum + (p.pricing.cost * p.inventory.quantity), 0),
        averagePrice: products.length > 0 
          ? products.reduce((sum, p) => sum + p.pricing.price, 0) / products.length 
          : 0,
        topCategories: []
      };

      // Calculate top categories
      const categoryCount: { [key: string]: number } = {};
      products.forEach(product => {
        categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
      });

      stats.topCategories = Object.entries(categoryCount)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      return stats;
    } catch (error) {
      console.error('Error getting product stats:', error);
      throw error;
    }
  }

  // Bulk Operations
  async bulkUpdateProducts(updates: Array<{ productId: string; updates: Partial<Product> }>): Promise<void> {
    try {
      const batch = writeBatch(db);
      
      updates.forEach(({ productId, updates: productUpdates }) => {
        const docRef = doc(db, 'businesses', this.businessId, 'products', productId);
        batch.update(docRef, {
          ...productUpdates,
          'metadata.updatedAt': new Date().toISOString(),
        });
      });

      await batch.commit();
    } catch (error) {
      console.error('Error bulk updating products:', error);
      throw error;
    }
  }
}
