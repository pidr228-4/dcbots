// Получаем параметр ref из URL
const urlParams = new URLSearchParams(window.location.search);
const ref = urlParams.get('ref');

if (ref) {
    // Сохраняем в localStorage, чтобы отследить покупку
    localStorage.setItem('referrer', ref);
    
    // Отправляем уведомление в Telegram
    fetch('https://api.telegram.org/bot/ТВОЙ_ТОКЕН/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: 'ТВОЙ_ID',
            text: `🔗 Новый переход!\nПартнер: ${ref}\nIP: ${await getIP()}\nСтраница: ${window.location.href}`
        })
    });
}

async function getIP() {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip;
}
