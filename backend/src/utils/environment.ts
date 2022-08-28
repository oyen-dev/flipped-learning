const { NODE_ENV = 'development' } = process.env

// Check environments used
// Development environment
export const isDev = (NODE_ENV !== 'production' && NODE_ENV !== 'testing' && NODE_ENV !== 'staging');
// Staging environment
export const isStaging = (NODE_ENV === 'staging');
// Testing environment
export const isTest = NODE_ENV === 'testing';
// Production environment
export const isProd = NODE_ENV === 'production';