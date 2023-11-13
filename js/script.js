// Productos

//Camisas

const productos = [
    {
        id: "camisa-1",
        titulo: "Camisa 1",
        imagen: "./img/camisa1.jpg",
        categoria: {
            nombre: "Camisas",
            id: "camisas"
        },
        precio: 7000
    },
    {
        id: "camisa-2",
        titulo: "Camisa 2",
        imagen: "./img/camisa2.jpg",
        categoria: {
            nombre: "Camisass",
            id: "camisas"
        },
        precio: 7000
    },
    {
        id: "camisa-3",
        titulo: "Camisa 3",
        imagen: "./img/camisa3.jpg",
        categoria: {
            nombre: "Camisas",
            id: "camisas"
        },
        precio: 7000
    },
    {
        id: "camisa-4",
        titulo: "Camisa 4",
        imagen: "./img/camisa4.jpg",
        categoria: {
            nombre: "Camisas",
            id: "camisas"
        },
        precio: 7000
    },
    {
        id: "camisa-5",
        titulo: "Camisa 5",
        imagen: "./img/camisa5.jpg",
        categoria: {
            nombre: "Camisas",
            id: "camisas"
        },
        precio: 7000
    },

    // Pantalones
    {
        id: "pantalon-1",
        titulo: "Pantalon 1",
        imagen: "./img/cargo1.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 7000
    },
    {
        id: "pantalon-2",
        titulo: "Pantalon 2",
        imagen: "./img/cargo2.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 7000
    },
    {
        id: "pantalon-3",
        titulo: "Pantalon 3",
        imagen: "./img/cargo3.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 7000
    },
    {
        id: "pantalon-4",
        titulo: "Pantalon 4",
        imagen: "./img/cargo4.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 7000
    },
    {
        id: "pantalon-5",
        titulo: "Pantalon 5",
        imagen: "./img/cargo5.jpg",
        categoria: {
            nombre: "Pantalones",
            id: "pantalones"
        },
        precio: 7000
    },
    // Zapatillas
    {
        id: "zapatillas-1",
        titulo: "Zapatillas 1",
        imagen: "./img/zapatillas1.jpg",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio: 10000
    },
    {
        id: "zapatillas-2",
        titulo: "Zapatillas 2",
        imagen: "./img/zapatillas2.jpg",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio: 10000
    },
    {
        id: "zapatillas-3",
        titulo: "Zapatillas 3",
        imagen: "./img/zapatillas3.jpg",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio: 10000
    },
    {
        id: "zapatillas-4",
        titulo: "Zapatillas 4",
        imagen: "./img/zapatillas4.jpg",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio: 10000
    },
    {
        id: "zapatillas-5",
        titulo: "Zapatillas 5",
        imagen: "./img/zapatillas5.jpg",
        categoria: {
            nombre: "Zapatillas",
            id: "zapatillas"
        },
        precio: 10000
    },
];


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