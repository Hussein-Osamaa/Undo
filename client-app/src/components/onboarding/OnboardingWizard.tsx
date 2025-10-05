'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, ArrowLeft, Check, Store, User, Settings } from 'lucide-react';
import { useAuth } from '@/lib/providers/AuthProvider';

const businessDetailsSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  businessType: z.enum(['retail', 'restaurant', 'service', 'ecommerce']),
  storeType: z.enum(['physical', 'online', 'both']),
  address: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
});

const settingsSchema = z.object({
  currency: z.string().min(3, 'Please select a currency'),
  timezone: z.string().min(1, 'Please select a timezone'),
  taxRate: z.number().min(0).max(1, 'Tax rate must be between 0 and 1'),
});

type BusinessDetailsForm = z.infer<typeof businessDetailsSchema>;
type SettingsForm = z.infer<typeof settingsSchema>;

export function OnboardingWizard() {
  const { user, signUp } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const businessForm = useForm<BusinessDetailsForm>({
    resolver: zodResolver(businessDetailsSchema),
    defaultValues: {
      businessName: '',
      businessType: 'retail',
      storeType: 'physical',
      address: '',
      phone: '',
      website: '',
    },
  });

  const settingsForm = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      currency: 'USD',
      timezone: 'America/New_York',
      taxRate: 0.08,
    },
  });

  const steps = [
    {
      id: 1,
      title: 'Welcome to MADAS',
      description: 'Let\'s set up your business account',
      icon: Store,
    },
    {
      id: 2,
      title: 'Business Details',
      description: 'Tell us about your business',
      icon: User,
    },
    {
      id: 3,
      title: 'Settings',
      description: 'Configure your preferences',
      icon: Settings,
    },
    {
      id: 4,
      title: 'Complete',
      description: 'You\'re all set!',
      icon: Check,
    },
  ];

  const handleNext = async () => {
    if (currentStep === 2) {
      const isValid = await businessForm.trigger();
      if (!isValid) return;
    } else if (currentStep === 3) {
      const isValid = await settingsForm.trigger();
      if (!isValid) return;
      
      // Complete onboarding
      setIsLoading(true);
      try {
        const businessData = businessForm.getValues();
        const settingsData = settingsForm.getValues();
        
        // Create business (this would be handled by the auth service)
        // For now, just move to completion step
        setCurrentStep(4);
      } catch (error) {
        console.error('Onboarding error:', error);
      } finally {
        setIsLoading(false);
      }
      return;
    }
    
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Store className="w-10 h-10 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to MADAS! 🎉
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Let's get your business set up in just a few steps. This will only take a couple of minutes.
            </p>
            <div className="space-y-4 text-left max-w-md mx-auto">
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-success-500" />
                <span className="text-gray-700">Set up your business profile</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-success-500" />
                <span className="text-gray-700">Configure your preferences</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-success-500" />
                <span className="text-gray-700">Start managing your business</span>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="business-details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Business Details
            </h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="businessName" className="form-label">
                  Business Name *
                </label>
                <input
                  {...businessForm.register('businessName')}
                  type="text"
                  id="businessName"
                  className="form-input"
                  placeholder="Enter your business name"
                />
                {businessForm.formState.errors.businessName && (
                  <p className="form-error">{businessForm.formState.errors.businessName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="businessType" className="form-label">
                  Business Type *
                </label>
                <select
                  {...businessForm.register('businessType')}
                  id="businessType"
                  className="form-input"
                >
                  <option value="retail">Retail Store</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="service">Service Business</option>
                  <option value="ecommerce">E-commerce</option>
                </select>
              </div>

              <div>
                <label htmlFor="storeType" className="form-label">
                  Store Type *
                </label>
                <select
                  {...businessForm.register('storeType')}
                  id="storeType"
                  className="form-input"
                >
                  <option value="physical">Physical Store</option>
                  <option value="online">Online Only</option>
                  <option value="both">Both Physical & Online</option>
                </select>
              </div>

              <div>
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  {...businessForm.register('address')}
                  type="text"
                  id="address"
                  className="form-input"
                  placeholder="Enter your business address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    {...businessForm.register('phone')}
                    type="tel"
                    id="phone"
                    className="form-input"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="website" className="form-label">
                    Website
                  </label>
                  <input
                    {...businessForm.register('website')}
                    type="url"
                    id="website"
                    className="form-input"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
            </form>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Settings
            </h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="currency" className="form-label">
                  Currency *
                </label>
                <select
                  {...settingsForm.register('currency')}
                  id="currency"
                  className="form-input"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                </select>
              </div>

              <div>
                <label htmlFor="timezone" className="form-label">
                  Timezone *
                </label>
                <select
                  {...settingsForm.register('timezone')}
                  id="timezone"
                  className="form-input"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">London (GMT)</option>
                  <option value="Europe/Paris">Paris (CET)</option>
                </select>
              </div>

              <div>
                <label htmlFor="taxRate" className="form-label">
                  Default Tax Rate *
                </label>
                <input
                  {...settingsForm.register('taxRate', { valueAsNumber: true })}
                  type="number"
                  id="taxRate"
                  min="0"
                  max="1"
                  step="0.01"
                  className="form-input"
                  placeholder="0.08"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Enter as decimal (0.08 = 8%)
                </p>
                {settingsForm.formState.errors.taxRate && (
                  <p className="form-error">{settingsForm.formState.errors.taxRate.message}</p>
                )}
              </div>
            </form>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-success-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              All Set! 🎉
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Your business has been set up successfully. You can now start managing your business with MADAS.
            </p>
            <div className="space-y-4 text-left max-w-md mx-auto">
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-success-500" />
                <span className="text-gray-700">Business profile created</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-success-500" />
                <span className="text-gray-700">Settings configured</span>
              </div>
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-success-500" />
                <span className="text-gray-700">14-day trial activated</span>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-strong p-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      currentStep > step.id ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {currentStep < 4 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={isLoading}
                className="btn-primary px-6 py-2 flex items-center"
              >
                {isLoading ? (
                  <div className="loading-dots">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <>
                    {currentStep === 3 ? 'Complete Setup' : 'Next'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          )}

          {currentStep === 4 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => window.location.reload()}
                className="btn-primary px-8 py-3"
              >
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
