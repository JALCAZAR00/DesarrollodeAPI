const express = require('express');
const routerApi = require('./routes');

//const randomName = faker.name.findName();

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola Express')
});

app.listen(port, () => {
  console.log('My port:' + port)
});

routerApi(app);
