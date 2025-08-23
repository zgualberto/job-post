import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  entities: ['database/entities/**/*.ts'],
  migrations: ['database/migrations/**/*.ts'],
  synchronize: false,
});
