/**
 * Modal component for the MADAS SaaS platform
 */

import React from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Button } from './Button';

/**
 * Modal variants using class-variance-authority
 */
const modalVariants = cva(
  'relative bg-white rounded-lg shadow-xl transform transition-all',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        full: 'max-w-full mx-4',
      },
      animation: {
        fade: 'animate-in fade-in duration-200',
        slide: 'animate-in slide-in-from-bottom-2 duration-300',
        zoom: 'animate-in zoom-in-95 duration-200',
        none: '',
      },
    },
    defaultVariants: {
      size: 'md',
      animation: 'fade',
    },
  }
);

export interface ModalProps extends VariantProps<typeof modalVariants> {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  /**
   * Callback when modal should close
   */
  onClose: () => void;
  /**
   * Modal title
   */
  title?: string;
  /**
   * Modal content
   */
  children: React.ReactNode;
  /**
   * Footer content
   */
  footer?: React.ReactNode;
  /**
   * Whether to show close button
   */
  showCloseButton?: boolean;
  /**
   * Whether clicking outside closes the modal
   */
  closeOnOverlayClick?: boolean;
  /**
   * Whether pressing escape closes the modal
   */
  closeOnEscape?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Overlay CSS classes
   */
  overlayClassName?: string;
  /**
   * Whether modal is loading
   */
  loading?: boolean;
  /**
   * Loading text
   */
  loadingText?: string;
  /**
   * Whether modal is closable
   */
  closable?: boolean;
  /**
   * Custom close button
   */
  customCloseButton?: React.ReactNode;
  /**
   * Modal ID for accessibility
   */
  id?: string;
  /**
   * ARIA label for modal
   */
  'aria-label'?: string;
  /**
   * ARIA described by
   */
  'aria-describedby'?: string;
}

