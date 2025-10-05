'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  XCircle,
  CheckCircle,
  MoreVertical,
  DollarSign,
  Hash,
} from 'lucide-react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  selectionMode?: boolean;
}

export function ProductCard({ product, onClick, onEdit, onDelete, selectionMode = false }: ProductCardProps) {
  const getStockStatus = () => {
    if (!product.inventory.trackInventory) return 'not_tracked';
    if (product.inventory.quantity <= 0) return 'out_of_stock';
    if (product.inventory.quantity <= product.inventory.lowStockAlert) return 'low_stock';
    return 'in_stock';
  };

  const getStockStatusConfig = (status: string) => {
    switch (status) {
      case 'out_of_stock':
        return {
          icon: <XCircle className="w-4 h-4" />,
          text: 'Out of Stock',
          color: 'text-danger-600 bg-danger-50',
          borderColor: 'border-danger-200',
        };
      case 'low_stock':
        return {
          icon: <AlertTriangle className="w-4 h-4" />,
          text: 'Low Stock',
          color: 'text-warning-600 bg-warning-50',
          borderColor: 'border-warning-200',
        };
      case 'in_stock':
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          text: 'In Stock',
          color: 'text-success-600 bg-success-50',
          borderColor: 'border-success-200',
        };
      default:
        return {
          icon: <Package className="w-4 h-4" />,
          text: 'Not Tracked',
          color: 'text-gray-600 bg-gray-50',
          borderColor: 'border-gray-200',
        };
    }
  };

  const getStatusConfig = () => {
    switch (product.status) {
      case 'active':
        return {
          text: 'Active',
          color: 'bg-success-100 text-success-800',
        };
      case 'draft':
        return {
          text: 'Draft',
          color: 'bg-warning-100 text-warning-800',
        };
      case 'archived':
        return {
          text: 'Archived',
          color: 'bg-gray-100 text-gray-800',
        };
      default:
        return {
          text: 'Unknown',
          color: 'bg-gray-100 text-gray-800',
        };
    }
  };

  const stockStatus = getStockStatus();
  const stockConfig = getStockStatusConfig(stockStatus);
  const statusConfig = getStatusConfig();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: product.pricing.currency || 'USD',
    }).format(price);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-white rounded-lg shadow-soft border-2 border-transparent hover:shadow-medium transition-all duration-200 cursor-pointer group ${
        selectionMode ? 'hover:border-primary-300' : ''
      }`}
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="relative">
        <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
          {product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>

        {/* Status Badge */}
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
            {statusConfig.text}
          </span>
        </div>

        {/* Stock Status Badge */}
        <div className="absolute top-2 right-2">
          <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${stockConfig.color} ${stockConfig.borderColor} border`}>
            {stockConfig.icon}
            <span>{stockConfig.text}</span>
          </div>
        </div>

        {/* Action Menu */}
        {!selectionMode && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex space-x-1">
              {onEdit && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                  }}
                  className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50"
                >
                  <Edit className="w-3 h-3 text-gray-600" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  className="p-1.5 bg-white rounded-full shadow-md hover:bg-red-50"
                >
                  <Trash2 className="w-3 h-3 text-red-600" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-xs text-gray-500 mb-2 line-clamp-2">
          {product.description}
        </p>

        {/* SKU */}
        <div className="flex items-center space-x-1 mb-2">
          <Hash className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-500 font-mono">{product.sku}</span>
        </div>

        {/* Price and Quantity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <DollarSign className="w-3 h-3 text-gray-400" />
            <span className="text-sm font-semibold text-gray-900">
              {formatPrice(product.pricing.price)}
            </span>
            {product.pricing.compareAtPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.pricing.compareAtPrice)}
              </span>
            )}
          </div>

          {product.inventory.trackInventory && (
            <div className="text-xs text-gray-500">
              Qty: {product.inventory.quantity}
            </div>
          )}
        </div>

        {/* Category */}
        {product.category && (
          <div className="mt-2">
            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {product.category}
            </span>
          </div>
        )}

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="inline-block px-1.5 py-0.5 bg-blue-100 text-blue-600 text-xs rounded"
              >
                {tag}
              </span>
            ))}
            {product.tags.length > 2 && (
              <span className="inline-block px-1.5 py-0.5 bg-gray-100 text-gray-500 text-xs rounded">
                +{product.tags.length - 2} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {!selectionMode && (
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              Created {new Date(product.metadata.createdAt).toLocaleDateString()}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
              className="flex items-center space-x-1 text-primary-600 hover:text-primary-700"
            >
              <Eye className="w-3 h-3" />
              <span>View</span>
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
