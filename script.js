let pedido = [];
let total = 0;
let precioActual = 0;
let cantidadActual = 0;
let itemActual = "";

// Función para añadir un ítem
function addItem(item, precio, cantidad) {
    // Convertir precio y cantidad a números
    const precioBase = parseFloat(precio);
    const cantidadItem = parseInt(cantidad);

    // Almacenar los valores temporalmente en el modal (podemos usarlos localmente luego)
    document.getElementById('extrasModal').setAttribute('data-item', item);
    document.getElementById('extrasModal').setAttribute('data-precio', precioBase);
    document.getElementById('extrasModal').setAttribute('data-cantidad', cantidadItem);

    // Abrir modal para seleccionar extras
    document.getElementById('extrasModal').classList.remove('hidden');
}

function addItemLomi(item, precio, cantidad) {
    // Convertir precio y cantidad a números
    const precioBase = parseFloat(precio);
    const cantidadItem = parseInt(cantidad);

    // Almacenar los valores temporalmente en el modal (podemos usarlos localmente luego)
    document.getElementById('extrasModalLomi').setAttribute('data-item', item);
    document.getElementById('extrasModalLomi').setAttribute('data-precio', precioBase);
    document.getElementById('extrasModalLomi').setAttribute('data-cantidad', cantidadItem);

    // Abrir modal para seleccionar extras
    document.getElementById('extrasModalLomi').classList.remove('hidden');
}

// Función para añadir un ítem sin extras
function addItem1(item, precio, cantidad) {
    // Convertir precio y cantidad a números
    const precioBase = parseFloat(precio);
    const cantidadItem = parseInt(cantidad);

    // Calcular el subtotal para este ítem
    const subtotal = precioBase * cantidadItem;

    // Agregar el artículo al pedido
    pedido.push({ item: item, cantidad: cantidadItem, precio: subtotal });

    // Actualizar visualmente el pedido
    actualizarPedido();

    // Sumar el subtotal al total general
    total += subtotal;
    document.getElementById('total').innerText = total.toFixed(0); // Mostrar total actualizado

    // Actualizar el texto del botón de finalizar pedido con el total
    const finalizarPedidoBtn = document.getElementById('finalizarPedidoBtn');
    finalizarPedidoBtn.innerText = `Pedir por Whatsapp (Gs ${total.toFixed(0)})`;

    // Mostrar notificación de éxito
    mostrarNotificacion();
    finalizarPedidoBtn.classList.remove('hidden');

     // Resetear las cantidades a 1
    resetCantidadInputs();
}


// Función para actualizar la visualización del pedido
function actualizarPedido() {
    const pedidoDiv = document.getElementById('pedido');
    pedidoDiv.innerHTML = ''; // Limpiar el contenido previo

    pedido.forEach((articulo) => {
        const p = document.createElement('p');
        p.innerText = `${articulo.cantidad}x ${articulo.item} - Gs ${(articulo.precio).toFixed(0)}`;
        pedidoDiv.appendChild(p);
    });
}




function confirmarPedido() {
    // Obtener el producto, precio base y cantidad desde los atributos del modal
    const itemActual = document.getElementById('extrasModal').getAttribute('data-item');
    const precioActual = parseFloat(document.getElementById('extrasModal').getAttribute('data-precio'));
    const cantidadActual = parseInt(document.getElementById('extrasModal').getAttribute('data-cantidad'));

    const cantidadExtraCarne = parseInt(document.getElementById('cantidadExtraCarne').value) || 0;
    const cantidadExtraCheddar = parseInt(document.getElementById('cantidadExtraCheddar').value) || 0;
    const cantidadExtraBacon = parseInt(document.getElementById('cantidadExtraBacon').value) || 0;
    const cantidadExtraHuevo = parseInt(document.getElementById('cantidadExtraHuevo').value) || 0;
    const cantidadExtraLechuga = parseInt(document.getElementById('cantidadExtraLechuga').value) || 0;
    const cantidadExtraTomate = parseInt(document.getElementById('cantidadExtraTomate').value) || 0;

    let extrasTexto = [];
    let subtotal = precioActual * cantidadActual; // Precio del ítem base por la cantidad

    // Añadir extras al subtotal
    if (cantidadExtraCarne > 0) {
        extrasTexto.push(`${cantidadExtraCarne}x Extra Carne`);
        subtotal += 5000 * cantidadExtraCarne;
    }
    if (cantidadExtraCheddar > 0) {
        extrasTexto.push(`${cantidadExtraCheddar}x Extra Cheddar x`);
        subtotal += 2000 * cantidadExtraCheddar;
    }
    if (cantidadExtraBacon > 0) {
        extrasTexto.push(`${cantidadExtraBacon}x Extra Bacon`);
        subtotal += 3000 * cantidadExtraBacon;
    }
    if (cantidadExtraHuevo > 0) {
        extrasTexto.push(`${cantidadExtraHuevo}x Extra Huevo Frito`);
        subtotal += 4000 * cantidadExtraHuevo;
    }
    if (cantidadExtraLechuga > 0) {
        extrasTexto.push(`${cantidadExtraLechuga}x Extra Lechuga`);
        subtotal += 2000 * cantidadExtraLechuga;
    }
    if (cantidadExtraTomate > 0) {
        extrasTexto.push(`${cantidadExtraTomate}x Extra Tomate`);
        subtotal += 1000 * cantidadExtraTomate;
    }
    if (document.getElementById('otrosExtras').value) {
        extrasTexto.push(document.getElementById('otrosExtras').value);
    }

    const extrasTextoCompleto = extrasTexto.length > 0 ? ` (Extras: ${extrasTexto.join(', ')})` : '';

    // Agregar el artículo con los extras al pedido
    pedido.push({ item: itemActual + extrasTextoCompleto, cantidad: cantidadActual, precio: subtotal });

    // Actualizar visualmente el pedido
    actualizarPedido();

    // Sumar el subtotal al total general
    total += subtotal;
    document.getElementById('total').innerText = total.toFixed(0); // Mostrar total actualizado

    // Actualizar el texto del botón con el total entre paréntesis
    const finalizarPedidoBtn = document.getElementById('finalizarPedidoBtn');
    finalizarPedidoBtn.innerText = `Pedir por Whatsapp (Gs ${total.toFixed(0)})`;

    mostrarNotificacion();
    finalizarPedidoBtn.classList.remove('hidden');


    // Resetear las cantidades a 1
    resetCantidadInputs();

    cerrarModal();
}

