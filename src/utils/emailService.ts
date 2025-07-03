
// Re-export all functionality for backward compatibility
export * from './email/types';
export * from './email/storage';
export * from './email/validation';
export * from './email/sender';

// Export utility functions for better performance
export { isValidEmail } from './email/validation';
export { clearConfigCache } from './email/storage';
