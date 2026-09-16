/* Client area shared helpers */
(function() {
  window.SC_CLIENT = {
    ensureClient() {
      const user = JSON.parse(localStorage.getItem('sc_user') || 'null');
      if (!user || user.role !== 'client') {
        // Auto login as demo client for convenience when accessing client area
        localStorage.setItem('sc_user', JSON.stringify({
          email: 'lucas.almeida@email.com',
          name: 'Lucas Almeida',
          role: 'client'
        }));
      }
    },
    logout() {
      localStorage.removeItem('sc_user');
      location.href = '../login.html';
    }
  };
})();