function confirmarPedido1() {
    // Obtener el producto, precio base y cantidad desde los atributos del modal
    const itemActual = document.getElementById('extrasModalLomi').getAttribute('data-item');
    const precioActual = parseFloat(document.getElementById('extrasModalLomi').getAttribute('data-precio'));
    const cantidadActual = parseInt(document.getElementById('extrasModalLomi').getAttribute('data-cantidad'));

    const cantidadExtraLomi = parseInt(document.getElementById('cantidadExtraLomi').value) || 0;
    const cantidadExtraMuzza = parseInt(document.getElementById('cantidadExtraMuzza').value) || 0;
    const cantidadExtraBacon1 = parseInt(document.getElementById('cantidadExtraBacon1').value) || 0;
    const cantidadExtraHuevo1 = parseInt(document.getElementById('cantidadExtraHuevo1').value) || 0;
    const cantidadExtraLechuga1 = parseInt(document.getElementById('cantidadExtraLechuga1').value) || 0;
    const cantidadExtraTomate1 = parseInt(document.getElementById('cantidadExtraTomate1').value) || 0;

    let extrasTexto = [];
    let subtotal = precioActual * cantidadActual; // Precio del ítem base por la cantidad

    // Añadir extras al subtotal
    if (cantidadExtraLomi > 0) {
        extrasTexto.push(`${cantidadExtraLomi}x Extra Lomi`);
        subtotal += 7000 * cantidadExtraLomi;
    }
    if (cantidadExtraMuzza > 0) {
        extrasTexto.push(`${cantidadExtraMuzza}x Extra Muzarella x`);
        subtotal += 2000 * cantidadExtraMuzza;
    }
    if (cantidadExtraBacon1 > 0) {
        extrasTexto.push(`${cantidadExtraBacon1}x Extra Bacon`);
        subtotal += 3000 * cantidadExtraBacon1;
    }
    if (cantidadExtraHuevo1 > 0) {
        extrasTexto.push(`${cantidadExtraHuevo1}x Extra Huevo Frito`);
        subtotal += 4000 * cantidadExtraHuevo1;
    }
    if (cantidadExtraLechuga1 > 0) {
        extrasTexto.push(`${cantidadExtraLechuga1}x Extra Lechuga`);
        subtotal += 2000 * cantidadExtraLechuga1;
    }
    if (cantidadExtraTomate1 > 0) {
        extrasTexto.push(`${cantidadExtraTomate1}x Extra Tomate`);
        subtotal += 1000 * cantidadExtraTomate1;
    }
    if (document.getElementById('otrosExtras').value) {
        extrasTexto.push(document.getElementById('otrosExtras').value);
    }

    const extrasTextoCompleto = extrasTexto.length > 0 ? ` (Extras: ${extrasTexto.join(', ')})` : '';

    // Agregar el artículo con los extras al pedido
    pedido.push({ item: itemActual + extrasTextoCompleto, cantidad: cantidadActual, precio: subtotal });

    // Actualizar visualmente el pedido
    actualizarPedido();

    // Sumar el subtotal al total general
    total += subtotal;
    document.getElementById('total').innerText = total.toFixed(0); // Mostrar total actualizado

    // Actualizar el texto del botón con el total entre paréntesis
    const finalizarPedidoBtn = document.getElementById('finalizarPedidoBtn');
    finalizarPedidoBtn.innerText = `Pedir por Whatsapp (Gs ${total.toFixed(0)})`;

    mostrarNotificacion();
    finalizarPedidoBtn.classList.remove('hidden');


    // Resetear las cantidades a 1
    resetCantidadInputs();

    cerrarModalLomi();
}






