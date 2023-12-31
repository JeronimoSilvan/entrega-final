let productosCarrito = localStorage.getItem("productos-carrito");
productosCarrito = JSON.parse(productosCarrito);

const carritoVacio = document.querySelector("#vacio");
const carritoContenedor = document.querySelector("#contenedor-carrito");
const carritoAcciones = document.querySelector("#acciones");
const carritoComprado = document.querySelector("#comprado");
let botonesEliminar = document.querySelectorAll(".carrito-eliminar");
const botonVaciar = document.querySelector("#acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#acciones-comprar");


function mostrarProductos() {
    if (productosCarrito && productosCarrito.length > 0) {



        carritoVacio.classList.add("disabled");
        carritoContenedor.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        carritoComprado.classList.add("disabled");

        carritoContenedor.innerHTML = "";

        productosCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <img class="carrito-img" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito-procuto-nombre">
                <small>Producto</small>
                <h3>${producto.titulo}</h3>
            </div>
                 <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                    <div class="carrito-producto-precio">
                        <small>Precio</small>
                        <p>$${producto.precio}</p>
                    </div>
                        <div class="carrito-producto-subtotal">
                            <small>Subtotal</small>
                            <p>$${producto.precio * producto.cantidad}</p>
                    </div>
                    <button id="${producto.id}" class="carrito-eliminar"><i class="bi bi-trash3"></i></button>
        `;

            carritoContenedor.append(div);

        })


    } else {
        carritoVacio.classList.remove("disabled");
        carritoContenedor.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoComprado.classList.add("disabled");

    }

    actualizarBotonesEliminar();
    totalPagar();
}

mostrarProductos();



function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarCarrito);
    });
}

function eliminarCarrito(e) {
    Toastify({
        text: "Producto eliminado",
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
        onClick: function () { } // Callback after click
    }).showToast();
    const idBoton = e.currentTarget.id;
    const index = productosCarrito.findIndex(producto => producto.id === idBoton);


    productosCarrito.splice(index, 1);
    mostrarProductos();

    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito)
function vaciarCarrito() {
    Swal.fire({
        title: "Seguro que quiere eliminar su carrito?",
        html: `Se van a borrar ${productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, deseo vaciarlo",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            productosCarrito.length = 0;
            localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
            mostrarProductos();
            Swal.fire({
                title: "Carrito eliminado",
                icon: "success"
            });
        }
    });

}

function totalPagar() {
    const totalCalculado = productosCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}


botonComprar.addEventListener("click", comprarCarrito)
function comprarCarrito() {

    productosCarrito.length = 0;
    localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));

    carritoVacio.classList.add("disabled");
    carritoContenedor.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoComprado.classList.remove("disabled");


}


