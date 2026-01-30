// Authentication and User Management System
'use strict';

// ==================== User Storage ====================
class UserManager {
    constructor() {
        this.currentUser = null;
        this.sessionKey = 'dezo_max_session';
        this.usersKey = 'dezo_max_users';
        this.init();
    }

    init() {
        // Check for existing session
        this.checkSession();
    }

    // Get all users from localStorage
    getUsers() {
        const users = localStorage.getItem(this.usersKey);
        return users ? JSON.parse(users) : {};
    }

    // Save users to localStorage
    saveUsers(users) {
        localStorage.setItem(this.usersKey, JSON.stringify(users));
    }

    // Register new user
    register(email, password, name) {
        const users = this.getUsers();
        
        // Check if user already exists
        if (users[email]) {
            return { success: false, message: 'Bu email allaqachon ro\'yxatdan o\'tgan' };
        }

        // Validate email format
        if (!this.validateEmail(email)) {
            return { success: false, message: 'Noto\'g\'ri email formati' };
        }

        // Validate password (min 6 characters)
        if (password.length < 6) {
            return { success: false, message: 'Parol kamida 6 belgidan iborat bo\'lishi kerak' };
        }

        // Create new user
        const userId = this.generateUserId();
        const user = {
            id: userId,
            email: email,
            name: name || email.split('@')[0],
            password: this.hashPassword(password), // Simple hash for demo
            plan: 'basic', // 'basic' or 'premium'
            createdAt: new Date().toISOString(),
            bookmarks: [],
            watchHistory: [],
            preferences: {
                language: 'uz',
                autoplay: false,
                quality: 'auto'
            }
        };

        users[email] = user;
        this.saveUsers(users);

        // Auto login after registration
        this.createSession(user);
        
        return { success: true, message: 'Muvaffaqiyatli ro\'yxatdan o\'tdingiz!', user: user };
    }

    // Login user
    login(email, password) {
        const users = this.getUsers();
        const user = users[email];

        if (!user) {
            return { success: false, message: 'Email yoki parol noto\'g\'ri' };
        }

        // Check password (simple comparison for demo - in production use proper hashing)
        if (user.password !== this.hashPassword(password)) {
            return { success: false, message: 'Email yoki parol noto\'g\'ri' };
        }

        // Create session
        this.createSession(user);
        
        return { success: true, message: 'Muvaffaqiyatli kirildi!', user: user };
    }

    // Logout user
    logout() {
        localStorage.removeItem(this.sessionKey);
        this.currentUser = null;
        this.updateUI();
        return { success: true, message: 'Muvaffaqiyatli chiqildi' };
    }

    // Create session
    createSession(user) {
        const session = {
            userId: user.id,
            email: user.email,
            name: user.name,
            plan: user.plan,
            loginTime: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
        };
        
        localStorage.setItem(this.sessionKey, JSON.stringify(session));
        this.currentUser = { ...user, ...session };
        this.updateUI();
    }

    // Check existing session
    checkSession() {
        const sessionData = localStorage.getItem(this.sessionKey);
        
        if (!sessionData) {
            this.currentUser = null;
            return false;
        }

        try {
            const session = JSON.parse(sessionData);
            
            // Check if session expired
            if (new Date(session.expiresAt) < new Date()) {
                this.logout();
                return false;
            }

            // Get user data
            const users = this.getUsers();
            const user = users[session.email];
            
            if (user) {
                this.currentUser = { ...user, ...session };
                this.updateUI();
                return true;
            } else {
                this.logout();
                return false;
            }
        } catch (e) {
            this.logout();
            return false;
        }
    }

    // Update user data
    updateUser(updates) {
        if (!this.currentUser) return { success: false, message: 'Foydalanuvchi tizimga kirmagan' };

        const users = this.getUsers();
        const user = users[this.currentUser.email];

        if (!user) return { success: false, message: 'Foydalanuvchi topilmadi' };

        // Update user data
        Object.assign(user, updates);
        users[this.currentUser.email] = user;
        this.saveUsers(users);

        // Update session
        this.currentUser = { ...this.currentUser, ...user };
        this.createSession(user);

        return { success: true, message: 'Ma\'lumotlar yangilandi', user: user };
    }

    // Upgrade to premium
    upgradeToPremium() {
        return this.updateUser({ plan: 'premium' });
    }

    // Check if user has premium
    isPremium() {
        return this.currentUser && this.currentUser.plan === 'premium';
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Get current user
    getUser() {
        return this.currentUser;
    }

    // Add bookmark
    addBookmark(movieId) {
        if (!this.isLoggedIn()) return false;

        const users = this.getUsers();
        const user = users[this.currentUser.email];

        if (!user.bookmarks.includes(movieId)) {
            user.bookmarks.push(movieId);
            this.updateUser({ bookmarks: user.bookmarks });
            return true;
        }
        return false;
    }

    // Remove bookmark
    removeBookmark(movieId) {
        if (!this.isLoggedIn()) return false;

        const users = this.getUsers();
        const user = users[this.currentUser.email];

        user.bookmarks = user.bookmarks.filter(id => id !== movieId);
        this.updateUser({ bookmarks: user.bookmarks });
        return true;
    }

    // Check if movie is bookmarked
    isBookmarked(movieId) {
        if (!this.isLoggedIn()) return false;
        return this.currentUser.bookmarks && this.currentUser.bookmarks.includes(movieId);
    }

    // Update UI based on auth state
    updateUI() {
        const signinBtn = document.querySelector('.navbar-signin');
        const userMenu = document.querySelector('.user-menu');
        
        if (this.isLoggedIn()) {
            // Update signin button to show user menu
            if (signinBtn) {
                signinBtn.innerHTML = `
                    <span>${this.currentUser.name}</span>
                    <ion-icon name="person-circle"></ion-icon>
                `;
                signinBtn.classList.add('user-logged-in');
            }
        } else {
            // Show login button
            if (signinBtn) {
                signinBtn.innerHTML = `
                    <span>Kirish</span>
                    <ion-icon name="log-in"></ion-icon>
                `;
                signinBtn.classList.remove('user-logged-in');
            }
        }
    }

    // Utility functions
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    hashPassword(password) {
        // Simple hash for demo - in production use proper hashing (bcrypt, etc.)
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash.toString();
    }

    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}

// Initialize user manager
const userManager = new UserManager();
