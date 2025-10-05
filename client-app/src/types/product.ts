export interface Product {
  productId: string;
  businessId: string;
  name: string;
  description: string;
  sku: string;
  barcode: string;
  pricing: {
    cost: number;
    price: number;
    compareAtPrice: number | null;
    currency: string;
  };
  inventory: {
    trackInventory: boolean;
    quantity: number;
    lowStockAlert: number;
    stockLocations: Array<{
      location: string;
      quantity: number;
    }>;
  };
  category: string;
  tags: string[];
  images: string[];
  variants: ProductVariant[];
  status: 'active' | 'draft' | 'archived';
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
    createdBy: string;
  };
}

export interface ProductVariant {
  variantId: string;
  name: string;
  sku: string;
  barcode: string;
  price: number;
  cost: number;
  quantity: number;
  attributes: {
    [key: string]: string; // e.g., { "Size": "Large", "Color": "Red" }
  };
  images: string[];
  isActive: boolean;
}

export interface ProductCategory {
  categoryId: string;
  businessId: string;
  name: string;
  description: string;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
  metadata: {
    createdAt: string;
    updatedAt: string;
  };
}

export interface StockMovement {
  movementId: string;
  productId: string;
  businessId: string;
  type: 'in' | 'out' | 'adjustment' | 'transfer';
  quantity: number;
  reason: string;
  reference: string; // Order ID, Adjustment ID, etc.
  location: string;
  performedBy: string;
  metadata: {
    createdAt: string;
  };
}

export interface ProductFilters {
  search: string;
  category: string;
  status: string;
  priceRange: {
    min: number;
    max: number;
  };
  stockStatus: 'all' | 'in_stock' | 'low_stock' | 'out_of_stock';
  tags: string[];
  sortBy: 'name' | 'price' | 'quantity' | 'createdAt' | 'updatedAt';
  sortOrder: 'asc' | 'desc';
}

export interface BulkImportResult {
  success: number;
  errors: Array<{
    row: number;
    error: string;
    data: any;
  }>;
  warnings: Array<{
    row: number;
    warning: string;
    data: any;
  }>;
}

export interface ProductStats {
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  totalValue: number;
  averagePrice: number;
  topCategories: Array<{
    category: string;
    count: number;
  }>;
}
