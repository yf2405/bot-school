const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Inicialización del cliente
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
    }
});

// Genera el QR si no estás autenticado
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Escanea el código QR para iniciar sesión.');
});

// El bot está listo
client.on('ready', () => {
    console.log('El bot está listo y conectado.');
});

// Función para obtener el día de la semana y devolver un link
function getLinkByDay() {
    const daysOfWeek = [
        "domingo",
        "lunes",
        "martes",
        "miércoles",
        "jueves",
        "viernes",
        "sábado"
    ];

    // Obtener el día actual
    const currentDay = new Date().getDay(); // 0 es domingo, 1 es lunes, etc.

    // Links para cada día
    const links = {
        "lunes": "*Arq-soft*:\n Lunes 6:30 pm a 9:00 LINK: https://meet.google.com/eyi-ovse-zfo",
        "martes": "*Compiladores:*\n Martes 7:15pm https://meet.google.com/snw-qvjr-dvf*Martes 7:15pm https://meet.google.com/snw-qvjr-dvf",
        "miércoles": "*Segurudad Informatica*:\n Clase 8:15 pm:  https://meet.google.com/jng-pgwm-oko",
        "jueves": "*Cal-Vectorial*:CLASE JUEVES 6:30 PM: https://meet.google.com/kqz-jngw-mfg?authuser=0&hs=179",
        "viernes": "No hay Enlace desacanse",
        "sábado": "No hay Enlace desacanse",
        "domingo": "No hay Enlace desacanse"
    };

    // Devolver el enlace correspondiente al día actual
    return links[daysOfWeek[currentDay]];
}

// Capturar mensajes
client.on('message', async message => {
    console.log(`Mensaje recibido de ${message.from}: ${message.body}`);

    // Procesar solo mensajes de grupos
    if (message.from.includes('@g.us')) {
        // Si el mensaje es '/Horarios', responder con los horarios
        if (message.body.toLowerCase() === '/horarios') {
            message.reply('Aquí están los horarios:\n- Lunes a Jueves: 6:30 PM - 10:30 PM');
        }

        // Si el mensaje es '/link', enviar el link correspondiente al día
        if (message.body.toLowerCase() === '/link') {
            const link = getLinkByDay();
            message.reply(`Aquí está tu enlace del día: ${link}`);
        }
    }
});

// Manejo de desconexión
client.on('disconnected', (reason) => {
    console.log('El bot se ha desconectado:', reason);
});

client.initialize();

