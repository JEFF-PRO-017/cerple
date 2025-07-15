// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// 👉 Middleware CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // 👈 autorise toutes les origines
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// 👉 Démarrer le routeur
server.use(router);
server.listen(3000, () => {
  console.log('✅ JSON Server is running at http://localhost:3000');
});
