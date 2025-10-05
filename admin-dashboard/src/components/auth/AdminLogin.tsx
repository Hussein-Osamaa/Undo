/**
 * Admin login component with enhanced security
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from '@madas/shared';

interface AdminLoginProps {
  className?: string;
}

interface LoginFormData {
  email: string;
  password: string;
  twoFactorCode?: string;
}

interface LoginState {
  step: 'credentials' | 'two-factor' | 'loading' | 'success' | 'error';
  error?: string;
  message?: string;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ className }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    twoFactorCode: '',
  });
  const [loginState, setLoginState] = useState<LoginState>({ step: 'credentials' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const router = useRouter();

  const maxAttempts = 5;
  const blockDuration = 15 * 60 * 1000; // 15 minutes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (loginState.error) {
      setLoginState(prev => ({ ...prev, error: undefined }));
    }
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) {
      setLoginState({
        step: 'error',
        error: 'Account temporarily locked due to multiple failed attempts. Please try again later.',
      });
      return;
    }

    setLoginState({ step: 'loading' });

    try {
      // Simulate API call for credentials validation
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation - replace with actual Firebase Auth
      const isValidCredentials = 
        formData.email === 'admin@madas.com' && 
        formData.password === 'admin123';

      if (isValidCredentials) {
        setLoginState({ step: 'two-factor' });
        setLoginAttempts(0);
      } else {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);

        if (newAttempts >= maxAttempts) {
          setIsBlocked(true);
          setTimeout(() => setIsBlocked(false), blockDuration);
          setLoginState({
            step: 'error',
            error: 'Too many failed attempts. Account locked for 15 minutes.',
          });
        } else {
          setLoginState({
            step: 'error',
            error: `Invalid credentials. ${maxAttempts - newAttempts} attempts remaining.`,
          });
        }
      }
    } catch (error) {
      setLoginState({
        step: 'error',
        error: 'An unexpected error occurred. Please try again.',
      });
    }
  };

  const handleTwoFactorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoginState({ step: 'loading' });

    try {
      // Simulate 2FA validation
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock 2FA validation - replace with actual implementation
      const isValid2FA = formData.twoFactorCode === '123456';

      if (isValid2FA) {
        setLoginState({ 
          step: 'success', 
          message: 'Login successful! Redirecting to dashboard...' 
        });

        // Store admin session
        localStorage.setItem('admin_session', JSON.stringify({
          email: formData.email,
          loginTime: new Date().toISOString(),
          rememberMe,
        }));

        // Redirect to dashboard
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        setLoginState({
          step: 'two-factor',
          error: 'Invalid two-factor authentication code. Please try again.',
        });
      }
    } catch (error) {
      setLoginState({
        step: 'error',
        error: 'Two-factor authentication failed. Please try again.',
      });
    }
  };

  const getStepTitle = () => {
    switch (loginState.step) {
      case 'credentials':
        return 'Admin Login';
      case 'two-factor':
        return 'Two-Factor Authentication';
      case 'loading':
        return 'Authenticating...';
      case 'success':
        return 'Login Successful';
      case 'error':
        return 'Login Failed';
      default:
        return 'Admin Login';
    }
  };

  const getStepDescription = () => {
    switch (loginState.step) {
      case 'credentials':
        return 'Enter your admin credentials to access the dashboard';
      case 'two-factor':
        return 'Enter the 6-digit code from your authenticator app';
      case 'loading':
        return 'Please wait while we verify your credentials...';
      case 'success':
        return 'You have been successfully authenticated';
      case 'error':
        return 'There was a problem with your login attempt';
      default:
        return '';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-large">
          <CardHeader className="text-center pb-6">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">M</span>
              </div>
            </div>

            <CardTitle className="text-2xl font-bold text-gray-900">
              {getStepTitle()}
            </CardTitle>
            
            <p className="text-gray-600 mt-2">
              {getStepDescription()}
            </p>
          </CardHeader>

          <CardContent>
            {/* Error Message */}
            {loginState.error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg mb-6"
              >
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span className="text-sm text-red-700">{loginState.error}</span>
              </motion.div>
            )}

            {/* Success Message */}
            {loginState.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg mb-6"
              >
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm text-green-700">{loginState.message}</span>
              </motion.div>
            )}

            {/* Credentials Form */}
            {loginState.step === 'credentials' && (
              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    name="email"
                    label="Email Address"
                    placeholder="admin@madas.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    leftIcon={<Mail className="w-5 h-5" />}
                    required
                    disabled={isBlocked}
                  />
                </div>

                <div>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    leftIcon={<Lock className="w-5 h-5" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    }
                    required
                    disabled={isBlocked}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>

                  <button
                    type="button"
                    className="text-sm text-primary hover:text-primary/80"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isBlocked || !formData.email || !formData.password}
                >
                  {isBlocked ? 'Account Locked' : 'Continue'}
                </Button>
              </form>
            )}

            {/* Two-Factor Form */}
            {loginState.step === 'two-factor' && (
              <form onSubmit={handleTwoFactorSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    name="twoFactorCode"
                    label="Authentication Code"
                    placeholder="123456"
                    value={formData.twoFactorCode}
                    onChange={handleInputChange}
                    maxLength={6}
                    className="text-center text-2xl tracking-widest"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Enter the 6-digit code from your authenticator app
                  </p>
                </div>

                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setLoginState({ step: 'credentials' })}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={!formData.twoFactorCode || formData.twoFactorCode.length !== 6}
                  >
                    Verify
                  </Button>
                </div>
              </form>
            )}

            {/* Loading State */}
            {loginState.step === 'loading' && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
                <p className="text-gray-600">Please wait...</p>
              </div>
            )}

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900 mb-1">
                    Secure Admin Access
                  </h4>
                  <p className="text-xs text-blue-700">
                    This is a restricted area. All login attempts are logged and monitored for security purposes.
                  </p>
                </div>
              </div>
            </div>

            {/* Demo Credentials */}
            <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-xs text-gray-600 mb-2 font-medium">Demo Credentials:</p>
              <p className="text-xs text-gray-500">
                Email: <code className="bg-gray-200 px-1 rounded">admin@madas.com</code>
              </p>
              <p className="text-xs text-gray-500">
                Password: <code className="bg-gray-200 px-1 rounded">admin123</code>
              </p>
              <p className="text-xs text-gray-500">
                2FA Code: <code className="bg-gray-200 px-1 rounded">123456</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
