import { AppDataSource } from '../data-source';
import dotenv from 'dotenv';

dotenv.config();

// Setup function to initialize the database connection
export const setupTestDb = async () => {
  try {
    // Override database configuration for tests
    Object.assign(AppDataSource.options, {
      database: process.env.DB_DATABASE + '_test',
      synchronize: true,
      dropSchema: true,
    });

    // Initialize the database connection
    await AppDataSource.initialize();
    console.log('Test database connection established');
    return AppDataSource;
  } catch (error) {
    console.error('Error during test database initialization', error);
    throw error;
  }
};

// Teardown function to close the database connection
export const teardownTestDb = async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
    console.log('Test database connection closed');
  }
};