// Función para mostrar la notificación
function mostrarNotificacion() {
    const notificacion = document.getElementById('notification');
    notificacion.classList.remove('hidden'); // Asegúrate de eliminar la clase hidden
    notificacion.classList.add('show'); // Añadir la clase show

    setTimeout(() => {
        notificacion.classList.remove('show'); // Eliminar la clase show después de 2 segundos
        notificacion.classList.add('hidden'); // Añadir la clase hidden para ocultar
    }, 2000); // Mostrar la notificación por 2 segundos
}


function cerrarModal() {
    // Ocultar el modal
    document.getElementById('extrasModal').classList.add('hidden');
    
    // Resetear los valores de los inputs de cantidad
    document.getElementById('cantidadExtraCarne').value = 0;
    document.getElementById('cantidadExtraCheddar').value = 0;
    document.getElementById('cantidadExtraBacon').value = 0;
    document.getElementById('cantidadExtraHuevo').value = 0;
    document.getElementById('cantidadExtraLechuga').value = 0;
    document.getElementById('cantidadExtraTomate').value = 0;

    // Resetear los checkboxes
    document.getElementById('extraCarne').checked = false;
    document.getElementById('extraCheddar').checked = false;
    document.getElementById('extraBacon').checked = false;
    document.getElementById('extraHuevo').checked = false;
    document.getElementById('extraLechuga').checked = false;
    document.getElementById('extraTomate').checked = false;

    // Deshabilitar todos los inputs de cantidad
    document.getElementById('cantidadExtraCarne').disabled = true;
    document.getElementById('cantidadExtraCheddar').disabled = true;
    document.getElementById('cantidadExtraBacon').disabled = true;
    document.getElementById('cantidadExtraHuevo').disabled = true;
    document.getElementById('cantidadExtraLechuga').disabled = true;
    document.getElementById('cantidadExtraTomate').disabled = true;

    // Resetear el campo de texto de "otrosExtras"
    document.getElementById('otrosExtras').value = '';

    // Limpiar los atributos de datos del modal
    document.getElementById('extrasModal').removeAttribute('data-item');
    document.getElementById('extrasModal').removeAttribute('data-precio');
    document.getElementById('extrasModal').removeAttribute('data-cantidad');
}

function cerrarModalLomi() {
    // Ocultar el modal
    document.getElementById('extrasModalLomi').classList.add('hidden');
    
    // Resetear los valores de los inputs de cantidad
    document.getElementById('cantidadExtraLomi').value = 0;
    document.getElementById('cantidadExtraMuzza').value = 0;
    document.getElementById('cantidadExtraBacon1').value = 0;
    document.getElementById('cantidadExtraHuevo1').value = 0;
    document.getElementById('cantidadExtraLechuga1').value = 0;
    document.getElementById('cantidadExtraTomate1').value = 0;

    // Resetear los checkboxes
    document.getElementById('extraLomi').checked = false;
    document.getElementById('extraMuzarella').checked = false;
    document.getElementById('extraBacon1').checked = false;
    document.getElementById('extraHuevo1').checked = false;
    document.getElementById('extraLechuga1').checked = false;
    document.getElementById('extraTomate1').checked = false;

    // Deshabilitar todos los inputs de cantidad
    document.getElementById('cantidadExtraLomi').disabled = true;
    document.getElementById('cantidadExtraMuzza').disabled = true;
    document.getElementById('cantidadExtraBacon1').disabled = true;
    document.getElementById('cantidadExtraHuevo1').disabled = true;
    document.getElementById('cantidadExtraLechuga1').disabled = true;
    document.getElementById('cantidadExtraTomate1').disabled = true;

    // Resetear el campo de texto de "otrosExtras"
    document.getElementById('otrosExtras').value = '';

    // Limpiar los atributos de datos del modal
    document.getElementById('extrasModalLomi').removeAttribute('data-item');
    document.getElementById('extrasModalLomi').removeAttribute('data-precio');
    document.getElementById('extrasModalLomi').removeAttribute('data-cantidad');
}






