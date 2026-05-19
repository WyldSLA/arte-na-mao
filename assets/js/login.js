document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const togglePassword = document.getElementById('togglePassword');
    const forgotPasswordLink = document.querySelector('.forgot-password-link');

    // ========================================
    // MOCK DATA - USUÁRIOS SIMULADOS
    // ========================================
    
    const mockUsers = [
        {
            email: 'artista@exemplo.com',
            password: '123456',
            user: {
                id: '1',
                name: 'Maria Silva',
                email: 'artista@exemplo.com',
                role: 'ARTISTA',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
            }
        },
        {
            email: 'cliente@exemplo.com',
            password: '123456',
            user: {
                id: '2',
                name: 'João Santos',
                email: 'cliente@exemplo.com',
                role: 'CLIENTE',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
            }
        }
    ];

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
    
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            if (this.value.trim()) {
                clearError(emailInput, emailError);
            }
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            if (this.value.trim()) {
                clearError(passwordInput, passwordError);
            }
        });
    }
    
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (typeof showToast === 'function') {
                showToast(
                    'Recuperação de Senha',
                    'Esta funcionalidade estará disponível em breve. Entre em contato com o suporte.',
                    'info'
                );
            } else {
                alert('Funcionalidade de recuperação de senha estará disponível em breve.');
            }
        });
    }

    // ========================================
    // SUBMIT DO FORMULÁRIO
    // ========================================
    
    if (form) {
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
                
                if (typeof showToast === 'function') {
                    showToast('Login realizado!', 'Bem-vindo de volta!', 'success');
                }
                
                saveUserData(response);

                // Use normalized role (user.tipo or user.role) to decide redirect
                const roleForRedirect = (response.user && (response.user.role || response.user.tipo)) || null;
                setTimeout(() => {
                    redirectToDashboard(roleForRedirect);
                }, 1000);
                
            } catch (error) {
                if (typeof showToast === 'function') {
                    showToast('Erro no login', error.message || 'Credenciais inválidas', 'error');
                } else {
                    alert(error.message || 'Credenciais inválidas');
                }
                
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                passwordInput.value = '';
                passwordInput.focus();
            }
        });
    }

    // ========================================
    // FUNÇÕES AUXILIARES
    // ========================================
    
    function validateForm(email, password) {
        let isValid = true;
        
        if (!email) {
            showError(emailInput, emailError, 'Por favor, preencha o e-mail');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError(emailInput, emailError, 'Por favor, insira um e-mail válido');
            isValid = false;
        }
        
        if (!password) {
            showError(passwordInput, passwordError, 'Por favor, preencha a senha');
            isValid = false;
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showError(input, errorElement, message) {
        if (errorElement) errorElement.textContent = message;
        if (input) {
            input.style.borderColor = 'var(--destructive, #ef4444)';
            input.setAttribute('aria-invalid', 'true');
        }
    }
    
    function clearError(input, errorElement) {
        if (errorElement) errorElement.textContent = '';
        if (input) {
            input.style.borderColor = '';
            input.setAttribute('aria-invalid', 'false');
        }
    }
    
    function clearAllErrors() {
        clearError(emailInput, emailError);
        clearError(passwordInput, passwordError);
    }
    
    // ========================================
    // LOGIN DE USUÁRIO
    // ========================================
    
    async function loginAPI(email, password) {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        try {
            return await window.userService.login(email, password);
        } catch (error) {
            console.error('❌ Erro no login:', error);
            throw error;
        }
    }
    
    function saveUserData(data) {
        window.authData = data;
        localStorage.setItem('authToken', data.token);

        // Normalize stored user to have expected keys (name, role)
        const rawUser = data.user || {};
        const normalizedUser = {
            ...rawUser,
            name: rawUser.nome || rawUser.name || '',
            role: rawUser.tipo || rawUser.role || ''
        };

        localStorage.setItem('userData', JSON.stringify(normalizedUser));
        console.log('✅ Login mock realizado (normalizado):', normalizedUser);
    }
    
    function redirectToDashboard(role) {
        console.log('🔄 Redirecionando para dashboard:', role);
        
        if (role === 'ARTISTA') {
            window.location.href = '/dashboard-artista';
        } else if (role === 'CLIENTE') {
            window.location.href = '/dashboard-cliente';
        } else {
            window.location.href = '/explorar';
        }
    }
    
    // ========================================
    // INFO PARA DESENVOLVEDORES
    // ========================================
    
    console.log('🎭 LOGIN MOCK ATIVO');
    console.log('📧 Usuários disponíveis:');
    console.log('   Artista: artista@exemplo.com / senha: 123456');
    console.log('   Cliente: cliente@exemplo.com / senha: 123456');
});