'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Package,
  AlertTriangle,
  XCircle,
  CheckCircle,
  MoreVertical,
  Grid,
  List,
  Download,
  Upload,
} from 'lucide-react';
import { useBusiness } from '@/lib/providers/BusinessProvider';
import { ProductService } from '@/lib/services/productService';
import { Product, ProductFilters } from '@/types/product';
import { ProductCard } from './ProductCard';
import { ProductModal } from './ProductModal';
import { BulkImportModal } from './BulkImportModal';

interface ProductListProps {
  onProductSelect?: (product: Product) => void;
  selectionMode?: boolean;
}

export function ProductList({ onProductSelect, selectionMode = false }: ProductListProps) {
  const { currentBusiness } = useBusiness();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: '',
    status: '',
    priceRange: { min: 0, max: 10000 },
    stockStatus: 'all',
    tags: [],
    sortBy: 'name',
    sortOrder: 'asc',
  });

  useEffect(() => {
    if (currentBusiness) {
      loadProducts();
    }
  }, [currentBusiness]);

  useEffect(() => {
    applyFilters();
  }, [products, filters]);

  const loadProducts = async () => {
    if (!currentBusiness) return;

    try {
      setLoading(true);
      const productService = ProductService.getInstance(currentBusiness.businessId);
      const productList = await productService.getProducts();
      setProducts(productList);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.sku.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.barcode.toLowerCase().includes(searchTerm)
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(product => product.status === filters.status);
    }

    // Stock status filter
    if (filters.stockStatus !== 'all') {
      filtered = filtered.filter(product => {
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

    // Price range filter
    filtered = filtered.filter(product =>
      product.pricing.price >= filters.priceRange.min &&
      product.pricing.price <= filters.priceRange.max
    );

    // Sort
    filtered.sort((a, b) => {
      let aValue: any = a[filters.sortBy];
      let bValue: any = b[filters.sortBy];

      if (filters.sortBy === 'pricing.price') {
        aValue = a.pricing.price;
        bValue = b.pricing.price;
      } else if (filters.sortBy === 'inventory.quantity') {
        aValue = a.inventory.quantity;
        bValue = b.inventory.quantity;
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProducts(filtered);
  };

  const handleProductClick = (product: Product) => {
    if (selectionMode && onProductSelect) {
      onProductSelect(product);
    } else {
      setSelectedProduct(product);
      setEditingProduct(product);
      setShowProductModal(true);
    }
  };

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setShowProductModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleDeleteProduct = async (product: Product) => {
    if (!currentBusiness || !window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return;
    }

    try {
      const productService = ProductService.getInstance(currentBusiness.businessId);
      await productService.deleteProduct(product.productId);
      await loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const getStockStatus = (product: Product) => {
    if (!product.inventory.trackInventory) return 'not_tracked';
    if (product.inventory.quantity <= 0) return 'out_of_stock';
    if (product.inventory.quantity <= product.inventory.lowStockAlert) return 'low_stock';
    return 'in_stock';
  };

  const getStockStatusIcon = (status: string) => {
    switch (status) {
      case 'out_of_stock':
        return <XCircle className="w-4 h-4 text-danger-500" />;
      case 'low_stock':
        return <AlertTriangle className="w-4 h-4 text-warning-500" />;
      case 'in_stock':
        return <CheckCircle className="w-4 h-4 text-success-500" />;
      default:
        return <Package className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStockStatusText = (status: string) => {
    switch (status) {
      case 'out_of_stock':
        return 'Out of Stock';
      case 'low_stock':
        return 'Low Stock';
      case 'in_stock':
        return 'In Stock';
      default:
        return 'Not Tracked';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          <p className="text-gray-600">
            {filteredProducts.length} of {products.length} products
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowBulkImport(true)}
            className="flex items-center px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import
          </button>
          
          <button
            onClick={() => {/* Export functionality */}}
            className="flex items-center px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          
          <button
            onClick={handleCreateProduct}
            className="btn-primary px-4 py-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-soft p-4 border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products by name, SKU, or barcode..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-3 py-2 rounded-lg border transition-colors ${
                showFilters
                  ? 'bg-primary-50 border-primary-200 text-primary-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>

            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary-50 text-primary-700' : 'text-gray-500'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary-50 text-primary-700' : 'text-gray-500'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="books">Books</option>
                    <option value="home">Home & Garden</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
                  <select
                    value={filters.stockStatus}
                    onChange={(e) => setFilters({ ...filters, stockStatus: e.target.value as any })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="all">All Stock</option>
                    <option value="in_stock">In Stock</option>
                    <option value="low_stock">Low Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="name">Name</option>
                    <option value="pricing.price">Price</option>
                    <option value="inventory.quantity">Quantity</option>
                    <option value="createdAt">Date Created</option>
                    <option value="updatedAt">Last Updated</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                  <select
                    value={filters.sortOrder}
                    onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value as any })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Products Grid/List */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">
            {filters.search || filters.category || filters.status
              ? 'Try adjusting your filters to see more products.'
              : 'Get started by adding your first product.'}
          </p>
          <button
            onClick={handleCreateProduct}
            className="btn-primary px-6 py-3"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Product
          </button>
        </div>
      ) : (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }>
          <AnimatePresence>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.productId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                {viewMode === 'grid' ? (
                  <ProductCard
                    product={product}
                    onClick={() => handleProductClick(product)}
                    onEdit={() => handleEditProduct(product)}
                    onDelete={() => handleDeleteProduct(product)}
                    selectionMode={selectionMode}
                  />
                ) : (
                  <div className="bg-white rounded-lg shadow-soft p-4 border border-gray-200 hover:shadow-medium transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          {product.images.length > 0 ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          ) : (
                            <Package className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{product.name}</h3>
                          <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm font-medium text-gray-900">
                              ${product.pricing.price.toFixed(2)}
                            </span>
                            <div className="flex items-center space-x-1">
                              {getStockStatusIcon(getStockStatus(product))}
                              <span className="text-sm text-gray-500">
                                {getStockStatusText(getStockStatus(product))}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.status === 'active'
                            ? 'bg-success-100 text-success-800'
                            : product.status === 'draft'
                            ? 'bg-warning-100 text-warning-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {product.status}
                        </span>
                        
                        <div className="relative">
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <MoreVertical className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Modals */}
      {showProductModal && (
        <ProductModal
          product={editingProduct}
          isOpen={showProductModal}
          onClose={() => {
            setShowProductModal(false);
            setEditingProduct(null);
          }}
          onSave={loadProducts}
        />
      )}

      {showBulkImport && (
        <BulkImportModal
          isOpen={showBulkImport}
          onClose={() => setShowBulkImport(false)}
          onImport={loadProducts}
        />
      )}
    </div>
  );
}
