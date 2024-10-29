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
        extrasTexto.push(`Extra Carne x${cantidadExtraCarne}`);
        subtotal += 5000 * cantidadExtraCarne; // Precio del extra Carne
    }
    if (cantidadExtraCheddar > 0) {
        extrasTexto.push(`Extra Cheddar x${cantidadExtraCheddar}`);
        subtotal += 2000 * cantidadExtraCheddar; // Precio del extra Bacon
    }
    if (cantidadExtraBacon > 0) {
        extrasTexto.push(`Extra Bacon x${cantidadExtraBacon}`);
        subtotal += 3000 * cantidadExtraBacon; // Precio del extra Bacon
    }
    if (cantidadExtraHuevo > 0) {
        extrasTexto.push(`Extra Huevo Frito x${cantidadExtraHuevo}`);
        subtotal += 4000 * cantidadExtraHuevo; // Precio del extra Bacon
    }
    if (cantidadExtraLechuga > 0) {
        extrasTexto.push(`Extra Lechuga x${cantidadExtraLechuga}`);
        subtotal += 2000 * cantidadExtraLechuga; // Precio del extra Bacon
    }
    if (cantidadExtraTomate > 0) {
        extrasTexto.push(`Extra Tomate x${cantidadExtraTomate}`);
        subtotal += 1000 * cantidadExtraTomate; // Precio del extra Bacon
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

    mostrarNotificacion();
    document.getElementById('finalizarPedidoBtn').classList.remove('hidden');

    // Resetear la cantidad de las hamburguesas a 1 después de confirmar el pedido
    document.getElementById('cantidad-clasica').value = 1;

    // Finalmente cerrar el modal

    cerrarModal();
}



// Función para actualizar la visualización del pedido
function actualizarPedido() {
    const pedidoDiv = document.getElementById('pedido');
    pedidoDiv.innerHTML = ''; // Limpiar el contenido previo

    pedido.forEach((articulo) => {
        const p = document.createElement('p');
        p.innerText = `${articulo.cantidad}x ${articulo.item} - Gs${(articulo.precio).toFixed(0)}`;
        pedidoDiv.appendChild(p);
    });
}

// Función para mostrar la notificación
function mostrarNotificacion() {
    const notificacion = document.getElementById('notification');
    notificacion.classList.add('show');
    setTimeout(() => {
        notificacion.classList.remove('show');
    }, 2000); // Mostrar la notificación por 2 segundos
}

function cerrarModal() {
    document.getElementById('extrasModal').classList.add('hidden');
    
    // Resetear los valores del modal
    document.getElementById('cantidadExtraCarne').value = 0;
    document.getElementById('cantidadExtraCheddar').value = 0;
    document.getElementById('cantidadExtraBacon').value = 0;
    document.getElementById('cantidadExtraHuevo').value = 0;
    document.getElementById('cantidadExtraLechuga').value = 0;
    document.getElementById('cantidadExtraTomate').value = 0;

    document.getElementById('otrosExtras').value = '';
    
    // Limpiar los atributos del modal
    document.getElementById('extrasModal').removeAttribute('data-item');
    document.getElementById('extrasModal').removeAttribute('data-precio');
    document.getElementById('extrasModal').removeAttribute('data-cantidad');

    // Resetear la cantidad de las hamburguesas a 1
    document.getElementById('cantidad-clasica').value = 1; // Si tienes más items, haz lo mismo con sus respectivos IDs
}



// Función para enviar el pedido por WhatsApp
function enviarPedido() {
    if (pedido.length === 0) {
        alert('No has añadido ningún artículo al pedido.');
        return;
    }

    let mensaje = 'Tu pedido:\n';
    pedido.forEach(articulo => {
        mensaje += `${articulo.cantidad}x ${articulo.item} - Gs${articulo.precio.toFixed(0)}\n`;
    });
    mensaje += `Total: Gs${total.toFixed(0)}`;


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


    let subtotal = precioActual * cantidadActual;
    subtotal += 5000 * cantidadExtraCarne;
    subtotal += 2000 * cantidadExtraCheddar;
    subtotal += 3000 * cantidadExtraBacon;
    subtotal += 4000 * cantidadExtraHuevo;
    subtotal += 2000 * cantidadExtraLechuga;
    subtotal += 1000 * cantidadExtraTomate;

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
