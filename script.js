// Funciones básicas de carrito usando JavaScript y jQuery
function obtenerCarrito() {
    const guardado = localStorage.getItem('carritoCalzateEsta');
    return guardado ? JSON.parse(guardado) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem('carritoCalzateEsta', JSON.stringify(carrito));
}

function actualizarIndicadorCarrito() {
    const carrito = obtenerCarrito();
    const totalProductos = carrito.length;
    const totalPrecio = carrito.reduce((acc, item) => acc + item.price, 0);
    const $indicador = $('#cart-indicator');

    if ($indicador.length) {
        $indicador.text(`🛒 Carrito (${totalProductos}) - Total: $${totalPrecio.toFixed(2)}`);
    }
}

function agregarAlCarrito(nombre, precio) {
    const carrito = obtenerCarrito();
    carrito.push({ name: nombre, price: precio });
    guardarCarrito(carrito);
    actualizarIndicadorCarrito();
    alert(`Agregaste \"${nombre}\" al carrito.\nTotal de productos: ${carrito.length}`);
}

function vaciarCarrito() {
    guardarCarrito([]);
    actualizarIndicadorCarrito();
    alert('Carrito vacío');
}

// Uso de jQuery para el menú responsive
function toggleMenu() {
    $('#nav-menu').toggleClass('active');
}

// Manejo del formulario de contacto
function handleSubmit(event) {
    event.preventDefault();
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
    event.target.reset();
}

// Esperar a que el DOM esté listo
$(document).ready(function () {
    // Actualizar el indicador apenas carga la página
    actualizarIndicadorCarrito();

    // Botones de agregar al carrito
    $('.add-to-cart').on('click', function () {
        const nombre = $(this).data('name');
        const precio = parseFloat($(this).data('price'));
        agregarAlCarrito(nombre, precio);
    });
});
