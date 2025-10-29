document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const togglePassword = document.getElementById('togglePassword');
    const forgotPasswordLink = document.querySelector('.forgot-password-link');

    // ========================================
    // TOGGLE MOSTRAR/OCULTAR SENHA
    // ========================================
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            
            const eyeIcon = this.querySelector('svg');
            if (eyeIcon) {
                if (isPassword) {
                    eyeIcon.innerHTML = `
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/>
                        <circle cx="12" cy="12" r="3"/>
                        <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" stroke-width="2"/>
                    `;
                } else {
                    eyeIcon.innerHTML = `
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/>
                        <circle cx="12" cy="12" r="3"/>
                    `;
                }
            }
            
            this.setAttribute('aria-label', isPassword ? 'Ocultar senha' : 'Mostrar senha');
            this.classList.toggle('showing');
        });
    }

    // ========================================
    // VALIDAÇÃO EM TEMPO REAL
    // ========================================
    
    emailInput.addEventListener('input', function() {
        if (this.value.trim()) {
            clearError(emailInput, emailError);
        }
    });

    passwordInput.addEventListener('input', function() {
        if (this.value.trim()) {
            clearError(passwordInput, passwordError);
        }
    });
    
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Usa o showToast global do main.js
            showToast(
                'Recuperação de Senha',
                'Esta funcionalidade estará disponível em breve. Entre em contato com o suporte.',
                'info'
            );
        });
    }

    // ========================================
    // SUBMIT DO FORMULÁRIO
    // ========================================
    
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        
        clearAllErrors();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        if (!validateForm(email, password)) {
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Entrando...';
        
        try {
            const response = await loginAPI(email, password);
            
            showToast('Login realizado!', 'Bem-vindo de volta!', 'success');
            showError
            
            saveUserData(response);
            
            setTimeout(() => {
                redirectToDashboard(response.user.role);
            }, 1000);
            
        } catch (error) {
            // Usa toast global
            window.showToast('Erro no login', error.message || 'Credenciais inválidas', 'error');
            
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            passwordInput.value = '';
            passwordInput.focus();
        }
    });

    // ========================================
    // FUNÇÕES AUXILIARES
    // ========================================
    
    function validateForm(email, password) {
        let isValid = true;
        
        if (!email) {
            showError(emailInput, emailError, 'Por favor, preencha o e-mail');
            isValid = false;
        } else if (!window.isValidEmail(email)) {
            showError(emailInput, emailError, 'Por favor, insira um e-mail válido');
            isValid = false;
        }
        
        if (!password) {
            showError(passwordInput, passwordError, 'Por favor, preencha a senha');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(input, errorElement, message) {
        if (errorElement) errorElement.textContent = message;
        input.style.borderColor = 'var(--destructive)';
        input.setAttribute('aria-invalid', 'true');
    }
    
    function clearError(input, errorElement) {
        if (errorElement) errorElement.textContent = '';
        input.style.borderColor = '';
        input.setAttribute('aria-invalid', 'false');
    }
    
    function clearAllErrors() {
        clearError(emailInput, emailError);
        clearError(passwordInput, passwordError);
    }
    
    // ========================================
    // API - INTEGRAÇÃO COM BACKEND
    // ========================================
    
    async function loginAPI(email, password) {
        const API_URL = '/api/auth/login';
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Credenciais inválidas');
        }
        
        return await response.json();
    }
    
    function saveUserData(data) {
        window.authData = data;
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
    }
    
    function redirectToDashboard(role) {
        if (role === 'ARTISTA') {
            window.location.href = '../src/pages/dashboard-artista/index.html';
        } else {
            window.location.href = '../src/pages/explorar/index.html';
        }
    }
});