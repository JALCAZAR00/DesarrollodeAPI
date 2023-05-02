const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const { logErrors, errorHandler } = require('./middlewares/error.handler');
////const randomName = faker.name.findName();

const app = express();
const port = 3000;

app.use(express.json());

const allowlist = ['http://localhost:5500', 'http://localhost:3000'];

const options = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // permitir el acceso
  } else {
    corsOptions = {
      origin: false,
      message: 'Acceso denegado por políticas de CORS'}; // denegar el acceso
  }
  callback(null, corsOptions);
};
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hola Express')
});

routerApi(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log('My port:' + port)
});
