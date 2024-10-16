let pedido = [];

function addItem(item, cantidad) {
    // Agregar el artículo y la cantidad al pedido
    pedido.push({ item, cantidad });

    // Actualizar el pedido visualmente
    actualizarPedido();

    // Mostrar notificación de que se añadió un artículo
    mostrarNotificacion();

    // Mostrar el botón de "Finalizar Pedido"
    document.getElementById('finalizarPedidoBtn').classList.remove('hidden');
}

function actualizarPedido() {
    const pedidoDiv = document.getElementById('pedido');
    pedidoDiv.innerHTML = ''; // Limpiar contenido previo

    pedido.forEach((articulo, index) => {
        const p = document.createElement('p');
        p.innerText = `${articulo.cantidad}x ${articulo.item}`;
        pedidoDiv.appendChild(p);
    });
}

function mostrarNotificacion() {
    const notificacion = document.getElementById('notification');
    notificacion.classList.add('show');

    setTimeout(() => {
        notificacion.classList.remove('show');
    }, 2000); // La notificación desaparecerá después de 2 segundos
}

function enviarPedido() {
    if (pedido.length === 0) {
        alert('No has añadido ningún artículo al pedido.');
        return;
    }

    let mensaje = 'Tu pedido:\n';
    pedido.forEach(articulo => {
        mensaje += `${articulo.cantidad}x ${articulo.item}\n`;
    });

    const url = `https://wa.me/1234567890?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}
