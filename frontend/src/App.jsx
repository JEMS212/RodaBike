import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState("Todas");
  const [marca, setMarca] = useState("Todas");
  const [precio, setPrecio] = useState("Todos");

  const [nuevoProducto, setNuevoProducto] = useState({
  nombre: "",
  marca: "",
  categoria: "",
  precio: "",
  descripcion: "",
  frenos: "",
  velocidades: "",
  cuadro: "",
  stock: "",
  imagen: ""
});

  useEffect(() => {
    fetch("https://rodabike.onrender.com/api/products")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);
const agregarProducto = () => {
  if (
  !nuevoProducto.nombre ||
  !nuevoProducto.marca ||
  !nuevoProducto.categoria ||
  !nuevoProducto.precio ||
  !nuevoProducto.descripcion ||
  !nuevoProducto.frenos ||
  !nuevoProducto.velocidades ||
  !nuevoProducto.cuadro ||
  !nuevoProducto.stock ||
  !nuevoProducto.imagen
) {
  alert("Por favor completa todos los campos.");
  return;
}
  fetch("https://rodabike.onrender.com/api/products", {
  method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ...nuevoProducto,
      precio: Number(nuevoProducto.precio),
      velocidades: Number(nuevoProducto.velocidades),
      stock: Number(nuevoProducto.stock)
    })
  })
    .then((response) => response.json())
    .then((productoCreado) => {
  setProductos([...productos, productoCreado]);

  setNuevoProducto({
    nombre: "",
    marca: "",
    categoria: "",
    precio: "",
    descripcion: "",
    frenos: "",
    velocidades: "",
    cuadro: "",
    stock: "",
    imagen: ""
  });
})
    .catch((error) =>
      console.error("Error al agregar producto:", error)
    );
};
const eliminarProducto = (id) => {
  fetch(`https://rodabike.onrender.com/api/products/${id}`, {
  method: "DELETE"
})
    .then((response) => response.json())
    .then(() => {
      setProductos(productos.filter((producto) => producto.id !== id));
    })
    .catch((error) => {
      console.error("Error al eliminar producto:", error);
    });
};
const editarProducto = (producto) => {
  const nuevoNombre = prompt("Nuevo nombre:", producto.nombre);
  const nuevaMarca = prompt("Nueva marca:", producto.marca);
  const nuevaCategoria = prompt("Nueva categoría:", producto.categoria);
  const nuevoPrecio = prompt("Nuevo precio:", producto.precio);

  if (
    nuevoNombre === null ||
    nuevaMarca === null ||
    nuevaCategoria === null ||
    nuevoPrecio === null
  ) {
    return;
  }

  const productoActualizado = {
    ...producto,
    nombre: nuevoNombre,
    marca: nuevaMarca,
    categoria: nuevaCategoria,
    precio: Number(nuevoPrecio)
  };

  fetch(`https://rodabike.onrender.com/api/products/${producto.id}`, {
  method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(productoActualizado)
  })
    .then((response) => response.json())
    .then((productoEditado) => {
      setProductos(
        productos.map((p) =>
          p.id === productoEditado.id ? productoEditado : p
        )
      );
    })
    .catch((error) => {
      console.error("Error al editar producto:", error);
    });
};
  return (
    <div className="app">
      <header className="header">
        <h1>RodaBike</h1>
        <p>Tu tienda de bicicletas en Xalapa</p>
      </header>

      <main className="contenido">
        <h2>Catálogo de bicicletas</h2>
        <p>
          Encuentra bicicletas de montaña, urbanas, infantiles y eléctricas.
        </p>
          <div className="filtros">
  <label htmlFor="categoria">Categoría: </label>

  <select
    id="categoria"
    value={categoria}
    onChange={(e) => setCategoria(e.target.value)}
  >
    <option value="Todas">Todas</option>
    <option value="Montaña">Montaña</option>
    <option value="Urbana">Urbana</option>
    <option value="Infantil">Infantil</option>
    <option value="Eléctrica">Eléctrica</option>
  </select><label htmlFor="marca">Marca: </label>

<select
  id="marca"
  value={marca}
  onChange={(e) => setMarca(e.target.value)}
>
  <option value="Todas">Todas</option>
  <option value="Trek">Trek</option>
  <option value="Giant">Giant</option>
  <option value="Benotto">Benotto</option>
  <option value="Mercurio">Mercurio</option>
</select><label htmlFor="precio">Precio: </label>

<select
  id="precio"
  value={precio}
  onChange={(e) => setPrecio(e.target.value)}
>
  <option value="Todos">Todos</option>
  <option value="0-8000">Hasta $8,000</option>
  <option value="8001-15000">$8,001 - $15,000</option>
  <option value="15001-20000">$15,001 - $20,000</option>
  <option value="20001+">Más de $20,000</option>
</select>
</div><div className="formulario-producto">
  <h2>Agregar bicicleta</h2>

  <input
    type="text"
    placeholder="Nombre"
    value={nuevoProducto.nombre}
    onChange={(e) =>
      setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
    }
  />

  <input
    type="text"
    placeholder="Marca"
    value={nuevoProducto.marca}
    onChange={(e) =>
      setNuevoProducto({ ...nuevoProducto, marca: e.target.value })
    }
  />

  <input
    type="text"
    placeholder="Categoría"
    value={nuevoProducto.categoria}
    onChange={(e) =>
      setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })
    }
  />

  <input
    type="number"
    placeholder="Precio"
    value={nuevoProducto.precio}
    onChange={(e) =>
      setNuevoProducto({ ...nuevoProducto, precio: e.target.value })
    }
  />

  <input
    type="text"
    placeholder="Descripción"
    value={nuevoProducto.descripcion}
    onChange={(e) =>
      setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })
    }
  />

  <input
    type="text"
    placeholder="Frenos"
    value={nuevoProducto.frenos}
    onChange={(e) =>
      setNuevoProducto({ ...nuevoProducto, frenos: e.target.value })
    }
  />

  <input
    type="number"
    placeholder="Velocidades"
    value={nuevoProducto.velocidades}
    onChange={(e) =>
      setNuevoProducto({ ...nuevoProducto, velocidades: e.target.value })
    }
  />

  <input
    type="text"
    placeholder="Material del cuadro"
    value={nuevoProducto.cuadro}
    onChange={(e) =>
      setNuevoProducto({ ...nuevoProducto, cuadro: e.target.value })
    }
  />

  <input
    type="number"
    placeholder="Cantidad disponible"
    value={nuevoProducto.stock}
    onChange={(e) =>
      setNuevoProducto({ ...nuevoProducto, stock: e.target.value })
    }
  />

  <input
    type="text"
    placeholder="Nombre de imagen (ejemplo: bicicleta.jpg)"
    value={nuevoProducto.imagen}
    onChange={(e) =>
      setNuevoProducto({ ...nuevoProducto, imagen: e.target.value })
    }
  />

 <button type="button" onClick={agregarProducto}>
  Agregar bicicleta
