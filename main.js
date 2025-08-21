
// === Плавный скролл ===
document.querySelectorAll('.nav a').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// === Бургер-меню ===
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  nav.classList.toggle('open');
});

// === Форма отправки в Telegram ===
document.querySelector('#contactForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const name = this.querySelector('input[name="name"]').value.trim();
  const email = this.querySelector('input[name="email"]').value.trim();
  const subject = this.querySelector('input[name="subject"]').value.trim();
  const message = this.querySelector('textarea[name="message"]').value.trim();

  const status = document.getElementById('formStatus');
  status.textContent = "Отправка...";

  const telegramMessage = `
New message from contact form:

Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}
  `;

  const telegramBotToken = '7090576897:AAH3vxzJe8L4Cp0IOLfMF_Kr36EeWzhJsiM';  
  const chatId = '1406491528';  

  const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;

  try {
    const response = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage
      })
    });

    if (response.ok) {
      status.textContent = "Сообщение успешно отправлено!";
      this.reset();
    } else {
      throw new Error('Ошибка сервера');
    }
  } catch (error) {
    console.error('Ошибка:', error);
    status.textContent = "Не удалось отправить сообщение.";
  }
});


// Когда сайт загрузился
window.onload = function () {
  fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: "⚡ Кто-то зашёл на сайт!"
    })
  })
  .then(res => res.json())
  .then(data => console.log("Сообщение отправлено:", data))
  .catch(err => console.error("Ошибка:", err));
};