/**
 * Modal component
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
  overlayClassName,
  loading = false,
  loadingText,
  closable = true,
  customCloseButton,
  size,
  animation,
  id,
  ...props
}) => {
  const modalId = id || React.useId();
  const titleId = `${modalId}-title`;
  const contentId = `${modalId}-content`;
  
  // Handle escape key
  React.useEffect(() => {
    if (!isOpen || !closeOnEscape) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);
  
  // Handle body scroll lock
  React.useEffect(() => {
    if (!isOpen) return;
    
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);
  
  // Focus management
  const modalRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    if (!isOpen) return;
    
    const modal = modalRef.current;
    if (modal) {
      // Focus the modal
      modal.focus();
      
      // Find first focusable element
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0] as HTMLElement;
      if (firstElement) {
        firstElement.focus();
      }
    }
  }, [isOpen]);
  
  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  const modalContent = (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        overlayClassName
      )}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={contentId}
      {...props}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal */}
      <div
        ref={modalRef}
        className={cn(
          modalVariants({ size, animation }),
          'relative z-10 w-full max-h-[90vh] overflow-hidden',
          className
        )}
        tabIndex={-1}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {title && (
              <h2
                id={titleId}
                className="text-lg font-semibold text-gray-900"
              >
                {title}
              </h2>
            )}
            
            {showCloseButton && closable && (
              <div className="flex items-center">
                {customCloseButton || (
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                    aria-label="Close modal"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
        
        {/* Content */}
        <div
          id={contentId}
          className={cn(
            'p-6 overflow-y-auto',
            loading && 'pointer-events-none opacity-50'
          )}
        >
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
                {loadingText && <span className="text-gray-600">{loadingText}</span>}
              </div>
            </div>
          ) : (
            children
          )}
        </div>
        
        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
  
  // Portal to body
  return createPortal(modalContent, document.body);
};

/**
 * Confirm dialog component
 */
export interface ConfirmDialogProps extends Omit<ModalProps, 'children' | 'footer'> {
  /**
   * Dialog message
   */
  message: string;
  /**
   * Confirm button text
   */
  confirmText?: string;
  /**
   * Cancel button text
   */
  cancelText?: string;
  /**
   * Confirm button variant
   */
  confirmVariant?: 'default' | 'destructive';
  /**
   * Callback when confirmed
   */
  onConfirm: () => void;
  /**
   * Callback when cancelled
   */
  onCancel?: () => void;
  /**
   * Whether confirm button is loading
   */
  confirmLoading?: boolean;
  /**
   * Icon to show
   */
  icon?: React.ReactNode;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'default',
  onConfirm,
  onCancel,
  confirmLoading = false,
  icon,
  ...modalProps
}) => {
  const handleCancel = () => {
    onCancel?.();
    modalProps.onClose();
  };
  
  const handleConfirm = () => {
    onConfirm();
    if (!confirmLoading) {
      modalProps.onClose();
    }
  };
  
  return (
    <Modal {...modalProps}>
      <div className="flex items-start space-x-3">
        {icon && (
          <div className="flex-shrink-0">
            {icon}
          </div>
        )}
        
        <div className="flex-1">
          <p className="text-gray-900">{message}</p>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={confirmLoading}
        >
          {cancelText}
        </Button>
        <Button
          variant={confirmVariant}
          onClick={handleConfirm}
          loading={confirmLoading}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
};

/**
 * Alert dialog component
 */
export interface AlertDialogProps extends Omit<ModalProps, 'children' | 'footer'> {
  /**
   * Alert message
   */
  message: string;
  /**
   * Alert type
   */
  type?: 'info' | 'success' | 'warning' | 'error';
  /**
   * Button text
   */
  buttonText?: string;
  /**
   * Callback when button is clicked
   */
  onButtonClick?: () => void;
  /**
   * Custom icon
   */
  icon?: React.ReactNode;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  message,
  type = 'info',
  buttonText = 'OK',
  onButtonClick,
  icon,
  ...modalProps
}) => {
  const typeConfig = {
    info: {
      iconColor: 'text-blue-600',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      buttonVariant: 'default' as const,
    },
    success: {
      iconColor: 'text-green-600',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      buttonVariant: 'success' as const,
    },
    warning: {
      iconColor: 'text-yellow-600',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      buttonVariant: 'warning' as const,
    },
    error: {
      iconColor: 'text-red-600',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      buttonVariant: 'destructive' as const,
    },
  };
  
  const config = typeConfig[type];
  const displayIcon = icon || config.icon;
  
  const handleButtonClick = () => {
    onButtonClick?.();
    modalProps.onClose();
  };
  
  return (
    <Modal {...modalProps}>
      <div className="flex items-start space-x-3">
        <div className={cn('flex-shrink-0', config.iconColor)}>
          {displayIcon}
        </div>
        
        <div className="flex-1">
          <p className="text-gray-900">{message}</p>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <Button
          variant={config.buttonVariant}
          onClick={handleButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </Modal>
  );
};

/**
 * Modal context for managing multiple modals
 */
interface ModalContextType {
  openModal: (modal: React.ReactNode) => string;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
}

const ModalContext = React.createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

/**
 * Modal provider for managing modal state
 */
export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modals, setModals] = React.useState<Map<string, React.ReactNode>>(new Map());
  
  const openModal = (modal: React.ReactNode) => {
    const id = Math.random().toString(36).substr(2, 9);
    setModals(prev => new Map(prev.set(id, modal)));
    return id;
  };
  
  const closeModal = (id: string) => {
    setModals(prev => {
      const newModals = new Map(prev);
      newModals.delete(id);
      return newModals;
    });
  };
  
  const closeAllModals = () => {
    setModals(new Map());
  };
  
  return (
    <ModalContext.Provider value={{ openModal, closeModal, closeAllModals }}>
      {children}
      {Array.from(modals.entries()).map(([id, modal]) => (
        <React.Fragment key={id}>{modal}</React.Fragment>
      ))}
    </ModalContext.Provider>
  );
};

// Export all modal components
export {
  modalVariants,
  Modal,
  ConfirmDialog,
  AlertDialog,
  ModalProvider,
  useModal,
};