</button>
</div>
        <div className="productos">
          {productos
  .filter((producto) =>
  (categoria === "Todas" || producto.categoria === categoria) &&
  (marca === "Todas" || producto.marca === marca) &&
  (
    precio === "Todos" ||
    (precio === "0-8000" && producto.precio <= 8000) ||
    (precio === "8001-15000" && producto.precio >= 8001 && producto.precio <= 15000) ||
    (precio === "15001-20000" && producto.precio >= 15001 && producto.precio <= 20000) ||
    (precio === "20001+" && producto.precio >= 20001)
  )
)
  .map((producto) => (
            <div className="producto" key={producto.id}>
              <img
                src={`/images/${producto.imagen}`}
                alt={producto.nombre}
                className="producto-imagen"
              />
              <h3>{producto.nombre}</h3>

              <p>
                <strong>Marca:</strong> {producto.marca}
              </p>

              <p>
                <strong>Categoría:</strong> {producto.categoria}
              </p>

              <p className="precio">
                ${producto.precio.toLocaleString("es-MX")} MXN
              </p>

              <p>{producto.descripcion}</p>

              <p>
                <strong>Frenos:</strong> {producto.frenos}
              </p>

              <p>
                <strong>Velocidades:</strong> {producto.velocidades}
              </p>

              <p>
                <strong>Cuadro:</strong> {producto.cuadro}
              </p>

              <p>
                <strong>Disponibles:</strong> {producto.stock}
              </p>
              <button
                type="button"
                onClick={() => editarProducto(producto)}
                >
                  Editar
                </button>
              <button
                type="button"
                onClick={() => eliminarProducto(producto.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">
        <p>RodaBike - Av. Juárez 234, Centro Histórico, Xalapa</p>
        <p>Lunes a sábado 10:00 - 20:00 | Domingo 11:00 - 17:00</p>
        <p>Contacto: Teléfono y WhatsApp de la tienda</p>
      </footer>
    </div>
  );
}

export default App;