// Función para enviar el pedido por WhatsApp
function enviarPedido() {
    if (pedido.length === 0) {
        alert('No has añadido ningún artículo al pedido.');
        return;
    }

    let mensaje = 'Hola Don Sabor, mi pedido desde la web es:\n';
    pedido.forEach(articulo => {
        mensaje += `${articulo.cantidad}x ${articulo.item} - Gs ${articulo.precio.toFixed(0)}\n\n`;
    });
    mensaje += `Total: Gs ${total.toFixed(0)}`;


const telefono = '595973547459'; // Sustituye XXXXXXXXX por tu número de teléfono (sin el símbolo + ni espacios)
const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

window.open(url, '_blank');
}

// Función para actualizar el subtotal en tiempo real
function actualizarSubtotal() {
    const cantidadExtraCarne = parseInt(document.getElementById('cantidadExtraCarne').value) || 0;
    const cantidadExtraCheddar = parseInt(document.getElementById('cantidadExtraCheddar').value) || 0;
    const cantidadExtraBacon = parseInt(document.getElementById('cantidadExtraBacon').value) || 0;
    const cantidadExtraHuevo = parseInt(document.getElementById('cantidadExtraHuevo').value) || 0;
    const cantidadExtraLechuga = parseInt(document.getElementById('cantidadExtraLechuga').value) || 0;
    const cantidadExtraTomate = parseInt(document.getElementById('cantidadExtraTomate').value) || 0;

    const cantidadExtraLomi = parseInt(document.getElementById('cantidadExtraLomi').value) || 0;
    const cantidadExtraMuzza = parseInt(document.getElementById('cantidadExtraMuzza').value) || 0;
    const cantidadExtraBacon1 = parseInt(document.getElementById('cantidadExtraBacon1').value) || 0;
    const cantidadExtraHuevo1 = parseInt(document.getElementById('cantidadExtraHuevo1').value) || 0;
    const cantidadExtraLechuga1 = parseInt(document.getElementById('cantidadExtraLechuga1').value) || 0;
    const cantidadExtraTomate1 = parseInt(document.getElementById('cantidadExtraTomate1').value) || 0;




    let subtotal = precioActual * cantidadActual;
    subtotal += 5000 * cantidadExtraCarne;
    subtotal += 2000 * cantidadExtraCheddar;
    subtotal += 3000 * cantidadExtraBacon;
    subtotal += 4000 * cantidadExtraHuevo;
    subtotal += 2000 * cantidadExtraLechuga;
    subtotal += 1000 * cantidadExtraTomate;

    subtotal += 7000 * cantidadExtraLomi;
    subtotal += 2000 * cantidadExtraMuzza;
    subtotal += 3000 * cantidadExtraBacon1;
    subtotal += 4000 * cantidadExtraHuevo1;
    subtotal += 2000 * cantidadExtraLechuga1;
    subtotal += 1000 * cantidadExtraTomate1;


    document.getElementById('subtotal').innerText = subtotal.toFixed(0);
}

// Función para habilitar/deshabilitar inputs de cantidad extra
function toggleInput(checkboxId, inputId) {
    const checkbox = document.getElementById(checkboxId);
    const input = document.getElementById(inputId);

    if (checkbox.checked) {
        input.disabled = false;
        input.value = 1;
    } else {
        input.disabled = true;
        input.value = 0;
    }
}

// Función para mostrar el resumen del pedido
function verResumenPedido() {
    // Limpiar el contenido previo del resumen
    const resumenDiv = document.getElementById('resumenPedido');
    resumenDiv.innerHTML = '';

    // Crear el contenido del resumen
    pedido.forEach(articulo => {
        const p = document.createElement('p');
        p.innerText = `${articulo.cantidad}x ${articulo.item} - Gs${articulo.precio.toFixed(0)}`;
        resumenDiv.appendChild(p);
    });

    // Mostrar el total en el resumen
    const totalResumen = document.getElementById('totalResumen');
    totalResumen.innerText = `Total: Gs ${total.toFixed(0)}`;

    // Mostrar el modal
    document.getElementById('resumenModal').classList.remove('hidden');
}

// Función para cerrar el modal
function cerrarResumenModal() {
    // Ocultar el modal
    document.getElementById('resumenModal').classList.add('hidden');
}


window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0); // Desplazar a la parte superior
});


function cambiarCantidad(inputId, cambio) {
    const input = document.getElementById(inputId);
    let cantidadActual = parseInt(input.value);

    // Cambiar la cantidad según el botón presionado
    cantidadActual += cambio;

    // Asegurarse de que no sea menor que 1
    if (cantidadActual < 1) {
        cantidadActual = 1;
    }

    // Actualizar el valor del input
    input.value = cantidadActual;
}

// Función para resetear los inputs de cantidad
function resetCantidadInputs() {
    const inputsCantidad = document.querySelectorAll('.quantity-controls input[type="number"]');
    inputsCantidad.forEach(input => {
        input.value = 1; // Resetear cada input a 1
    });
}


