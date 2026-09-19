const express = require("express");
const cors = require("cors");
const fs = require("fs");

// Cargar los productos desde el archivo JSON
const products = require("./data/products.json");
const guardarProductos = () => {
  fs.writeFileSync(
    "./data/products.json",
    JSON.stringify(products, null, 2)
  );
};

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.send("API de RodaBike funcionando correctamente");
});

// Obtener todas las bicicletas
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Obtener una bicicleta por su ID
app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).json({
      mensaje: "Producto no encontrado"
    });
  }

  res.json(product);
});

app.post("/api/products", (req, res) => {
  const nuevoProducto = req.body;

  const nuevoId =
    products.length > 0
      ? Math.max(...products.map((producto) => producto.id)) + 1
      : 1;

  nuevoProducto.id = nuevoId;

  products.push(nuevoProducto);

  guardarProductos();

  res.status(201).json(nuevoProducto);
});
// Eliminar una bicicleta
app.delete("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const indice = products.findIndex((producto) => producto.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensaje: "Producto no encontrado"
    });
  }

  const productoEliminado = products.splice(indice, 1);

  guardarProductos();

  res.json({
    mensaje: "Producto eliminado correctamente",
    producto: productoEliminado[0]
  });
});
// Actualizar una bicicleta
app.put("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const indice = products.findIndex((producto) => producto.id === id);

  if (indice === -1) {
    return res.status(404).json({
      mensaje: "Producto no encontrado"
    });
  }

  products[indice] = {
    ...products[indice],
    ...req.body,
    id: id
  };
  guardarProductos();

  res.json(products[indice]);
});
// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor RodaBike funcionando en el puerto ${PORT}`);
});
