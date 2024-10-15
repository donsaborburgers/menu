let pedido = [];

function addItem(item) {
    pedido.push(item);
    actualizarPedido();
}

function actualizarPedido() {
    const pedidoDiv = document.getElementById('pedido');
    pedidoDiv.innerHTML = ''; // Limpiar contenido previo

    if (pedido.length === 0) {
        pedidoDiv.innerHTML = '<p>Aún no has agregado nada al pedido.</p>';
    } else {
        pedido.forEach((item, index) => {
            pedidoDiv.innerHTML += `<p>${index + 1}. ${item}</p>`;
        });
    }
}

function enviarPedido() {
    if (pedido.length === 0) {
        alert('No has seleccionado ningún producto.');
        return;
    }

    let mensaje = 'Este es mi pedido: \n';
    pedido.forEach((item, index) => {
        mensaje += `${index + 1}. ${item}\n`;
    });

    let telefono = '549123456789'; // Reemplaza con el número al que quieres enviar el pedido
    let urlWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    
    window.open(urlWhatsApp, '_blank');
}
