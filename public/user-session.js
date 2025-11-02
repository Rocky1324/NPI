/**
 * User Session Manager
 * Simple localStorage-based session for authorized users
 * No password required - just name validation against whitelist
 */
(function(){
  'use strict';

  // Authorized users whitelist (same as stats.js)
  const AUTHORIZED_USERS = [
    'amicy christian',
    'saina dasque',
    'dorotti opont',
    'shekinah shery',
    'rock khyshnert',
    'delor karine',
    'hilary pierre-louis'
  ];
  
  const STORAGE_KEY = 'npi_user_session';

  class UserSession {
    constructor() {
      this.currentUser = this.loadSession();
      this.listeners = [];
    }

    // Load session from localStorage
    loadSession() {
      try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return null;
        const session = JSON.parse(data);
        // Validate session
        if (session && session.username && this.isAuthorized(session.username)) {
          return session.username;
        }
      } catch (e) {
        console.warn('Failed to load session:', e);
      }
      return null;
    }

    // Save session to localStorage
    saveSession(username) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          username,
          timestamp: Date.now()
        }));
        this.currentUser = username;
        this.notifyListeners();
      } catch (e) {
        console.error('Failed to save session:', e);
      }
    }

    // Clear session
    clearSession() {
      try {
        localStorage.removeItem(STORAGE_KEY);
        this.currentUser = null;
        this.notifyListeners();
      } catch (e) {
        console.error('Failed to clear session:', e);
      }
    }

    // Check if username is in whitelist
    isAuthorized(username) {
      if (!username) return false;
      const normalized = username.trim().toLowerCase();
      return AUTHORIZED_USERS.some(u => u.toLowerCase() === normalized);
    }

    // Login attempt
    login(username) {
      const trimmed = username.trim();
      if (!trimmed) {
        return { success: false, error: 'username_empty' };
      }
      if (!this.isAuthorized(trimmed)) {
        return { success: false, error: 'not_authorized' };
      }
      this.saveSession(trimmed);
      return { success: true, username: trimmed };
    }

    // Logout
    logout() {
      this.clearSession();
    }

    // Check if user is logged in
    isLoggedIn() {
      return !!this.currentUser;
    }

    // Get current user
    getUser() {
      return this.currentUser;
    }

    // Listen for session changes
    onChange(callback) {
      this.listeners.push(callback);
    }

    // Notify listeners
    notifyListeners() {
      this.listeners.forEach(cb => {
        try {
          cb(this.currentUser);
        } catch (e) {
          console.error('Session listener error:', e);
        }
      });
    }
  }

  // Create global instance
  window.userSession = new UserSession();

  // Export for modules
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserSession;
  }
})();
