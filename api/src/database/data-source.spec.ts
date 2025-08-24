import { AppDataSource } from './data-source';
import { DataSource } from 'typeorm';

describe('AppDataSource', () => {
  it('should be an instance of DataSource', () => {
    expect(AppDataSource).toBeInstanceOf(DataSource);
  });

  it('should have correct configuration', () => {
    expect(AppDataSource.options.type).toBe('sqlite');
    expect(AppDataSource.options.database).toBe('database.sqlite');
    expect(AppDataSource.options.entities).toEqual([
      'database/entities/**/*.ts',
    ]);
    expect(AppDataSource.options.migrations).toEqual([
      'database/migrations/**/*.ts',
    ]);
    expect(AppDataSource.options.synchronize).toBe(false);
  });

  it('should not be initialized by default', () => {
    expect(AppDataSource.isInitialized).toBe(false);
  });

  // Edge case: Try to initialize and destroy the data source
  it('should initialize and destroy the data source', async () => {
    await expect(AppDataSource.initialize()).resolves.toBeInstanceOf(
      DataSource,
    );
    expect(AppDataSource.isInitialized).toBe(true);
    await expect(AppDataSource.destroy()).resolves.toBeUndefined();
    expect(AppDataSource.isInitialized).toBe(false);
  });

  // Edge case: Double destroy should not throw
  it('should not throw on double destroy', async () => {
    await AppDataSource.initialize();
    await AppDataSource.destroy();
    await expect(AppDataSource.destroy()).rejects.toMatchObject({
      name: 'CannotExecuteNotConnectedError',
    });
  });
});
