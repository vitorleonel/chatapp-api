import TestUtil from './test';

describe('TestUtil', () => {
  beforeAll(async () => {
    process.env.MONGO_URL = '';
  });

  it('should not start mongodb server without env', async () => {
    try {
      await TestUtil.openDbConnection();

      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe('MongoDB server not initialized.');
    }
  });
});
