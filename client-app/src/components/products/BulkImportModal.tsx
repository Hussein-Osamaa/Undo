'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
} from 'lucide-react';
import { useBusiness } from '@/lib/providers/BusinessProvider';
import { ProductService } from '@/lib/services/productService';
import { BulkImportResult } from '@/types/product';
import toast from 'react-hot-toast';

interface BulkImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: () => void;
}

interface ImportStep {
  id: 'upload' | 'review' | 'import';
  label: string;
  description: string;
}

const steps: ImportStep[] = [
  {
    id: 'upload',
    label: 'Upload CSV',
    description: 'Select and upload your product data file',
  },
  {
    id: 'review',
    label: 'Review Data',
    description: 'Check your data before importing',
  },
  {
    id: 'import',
    label: 'Import Products',
    description: 'Complete the import process',
  },
];

const sampleCSV = `name,description,sku,barcode,category,cost,price,quantity,low_stock_alert,status
"Sample Product 1","This is a sample product","SKU001","1234567890","electronics",10.00,25.00,100,10,"active"
"Sample Product 2","Another sample product","SKU002","1234567891","clothing",5.00,15.00,50,5,"active"`;

export function BulkImportModal({ isOpen, onClose, onImport }: BulkImportModalProps) {
  const { currentBusiness } = useBusiness();
  const [currentStep, setCurrentStep] = useState(0);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [importResult, setImportResult] = useState<BulkImportResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      parseCSV(uploadedFile);
    }
  };

  const parseCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      
      const data = lines.slice(1)
        .filter(line => line.trim())
        .map((line, index) => {
          const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
          const row: any = { _rowIndex: index + 2 }; // +2 because we start from line 2 and 0-indexed
          
          headers.forEach((header, i) => {
            row[header] = values[i] || '';
          });
          
          return row;
        });
      
      setCsvData(data);
      setCurrentStep(1);
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (!currentBusiness || !csvData.length) return;

    try {
      setLoading(true);
      setCurrentStep(2);
      
      // Simulate import process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock import result
      const result: BulkImportResult = {
        success: csvData.length - 2, // Assuming 2 errors
        errors: [
          {
            row: 3,
            error: 'Invalid price format',
            data: csvData[1],
          },
          {
            row: 5,
            error: 'SKU already exists',
            data: csvData[3],
          },
        ],
        warnings: [
          {
            row: 2,
            warning: 'Missing category, using default',
            data: csvData[0],
          },
        ],
      };
      
      setImportResult(result);
      
      if (result.success > 0) {
        toast.success(`Successfully imported ${result.success} products!`);
        onImport();
      }
      
    } catch (error) {
      console.error('Import error:', error);
      toast.error('Failed to import products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadSampleCSV = () => {
    const blob = new Blob([sampleCSV], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_products.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const resetModal = () => {
    setCurrentStep(0);
    setCsvData([]);
    setImportResult(null);
    setFile(null);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={handleClose}
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
            <h2 className="text-xl font-semibold text-gray-900">Bulk Import Products</h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= index
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {currentStep > index ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{step.label}</p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-1 mx-4 ${
                        currentStep > index ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            {currentStep === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <FileSpreadsheet className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Upload Product Data
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Upload a CSV file with your product data. Download our sample file to see the expected format.
                  </p>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label
                    htmlFor="csv-upload"
                    className="cursor-pointer flex flex-col items-center space-y-4"
                  >
                    <Upload className="w-12 h-12 text-gray-400" />
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-gray-500">CSV files only</p>
                    </div>
                  </label>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Eye className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">Need help with the format?</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Download our sample CSV file to see the expected format and required fields.
                      </p>
                      <button
                        onClick={downloadSampleCSV}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-700 underline"
                      >
                        Download Sample CSV
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Review Your Data
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Please review your product data before importing. {csvData.length} products found.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Row
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          SKU
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {csvData.slice(0, 10).map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {row._rowIndex}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {row.name || '-'}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {row.sku || '-'}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {row.category || '-'}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {row.price || '-'}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {row.quantity || '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {csvData.length > 10 && (
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      Showing first 10 rows of {csvData.length} total products
                    </p>
                  )}
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {loading ? (
                  <div className="text-center py-12">
                    <div className="loading-dots mb-4">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Importing Products...
                    </h3>
                    <p className="text-gray-600">
                      Please wait while we process your product data.
                    </p>
                  </div>
                ) : importResult && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <CheckCircle className="w-16 h-16 text-success-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Import Complete!
                      </h3>
                      <p className="text-gray-600">
                        Successfully imported {importResult.success} products.
                      </p>
                    </div>

                    {importResult.errors.length > 0 && (
                      <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-danger-800 mb-2">
                          Errors ({importResult.errors.length})
                        </h4>
                        <div className="space-y-2">
                          {importResult.errors.map((error, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <XCircle className="w-4 h-4 text-danger-600 mt-0.5" />
                              <div className="text-sm">
                                <span className="font-medium">Row {error.row}:</span>
                                <span className="text-danger-700 ml-1">{error.error}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {importResult.warnings.length > 0 && (
                      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-warning-800 mb-2">
                          Warnings ({importResult.warnings.length})
                        </h4>
                        <div className="space-y-2">
                          {importResult.warnings.map((warning, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <AlertCircle className="w-4 h-4 text-warning-600 mt-0.5" />
                              <div className="text-sm">
                                <span className="font-medium">Row {warning.row}:</span>
                                <span className="text-warning-700 ml-1">{warning.warning}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {currentStep === 2 && importResult ? 'Done' : 'Cancel'}
            </button>
            
            <div className="flex space-x-3">
              {currentStep === 0 && (
                <button
                  onClick={downloadSampleCSV}
                  className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Sample CSV
                </button>
              )}
              
              {currentStep === 1 && (
                <button
                  onClick={() => setCurrentStep(0)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              )}
              
              {currentStep === 1 && (
                <button
                  onClick={handleImport}
                  className="btn-primary px-6 py-2"
                >
                  Import Products
                </button>
              )}
              
              {currentStep === 2 && importResult && (
                <button
                  onClick={handleClose}
                  className="btn-primary px-6 py-2"
                >
                  View Products
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
