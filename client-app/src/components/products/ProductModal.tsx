'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  X,
  Upload,
  Image as ImageIcon,
  Plus,
  Trash2,
  Save,
  DollarSign,
  Package,
  Tag,
  Hash,
  AlertCircle,
} from 'lucide-react';
import { useBusiness } from '@/lib/providers/BusinessProvider';
import { ProductService } from '@/lib/services/productService';
import { Product, ProductVariant } from '@/types/product';
import toast from 'react-hot-toast';

const productSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  description: z.string().optional(),
  sku: z.string().min(1, 'SKU is required'),
  barcode: z.string().optional(),
  pricing: z.object({
    cost: z.number().min(0, 'Cost must be positive'),
    price: z.number().min(0, 'Price must be positive'),
    compareAtPrice: z.number().min(0).nullable(),
    currency: z.string().min(3),
  }),
  inventory: z.object({
    trackInventory: z.boolean(),
    quantity: z.number().min(0),
    lowStockAlert: z.number().min(0),
    stockLocations: z.array(z.object({
      location: z.string(),
      quantity: z.number(),
    })),
  }),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()),
  images: z.array(z.string()),
  variants: z.array(z.object({
    variantId: z.string(),
    name: z.string(),
    sku: z.string(),
    barcode: z.string(),
    price: z.number(),
    cost: z.number(),
    quantity: z.number(),
    attributes: z.record(z.string()),
    images: z.array(z.string()),
    isActive: z.boolean(),
  })),
  status: z.enum(['active', 'draft', 'archived']),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export function ProductModal({ product, isOpen, onClose, onSave }: ProductModalProps) {
  const { currentBusiness } = useBusiness();
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'pricing' | 'inventory' | 'variants'>('basic');

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      sku: '',
      barcode: '',
      pricing: {
        cost: 0,
        price: 0,
        compareAtPrice: null,
        currency: 'USD',
      },
      inventory: {
        trackInventory: true,
        quantity: 0,
        lowStockAlert: 10,
        stockLocations: [{ location: 'Main Warehouse', quantity: 0 }],
      },
      category: '',
      tags: [],
      images: [],
      variants: [],
      status: 'active',
    },
  });

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control,
    name: 'variants',
  });

  const watchTrackInventory = watch('inventory.trackInventory');
  const watchImages = watch('images');

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        sku: product.sku,
        barcode: product.barcode,
        pricing: product.pricing,
        inventory: product.inventory,
        category: product.category,
        tags: product.tags,
        images: product.images,
        variants: product.variants,
        status: product.status,
      });
    } else {
      reset({
        name: '',
        description: '',
        sku: '',
        barcode: '',
        pricing: {
          cost: 0,
          price: 0,
          compareAtPrice: null,
          currency: 'USD',
        },
        inventory: {
          trackInventory: true,
          quantity: 0,
          lowStockAlert: 10,
          stockLocations: [{ location: 'Main Warehouse', quantity: 0 }],
        },
        category: '',
        tags: [],
        images: [],
        variants: [],
        status: 'active',
      });
    }
  }, [product, reset]);

  const onSubmit = async (data: ProductFormData) => {
    if (!currentBusiness) return;

    try {
      setLoading(true);
      const productService = ProductService.getInstance(currentBusiness.businessId);

      if (product) {
        // Update existing product
        await productService.updateProduct(product.productId, data);
        toast.success('Product updated successfully!');
      } else {
        // Create new product
        await productService.createProduct(data);
        toast.success('Product created successfully!');
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (files: FileList) => {
    if (!currentBusiness) return;

    try {
      setUploadingImages(true);
      const productService = ProductService.getInstance(currentBusiness.businessId);
      const uploadPromises = Array.from(files).map(file =>
        productService.uploadProductImage(file, product?.productId || 'temp')
      );

      const uploadedUrls = await Promise.all(uploadPromises);
      setValue('images', [...watchImages, ...uploadedUrls], { shouldDirty: true });
      toast.success('Images uploaded successfully!');
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images. Please try again.');
    } finally {
      setUploadingImages(false);
    }
  };

  const handleImageRemove = (index: number) => {
    const newImages = watchImages.filter((_, i) => i !== index);
    setValue('images', newImages, { shouldDirty: true });
  };

  const addVariant = () => {
    const newVariant: ProductVariant = {
      variantId: `variant_${Date.now()}`,
      name: '',
      sku: '',
      barcode: '',
      price: watch('pricing.price'),
      cost: watch('pricing.cost'),
      quantity: 0,
      attributes: {},
      images: [],
      isActive: true,
    };
    appendVariant(newVariant);
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Package },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'variants', label: 'Variants', icon: Tag },
  ] as const;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-xl shadow-strong w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-auto">
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <AnimatePresence mode="wait">
                {activeTab === 'basic' && (
                  <motion.div
                    key="basic"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="form-label">Product Name *</label>
                        <input
                          {...register('name')}
                          type="text"
                          className="form-input"
                          placeholder="Enter product name"
                        />
                        {errors.name && (
                          <p className="form-error">{errors.name.message}</p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="form-label">Description</label>
                        <textarea
                          {...register('description')}
                          rows={3}
                          className="form-input"
                          placeholder="Enter product description"
                        />
                      </div>

                      <div>
                        <label className="form-label">SKU *</label>
                        <input
                          {...register('sku')}
                          type="text"
                          className="form-input"
                          placeholder="Enter SKU"
                        />
                        {errors.sku && (
                          <p className="form-error">{errors.sku.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="form-label">Barcode</label>
                        <input
                          {...register('barcode')}
                          type="text"
                          className="form-input"
                          placeholder="Enter barcode"
                        />
                      </div>

                      <div>
                        <label className="form-label">Category *</label>
                        <select
                          {...register('category')}
                          className="form-input"
                        >
                          <option value="">Select category</option>
                          <option value="electronics">Electronics</option>
                          <option value="clothing">Clothing</option>
                          <option value="books">Books</option>
                          <option value="home">Home & Garden</option>
                          <option value="sports">Sports & Outdoors</option>
                          <option value="beauty">Beauty & Health</option>
                          <option value="automotive">Automotive</option>
                          <option value="toys">Toys & Games</option>
                        </select>
                        {errors.category && (
                          <p className="form-error">{errors.category.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="form-label">Status</label>
                        <select
                          {...register('status')}
                          className="form-input"
                        >
                          <option value="active">Active</option>
                          <option value="draft">Draft</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </div>

                    {/* Images */}
                    <div>
                      <label className="form-label">Product Images</label>
                      <div className="mt-2">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {watchImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image}
                                alt={`Product ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg border border-gray-200"
                              />
                              <button
                                type="button"
                                onClick={() => handleImageRemove(index)}
                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          
                          <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer">
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                              className="hidden"
                            />
                            {uploadingImages ? (
                              <div className="loading-dots">
                                <div></div>
                                <div></div>
                                <div></div>
                              </div>
                            ) : (
                              <>
                                <Upload className="w-6 h-6 text-gray-400 mb-1" />
                                <span className="text-xs text-gray-500">Upload</span>
                              </>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'pricing' && (
                  <motion.div
                    key="pricing"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="form-label">Cost Price</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            {...register('pricing.cost', { valueAsNumber: true })}
                            type="number"
                            step="0.01"
                            className="form-input pl-10"
                            placeholder="0.00"
                          />
                        </div>
                        {errors.pricing?.cost && (
                          <p className="form-error">{errors.pricing.cost.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="form-label">Selling Price *</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            {...register('pricing.price', { valueAsNumber: true })}
                            type="number"
                            step="0.01"
                            className="form-input pl-10"
                            placeholder="0.00"
                          />
                        </div>
                        {errors.pricing?.price && (
                          <p className="form-error">{errors.pricing.price.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="form-label">Compare at Price</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            {...register('pricing.compareAtPrice', { valueAsNumber: true })}
                            type="number"
                            step="0.01"
                            className="form-input pl-10"
                            placeholder="0.00"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="form-label">Currency</label>
                        <select
                          {...register('pricing.currency')}
                          className="form-input"
                        >
                          <option value="USD">USD - US Dollar</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="GBP">GBP - British Pound</option>
                          <option value="CAD">CAD - Canadian Dollar</option>
                          <option value="AUD">AUD - Australian Dollar</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'inventory' && (
                  <motion.div
                    key="inventory"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <input
                        {...register('inventory.trackInventory')}
                        type="checkbox"
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label className="text-sm font-medium text-gray-700">
                        Track inventory for this product
                      </label>
                    </div>

                    {watchTrackInventory && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="form-label">Quantity in Stock</label>
                            <input
                              {...register('inventory.quantity', { valueAsNumber: true })}
                              type="number"
                              className="form-input"
                              placeholder="0"
                            />
                          </div>

                          <div>
                            <label className="form-label">Low Stock Alert</label>
                            <input
                              {...register('inventory.lowStockAlert', { valueAsNumber: true })}
                              type="number"
                              className="form-input"
                              placeholder="10"
                            />
                          </div>
                        </div>

                        <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="w-5 h-5 text-warning-600 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium text-warning-800">Low Stock Alert</h4>
                              <p className="text-sm text-warning-700 mt-1">
                                You'll be notified when the stock level falls below this number.
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}

                {activeTab === 'variants' && (
                  <motion.div
                    key="variants"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Product Variants</h3>
                      <button
                        type="button"
                        onClick={addVariant}
                        className="btn-primary px-4 py-2"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Variant
                      </button>
                    </div>

                    {variantFields.length === 0 ? (
                      <div className="text-center py-8">
                        <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">No variants yet</h4>
                        <p className="text-gray-600 mb-4">
                          Add variants for different sizes, colors, or styles of this product.
                        </p>
                        <button
                          type="button"
                          onClick={addVariant}
                          className="btn-primary px-6 py-3"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Your First Variant
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {variantFields.map((field, index) => (
                          <div key={field.id} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-medium text-gray-900">Variant {index + 1}</h4>
                              <button
                                type="button"
                                onClick={() => removeVariant(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="form-label">Variant Name</label>
                                <input
                                  {...register(`variants.${index}.name`)}
                                  type="text"
                                  className="form-input"
                                  placeholder="e.g., Large Red"
                                />
                              </div>

                              <div>
                                <label className="form-label">SKU</label>
                                <input
                                  {...register(`variants.${index}.sku`)}
                                  type="text"
                                  className="form-input"
                                  placeholder="Enter SKU"
                                />
                              </div>

                              <div>
                                <label className="form-label">Barcode</label>
                                <input
                                  {...register(`variants.${index}.barcode`)}
                                  type="text"
                                  className="form-input"
                                  placeholder="Enter barcode"
                                />
                              </div>

                              <div>
                                <label className="form-label">Price</label>
                                <input
                                  {...register(`variants.${index}.price`, { valueAsNumber: true })}
                                  type="number"
                                  step="0.01"
                                  className="form-input"
                                  placeholder="0.00"
                                />
                              </div>

                              <div>
                                <label className="form-label">Cost</label>
                                <input
                                  {...register(`variants.${index}.cost`, { valueAsNumber: true })}
                                  type="number"
                                  step="0.01"
                                  className="form-input"
                                  placeholder="0.00"
                                />
                              </div>

                              <div>
                                <label className="form-label">Quantity</label>
                                <input
                                  {...register(`variants.${index}.quantity`, { valueAsNumber: true })}
                                  type="number"
                                  className="form-input"
                                  placeholder="0"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary px-6 py-2 flex items-center"
              >
                {loading ? (
                  <div className="loading-dots">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {product ? 'Update Product' : 'Create Product'}
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
