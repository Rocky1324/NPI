/**
 * User Menu UI Component
 * Displays login button or user name with logout + stats link
 */
(function(){
  'use strict';

  // i18n helper
  function t(key) {
    return window.i18n ? window.i18n.t(key) : key;
  }

  // Create element helper
  function el(tag, attrs, children) {
    const element = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(key => {
        if (key === 'class') {
          element.className = attrs[key];
        } else if (key.startsWith('data-')) {
          element.setAttribute(key, attrs[key]);
        } else if (key === 'style' && typeof attrs[key] === 'object') {
          Object.assign(element.style, attrs[key]);
        } else {
          element[key] = attrs[key];
        }
      });
    }
    if (children) {
      children.forEach(child => {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        } else {
          element.appendChild(child);
        }
      });
    }
    return element;
  }

  // Inject styles
  function injectStyles() {
    if (document.getElementById('user-menu-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'user-menu-styles';
    style.textContent = `
      .user-menu {
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 999998;
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(6,16,28,0.95);
        padding: 8px 12px;
        border-radius: 12px;
        border: 2px solid rgba(255,255,255,0.1);
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        font-family: inherit;
        font-size: 14px;
        color: #e6eef6;
      }
      .user-menu-btn {
        background: rgba(6,182,212,0.1);
        border: 1px solid rgba(6,182,212,0.3);
        color: #06b6d4;
        padding: 6px 12px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        font-family: inherit;
        font-size: 13px;
      }
      .user-menu-btn:hover {
        background: rgba(6,182,212,0.2);
        border-color: #06b6d4;
      }
      .user-menu-name {
        font-weight: 700;
        color: #06b6d4;
      }
      .user-menu-icon {
        font-size: 16px;
      }
      .user-menu-link {
        color: #e6eef6;
        text-decoration: none;
        padding: 4px 8px;
        border-radius: 6px;
        transition: background 0.2s;
      }
      .user-menu-link:hover {
        background: rgba(255,255,255,0.05);
      }
      
      /* Login Modal */
      .login-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.6);
        backdrop-filter: blur(4px);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.2s ease;
      }
      .login-modal {
        background: linear-gradient(180deg, #0a1420, #071226);
        border: 1px solid rgba(6,182,212,0.3);
        border-radius: 16px;
        padding: 24px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        animation: slideUp 0.3s ease;
      }
      .login-modal h2 {
        margin: 0 0 8px 0;
        color: #06b6d4;
        font-size: 24px;
        font-weight: 800;
      }
      .login-modal p {
        margin: 0 0 20px 0;
        color: #9aa8b7;
        font-size: 14px;
      }
      .login-form {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .login-input {
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 10px;
        padding: 12px 14px;
        color: #e6eef6;
        font-family: inherit;
        font-size: 15px;
        transition: all 0.2s;
      }
      .login-input:focus {
        outline: none;
        border-color: #06b6d4;
        background: rgba(255,255,255,0.08);
      }
      .login-buttons {
        display: flex;
        gap: 8px;
        margin-top: 8px;
      }
      .login-submit, .login-cancel {
        flex: 1;
        padding: 10px;
        border-radius: 10px;
        font-weight: 700;
        font-family: inherit;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s;
        border: none;
      }
      .login-submit {
        background: linear-gradient(90deg, #06b6d4, #0891b2);
        color: #021223;
      }
      .login-submit:hover {
        filter: brightness(1.1);
        transform: translateY(-1px);
      }
      .login-submit:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .login-cancel {
        background: rgba(255,255,255,0.05);
        color: #e6eef6;
        border: 1px solid rgba(255,255,255,0.1);
      }
      .login-cancel:hover {
        background: rgba(255,255,255,0.1);
      }
      .login-error {
        background: rgba(239,68,68,0.1);
        border: 1px solid rgba(239,68,68,0.3);
        color: #ef4444;
        padding: 10px 12px;
        border-radius: 8px;
        font-size: 13px;
        margin-bottom: 12px;
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }

  class UserMenu {
    constructor() {
      this.container = null;
      this.modal = null;
      injectStyles();
      this.render();
      
      // Listen to session changes
      if (window.userSession) {
        window.userSession.onChange(() => this.render());
      }
      
      // Listen to language changes
      window.addEventListener('languagechange', () => this.render());
    }

    render() {
      // Remove existing
      if (this.container) {
        this.container.remove();
      }

      const session = window.userSession;
      if (!session) return;

      const isLoggedIn = session.isLoggedIn();
      const username = session.getUser();

      if (isLoggedIn) {
        this.renderLoggedIn(username);
      } else {
        this.renderLoggedOut();
      }
    }

    renderLoggedOut() {
      this.container = el('div', { class: 'user-menu' }, [
        el('span', { class: 'user-menu-icon' }, ['👤']),
        el('button', { 
          class: 'user-menu-btn',
          onclick: () => this.showLoginModal()
        }, [t('user.login') || 'Se connecter'])
      ]);
      document.body.appendChild(this.container);
    }

    renderLoggedIn(username) {
      this.container = el('div', { class: 'user-menu' }, [
        el('span', { class: 'user-menu-icon' }, ['👤']),
        el('span', { class: 'user-menu-name' }, [username]),
        el('span', { style: { color: '#4b5563' } }, ['•']),
        el('a', { 
          class: 'user-menu-link',
          href: '/stats.html'
        }, ['📊 ' + (t('user.stats') || 'Stats')]),
        el('span', { style: { color: '#4b5563' } }, ['•']),
        el('button', {
          class: 'user-menu-btn',
          onclick: () => this.logout()
        }, [t('user.logout') || 'Déconnexion'])
      ]);
      document.body.appendChild(this.container);
    }

    showLoginModal() {
      if (this.modal) this.modal.remove();

      let errorEl = null;
      let inputEl = null;

      const showError = (key) => {
        if (errorEl) {
          errorEl.textContent = t(`user.error.${key}`) || t('user.error.generic');
          errorEl.style.display = 'block';
        }
      };

      const hideError = () => {
        if (errorEl) errorEl.style.display = 'none';
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        hideError();
        const username = inputEl.value;
        const result = window.userSession.login(username);
        if (result.success) {
          this.closeLoginModal();
          // Track login
          if (window.analytics) {
            window.analytics.trackEvent('user_login', { username: result.username });
          }
        } else {
          showError(result.error);
        }
      };

      const modal = el('div', { class: 'login-overlay' }, [
        el('div', { class: 'login-modal' }, [
          el('h2', {}, [t('user.login_title') || 'Connexion']),
          el('p', {}, [t('user.login_subtitle') || 'Entrez votre nom pour accéder aux statistiques.']),
          errorEl = el('div', { 
            class: 'login-error',
            style: { display: 'none' }
          }, ['']),
          el('form', { 
            class: 'login-form',
            onsubmit: handleSubmit
          }, [
            inputEl = el('input', {
              type: 'text',
              class: 'login-input',
              placeholder: t('user.name_placeholder') || 'Votre nom complet',
              required: true,
              autofocus: true
            }),
            el('div', { class: 'login-buttons' }, [
              el('button', {
                type: 'submit',
                class: 'login-submit'
              }, [t('user.login') || 'Se connecter']),
              el('button', {
                type: 'button',
                class: 'login-cancel',
                onclick: () => this.closeLoginModal()
              }, [t('user.cancel') || 'Annuler'])
            ])
          ])
        ])
      ]);

      // Close on overlay click
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeLoginModal();
      });

      // Close on Escape
      const escapeHandler = (e) => {
        if (e.key === 'Escape') {
          this.closeLoginModal();
          document.removeEventListener('keydown', escapeHandler);
        }
      };
      document.addEventListener('keydown', escapeHandler);

      this.modal = modal;
      document.body.appendChild(modal);
      
      // Focus input
      setTimeout(() => inputEl?.focus(), 100);
    }

    closeLoginModal() {
      if (this.modal) {
        this.modal.remove();
        this.modal = null;
      }
    }

    logout() {
      if (confirm(t('user.logout_confirm') || 'Êtes-vous sûr de vouloir vous déconnecter ?')) {
        window.userSession.logout();
        // Track logout
        if (window.analytics) {
          window.analytics.trackEvent('user_logout');
        }
        // Redirect to home if on stats page
        if (window.location.pathname.includes('stats.html')) {
          window.location.href = '/';
        }
      }
    }
  }

  // Initialize when DOM is ready
  function init() {
    if (document.getElementById('user-menu-instance')) return;
    const marker = document.createElement('div');
    marker.id = 'user-menu-instance';
    marker.style.display = 'none';
    document.body.appendChild(marker);
    
    new UserMenu();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
