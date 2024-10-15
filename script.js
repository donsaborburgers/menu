let pedido = [];

function addItem(item, cantidad) {
    if (cantidad > 0) {
        pedido.push({ item: item, cantidad: parseInt(cantidad) });
        actualizarPedido();
        mostrarNotificacion();
    } else {
        alert("Por favor, selecciona una cantidad válida.");
    }
}

function actualizarPedido() {
    const pedidoDiv = document.getElementById('pedido');
    pedidoDiv.innerHTML = '';
    pedido.forEach((pedidoItem) => {
        const itemPedido = document.createElement('p');
        itemPedido.textContent = `${pedidoItem.cantidad}x ${pedidoItem.item}`;
        pedidoDiv.appendChild(itemPedido);
    });
}

function mostrarNotificacion() {
    const notification = document.getElementById('notification');
    notification.classList.remove('hidden');
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hidden');
    }, 2000);
}

function enviarPedido() {
    let mensajePedido = 'Pedido:\n';
    pedido.forEach(p => {
        mensajePedido += `${p.cantidad}x ${p.item}\n`;
    });
    const mensajeWhatsApp = encodeURIComponent(mensajePedido);
    const numeroWhatsApp = "123456789"; // Reemplaza con tu número de WhatsApp
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensajeWhatsApp}`;
    window.open(url, '_blank');
}
