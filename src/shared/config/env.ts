import { configDotenv } from 'dotenv';

configDotenv();

export const BASE_URI = import.meta.env.VITE_BASE_URI || '';
export const OAUTH_URI = import.meta.env.VITE_OAUTH_URI || '';
export const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY || '';
export const CLIENT_ID = import.meta.env.VITE_CLIENT_ID || '';
export const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET || '';

export const SCOPES = [
  `view_categories:${PROJECT_KEY}:project_name`,
  `manage_my_quotes:${PROJECT_KEY}:project_name`,
  `manage_my_shopping_lists:${PROJECT_KEY}:project_name`,
  `manage_my_profile:${PROJECT_KEY}:project_name`,
  `manage_my_quote_requests:${PROJECT_KEY}:project_name`,
  `manage_my_payments:${PROJECT_KEY}:project_name`,
  `create_anonymous_token:${PROJECT_KEY}:project_name`,
  `manage_my_orders:${PROJECT_KEY}:project_name`,
  `manage_my_business_units:${PROJECT_KEY}:project_name`,
  `view_products:${PROJECT_KEY}:project_name`,
];
