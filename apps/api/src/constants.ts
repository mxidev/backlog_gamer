import { config } from 'dotenv';
import { resolve } from 'path';

// Cargar variables de entorno
config({ path: resolve(__dirname, '..', '.env') });

export const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-me';
