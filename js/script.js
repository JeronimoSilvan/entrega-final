let productos = [];
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        mostrarProductos(productos);
    })

const contenedorProductos = document.querySelector("#container-productos");
const botonesCategorias = document.querySelectorAll(".categoria");
const tituloPrincipal = document.querySelector("#titulo");
let botonesSeleccionar = document.querySelectorAll(".boton-agregar");
const numero = document.querySelector("#numero");

function mostrarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="img-producto" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="detalles-producto">
                        <h3 class="nombre-producto">${producto.titulo}</h3>
                        <p class="precio-producto">$${producto.precio}</p>
                        <button class="boton-agregar" id="${producto.id}">Agregar</button>
                    </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesSeleccionar();
};

mostrarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));

        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "home") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosSeleccionados = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            mostrarProductos(productosSeleccionados);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            mostrarProductos(productos);
        }



    })

});

function actualizarBotonesSeleccionar() {
    botonesSeleccionar = document.querySelectorAll(".boton-agregar");

    botonesSeleccionar.forEach(boton => {
        boton.addEventListener("click", agregarCarrito);
    });
}

let productosCarrito;

let productosCarritoLS = localStorage.getItem("productos-carrito");

if(productosCarritoLS) {
    productosCarrito =  JSON.parse(productosCarritoLS);
    actualizarNumero();
} else {
    productosCarrito = [];
}

function agregarCarrito(e) {
    Toastify({
        text: "Producto en carrito",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #165C90, #70CCCD)",
          borderRadius: "2rem",
          fontSize: ".90rem",
        },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosCarrito.some(producto => producto.id === idBoton)) {
        const index = productosCarrito.findIndex(producto => producto.id === idBoton);
        productosCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosCarrito.push(productoAgregado);
    }

    actualizarNumero();
    

    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
}

function actualizarNumero() {
    let numeroNuevo = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numero.innerText = numeroNuevo;
}