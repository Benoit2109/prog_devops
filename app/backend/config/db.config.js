export const config = {
    HOST: 'localhost',
    USER: 'postgres',
    PASSWORD: 'pass123',
    DB: 'todo',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
