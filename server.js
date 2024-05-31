const app = require('./src/app');

const PORT = 3055;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', () => {
  console.log('Shutting down server');
  server.close(() => {
    console.log('Server has been shut down');
  });
});
