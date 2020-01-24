import mongoose from 'mongoose';

export default {
  openDbConnection: async (): Promise<void> => {
    if (!process.env.MONGO_URL) {
      throw new Error('MongoDB server not initialized');
    }

    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  },

  closeDbConnection: async (): Promise<void> => {
    await mongoose.connection.close();
  },
};
