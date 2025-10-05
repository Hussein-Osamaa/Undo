'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Download, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { useBusiness } from '@/lib/providers/BusinessProvider';
import { ProductService } from '@/lib/services/productService';
import { sampleProducts, sampleCategories, generateSampleCSV } from '@/lib/utils/sampleData';
import toast from 'react-hot-toast';

interface SampleDataSeederProps {
  onDataSeeded?: () => void;
}

export function SampleDataSeeder({ onDataSeeded }: SampleDataSeederProps) {
  const { currentBusiness } = useBusiness();
  const [loading, setLoading] = useState(false);
  const [seedingCategories, setSeedingCategories] = useState(false);
  const [seedingProducts, setSeedingProducts] = useState(false);

  const seedCategories = async () => {
    if (!currentBusiness) return;

    try {
      setSeedingCategories(true);
      const productService = ProductService.getInstance(currentBusiness.businessId);

      for (const category of sampleCategories) {
        await productService.createCategory({
          name: category.name,
          description: category.description,
          parentId: null,
          sortOrder: 0,
          isActive: true,
        });
      }

      toast.success('Sample categories created successfully!');
    } catch (error) {
      console.error('Error seeding categories:', error);
      toast.error('Failed to create sample categories');
    } finally {
      setSeedingCategories(false);
    }
  };

  const seedProducts = async () => {
    if (!currentBusiness) return;

    try {
      setSeedingProducts(true);
      const productService = ProductService.getInstance(currentBusiness.businessId);

      let successCount = 0;
      let errorCount = 0;

      for (const productData of sampleProducts) {
        try {
          await productService.createProduct(productData);
          successCount++;
        } catch (error) {
          console.error('Error creating product:', error);
          errorCount++;
        }
      }

      if (successCount > 0) {
        toast.success(`Successfully created ${successCount} sample products!`);
      }
      
      if (errorCount > 0) {
        toast.error(`Failed to create ${errorCount} products`);
      }

      if (onDataSeeded) {
        onDataSeeded();
      }
    } catch (error) {
      console.error('Error seeding products:', error);
      toast.error('Failed to create sample products');
    } finally {
      setSeedingProducts(false);
    }
  };

  const seedAllData = async () => {
    if (!currentBusiness) return;

    try {
      setLoading(true);
      
      // Seed categories first
      await seedCategories();
      
      // Wait a moment for categories to be created
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Then seed products
      await seedProducts();
      
    } catch (error) {
      console.error('Error seeding all data:', error);
      toast.error('Failed to seed sample data');
    } finally {
      setLoading(false);
    }
  };

  const downloadSampleCSV = () => {
    const csvContent = generateSampleCSV();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_products.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success('Sample CSV downloaded!');
  };

  return (
    <div className="bg-white rounded-lg shadow-soft p-6 border border-gray-200">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
          <Database className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Sample Data</h3>
          <p className="text-sm text-gray-600">
            Populate your system with sample data for testing
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Sample Data Overview */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Available Sample Data</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-success-500" />
              <span className="text-gray-700">{sampleProducts.length} Sample Products</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-success-500" />
              <span className="text-gray-700">{sampleCategories.length} Categories</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-success-500" />
              <span className="text-gray-700">Product Variants</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={seedAllData}
            disabled={loading}
            className="btn-primary p-4 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="loading-dots">
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Seed All Sample Data</span>
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={downloadSampleCSV}
            className="flex items-center justify-center space-x-2 px-4 py-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4 text-gray-600" />
            <span className="text-gray-700">Download Sample CSV</span>
          </motion.button>
        </div>

        {/* Individual Actions */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium text-gray-900 mb-3">Individual Actions</h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={seedCategories}
              disabled={seedingCategories}
              className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
            >
              {seedingCategories ? 'Creating...' : 'Seed Categories Only'}
            </button>
            
            <button
              onClick={seedProducts}
              disabled={seedingProducts}
              className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50"
            >
              {seedingProducts ? 'Creating...' : 'Seed Products Only'}
            </button>
          </div>
        </div>

        {/* Sample Data Preview */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium text-gray-900 mb-3">Sample Products Preview</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sampleProducts.slice(0, 6).map((product, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-start space-x-3">
                  {product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Database className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-gray-900 text-sm truncate">
                      {product.name}
                    </h5>
                    <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                    <p className="text-xs text-gray-500">
                      ${product.pricing.price.toFixed(2)} • {product.category}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {sampleProducts.length > 6 && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              ... and {sampleProducts.length - 6} more products
            </p>
          )}
        </div>

        {/* Info Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-800">Sample Data Notice</h4>
              <p className="text-sm text-blue-700 mt-1">
                This will create realistic sample data including products with variants, 
                categories, and inventory tracking. Perfect for testing all features of your system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
