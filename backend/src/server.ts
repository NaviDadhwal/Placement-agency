import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';

const startServer = async () => {
  // Connect Database
  await connectDB();

  const PORT = parseInt(env.PORT, 10);
  const server = app.listen(PORT, () => {
    console.log(`\n🚀 Server running in ${env.NODE_ENV} mode on port ${PORT}`);
    console.log(`🌐 Health check: http://localhost:${PORT}/api/v1/health\n`);
  });

  // Graceful shutdown
  const shutdown = (signal: string) => {
    console.log(`\n⚠️ ${signal} received. Closing HTTP server gracefully...`);
    server.close(() => {
      console.log('🛑 HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};

startServer();
