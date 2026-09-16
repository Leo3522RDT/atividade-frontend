/* Shared Admin helpers + Notifications */
(function() {
  const NOTIFICATIONS = [
    { id: 1, text: 'Novo agendamento: João Silva — Corte + Barba', time: '08:30', unread: true },
    { id: 2, text: 'Pagamento recebido: R$ 120,00 de Mateus Rocha', time: 'Ontem', unread: true },
    { id: 3, text: 'Estoque baixo: Óleo para Barba (15 un.)', time: 'Ontem', unread: true },
    { id: 4, text: 'Novo cliente cadastrado: Lucas Almeida', time: '07:15', unread: false },
    { id: 5, text: 'Serviço concluído: Rafael Lima', time: 'Ontem 17:30', unread: false }
  ];

  window.SC_ADMIN = {
    getNotifications() {
      return JSON.parse(localStorage.getItem('sc_notifications') || JSON.stringify(NOTIFICATIONS));
    },
    markAllRead() {
      const list = this.getNotifications().map(n => ({ ...n, unread: false }));
      localStorage.setItem('sc_notifications', JSON.stringify(list));
      return list;
    },
    unreadCount() {
      return this.getNotifications().filter(n => n.unread).length;
    },
    renderNotifications() {
      const list = this.getNotifications();
      const count = list.filter(n => n.unread).length;
      const badge = document.getElementById('notifBadge');
      const dropdown = document.getElementById('notifDropdown');
      if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
      }
      if (dropdown) {
        dropdown.innerHTML = list.map(n => `
          <div class="notif-item ${n.unread ? 'unread' : ''}">
            <div class="notif-text">${n.text}</div>
            <div class="notif-time">${n.time}</div>
          </div>
        `).join('') + `
          <div class="notif-footer">
            <button onclick="SC_ADMIN.markAllRead(); SC_ADMIN.renderNotifications(); SC.showToast('Todas marcadas como lidas')">Marcar todas como lidas</button>
          </div>`;
      }
    },
    toggleNotif() {
      const dd = document.getElementById('notifDropdown');
      if (dd) dd.classList.toggle('show');
    }
  };

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    const bell = document.getElementById('notifBell');
    const dd = document.getElementById('notifDropdown');
    if (dd && bell && !bell.contains(e.target) && !dd.contains(e.target)) {
      dd.classList.remove('show');
    }
  });
})();
