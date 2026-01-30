// Internationalization (i18n) Manager
'use strict';

class I18n {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || 'uz';
        this.translations = translations;
        this.init();
    }

    init() {
        // Set HTML lang attribute
        document.documentElement.lang = this.currentLanguage;
        
        // Load translations on page load
        this.translatePage();
        
        // Listen for language changes
        this.setupLanguageSwitcher();
    }

    // Get stored language from localStorage
    getStoredLanguage() {
        return localStorage.getItem('dezo_max_language') || 'uz';
    }

    // Save language to localStorage
    saveLanguage(lang) {
        localStorage.setItem('dezo_max_language', lang);
        this.currentLanguage = lang;
        document.documentElement.lang = lang;
    }

    // Get translation by key path (e.g., 'nav.home' or 'auth.login')
    t(key, params = {}) {
        const keys = key.split('.');
        let value = this.translations[this.currentLanguage];

        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                console.warn(`Translation missing for key: ${key}`);
                return key;
            }
        }

        // Replace placeholders like {terms} with params
        if (typeof value === 'string' && params) {
            return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
                return params[paramKey] || match;
            });
        }

        return value;
    }

    // Translate all elements with data-i18n attribute
    translatePage() {
        // Translate elements with data-i18n (skip options, they're handled separately)
        document.querySelectorAll('[data-i18n]:not(option)').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' && element.type !== 'submit' && element.type !== 'button') {
                element.placeholder = translation;
            } else if (element.tagName === 'LABEL') {
                element.textContent = translation;
            } else if (element.tagName === 'BUTTON' || element.tagName === 'A') {
                // For buttons and links, only update text if it's direct child text
                const textNode = Array.from(element.childNodes).find(node => node.nodeType === 3);
                if (textNode) {
                    textNode.textContent = translation;
                } else {
                    // If no direct text node, find span with data-i18n
                    const span = element.querySelector('span[data-i18n="' + key + '"]');
                    if (span) {
                        span.textContent = translation;
                    } else {
                        element.textContent = translation;
                    }
                }
            } else {
                element.textContent = translation;
            }
        });

        // Translate select options with data-i18n attribute
        document.querySelectorAll('select option[data-i18n]').forEach(option => {
            const key = option.getAttribute('data-i18n');
            option.textContent = this.t(key);
        });

        // Translate elements with data-i18n-html (for HTML content with links)
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            const translation = this.t(key);
            element.innerHTML = translation;
        });

        // Update page title
        const titleElement = document.querySelector('title');
        if (titleElement) {
            titleElement.textContent = 'DezoMax';
        }
    }

    // Change language
    changeLanguage(lang) {
        if (!this.translations[lang]) {
            console.error(`Language ${lang} not found`);
            return;
        }

        this.saveLanguage(lang);
        this.translatePage();
        
        // Trigger custom event for other scripts
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: lang } 
        }));
    }

    // Get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Get available languages
    getAvailableLanguages() {
        return Object.keys(this.translations).map(code => ({
            code: code,
            name: this.getLanguageName(code)
        }));
    }

    // Get language display name
    getLanguageName(code) {
        const names = {
            uz: 'O\'zbek',
            ru: 'Русский',
            en: 'English'
        };
        return names[code] || code;
    }

    // Setup language switcher UI
    setupLanguageSwitcher() {
        // This will be called when language modal is opened
        window.addEventListener('languageChanged', () => {
            // Re-translate any dynamically generated content
            if (typeof renderMovies === 'function') {
                // Movies are already rendered, just update UI text
            }
        });
    }
}

// Initialize i18n
const i18n = new I18n();

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.i18n = i18n;
}
