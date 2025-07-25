// Smooth scroll for navbar links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    if (this.hash !== "") {
      e.preventDefault();
      const hash = this.hash;
      document.querySelector(hash).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Chatbot toggle logic
window.addEventListener('DOMContentLoaded', () => {
  const chatbot = document.getElementById('chatbot');
  const toggleBtn = document.getElementById('chatbotToggle');
  const closeBtn = document.getElementById('chatbotClose');
  // Hide chatbot by default
  chatbot.classList.remove('active');
  chatbot.style.display = '';
  // Toggle on button click
  toggleBtn.addEventListener('click', () => {
    chatbot.classList.toggle('active');
    // Optionally hide toggle button when open
    toggleBtn.style.display = chatbot.classList.contains('active') ? 'none' : '';
  });
  // Close on close button
  closeBtn.addEventListener('click', () => {
    chatbot.classList.remove('active');
    toggleBtn.style.display = '';
  });
});

// --- Anime.js Animation for Download App Buttons & Icon ---
window.addEventListener('DOMContentLoaded', () => {
  // Bounce effect for download app icon
  if (window.anime) {
    anime({
      targets: '.download-app-icon',
      translateY: [0, -16, 0, -8, 0],
      easing: 'easeInOutCubic',
      duration: 1800,
      loop: true,
      direction: 'normal',
      delay: 200
    });
  }

  // Animate store badges on load
  if (window.anime) {
    anime({
      targets: '.store-badge',
      opacity: [0, 1],
      scale: [0.85, 1],
      delay: anime.stagger(120, {start: 300}),
      duration: 900,
      easing: 'easeOutBack'
    });
    // Animate on hover/focus
    document.querySelectorAll('.store-badge').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        anime({
          targets: btn,
          scale: 1.09,
          duration: 400,
          easing: 'spring(1, 80, 10, 0)'
        });
      });
      btn.addEventListener('mouseleave', () => {
        anime({
          targets: btn,
          scale: 1,
          duration: 400,
          easing: 'easeOutExpo'
        });
      });
      btn.addEventListener('focus', () => {
        anime({
          targets: btn,
          scale: 1.09,
          duration: 400,
          easing: 'spring(1, 80, 10, 0)'
        });
      });
      btn.addEventListener('blur', () => {
        anime({
          targets: btn,
          scale: 1,
          duration: 400,
          easing: 'easeOutExpo'
        });
      });
    });
  }
});

// Flight board mock data (can be replaced with API)
const flights = [
  { time: '12:30', type: 'وصول', flight: 'SD123', from: 'القاهرة', to: 'الخرطوم', status: 'وصلت' },
  { time: '13:00', type: 'مغادرة', flight: 'SD456', from: 'الخرطوم', to: 'دبي', status: 'في الوقت' },
  { time: '14:15', type: 'وصول', flight: 'SD789', from: 'إسطنبول', to: 'الخرطوم', status: 'متأخرة' },
  { time: '15:00', type: 'مغادرة', flight: 'SD321', from: 'الخرطوم', to: 'جدة', status: 'في الوقت' }
];

function renderFlightBoard() {
  const board = document.getElementById('flightBoard');
  if (!board) return;
  let html = `<div class="table-responsive"><table class="table table-striped table-hover text-center align-middle">
    <thead class="table-dark">
      <tr>
        <th>الوقت</th>
        <th>نوع الرحلة</th>
        <th>رقم الرحلة</th>
        <th>من</th>
        <th>إلى</th>
        <th>الحالة</th>
      </tr>
    </thead>
    <tbody>`;
  flights.forEach(f => {
    html += `<tr>
      <td>${f.time}</td>
      <td>${f.type}</td>
      <td>${f.flight}</td>
      <td>${f.from}</td>
      <td>${f.to}</td>
      <td>${f.status}</td>
    </tr>`;
  });
  html += '</tbody></table></div>';
  board.innerHTML = html;
}
window.addEventListener('DOMContentLoaded', renderFlightBoard);

// Initialize WOW.js for scroll animations
if (window.WOW) {
  new WOW().init();
}


// Simple Chatbot Logic
const chatbotBody = document.getElementById('chatbotBody');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

const botReplies = [
  { q: /رحلة|flight|flights|رحلات/i, a: 'يمكنك الاطلاع على لوحة الرحلات أعلاه لمعلومات الرحلات الحالية.' },
  { q: /موقع|location|أين المطار/i, a: 'مطار الخرطوم يقع في قلب العاصمة السودانية الخرطوم.' },
  { q: /تواصل|contact|هاتف/i, a: 'يمكنك التواصل معنا عبر نموذج التواصل في الأسفل أو الاتصال على 0024912345678.' },
  { q: /شكرا|thanks/i, a: 'على الرحب والسعة! إذا احتجت أي مساعدة أخرى أنا هنا.' },
];

function addMessage(message, sender = 'bot') {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chatbot-message ' + sender;
  msgDiv.textContent = message;
  chatbotBody.appendChild(msgDiv);
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function getBotReply(userMsg) {
  for (let r of botReplies) {
    if (r.q.test(userMsg)) return r.a;
  }
  return 'عذراً، لم أفهم سؤالك. يمكنك إعادة صياغته أو التواصل مع الدعم.';
}

chatbotSend.addEventListener('click', () => {
  const userMsg = chatbotInput.value.trim();
  if (!userMsg) return;
  addMessage(userMsg, 'user');
  setTimeout(() => {
    addMessage(getBotReply(userMsg), 'bot');
  }, 650);
  chatbotInput.value = '';
});

chatbotInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') chatbotSend.click();
});
