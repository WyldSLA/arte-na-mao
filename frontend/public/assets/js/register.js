document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    if (!form || !passwordInput || !confirmPasswordInput) {
        console.warn('Elementos do formulário de registro não encontrados');
        return;
    }
    
    // ========================================
    // TOGGLE MOSTRAR/OCULTAR SENHA
    // ========================================
    
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const wrapper = this.closest('.password-wrapper') || this.parentElement;
            const input = wrapper.querySelector('input[type="password"], input[type="text"]');
            
            if (!input) return;
            
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            
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
            
            this.classList.toggle('showing');
            this.setAttribute('aria-label', isPassword ? 'Ocultar senha' : 'Mostrar senha');
        });
    });
    
    // ========================================
    // VALIDAÇÃO DE REQUISITOS DE SENHA
    // ========================================
    
    const requirements = {
        length: document.getElementById('req-length'),
        uppercase: document.getElementById('req-uppercase'),
        lowercase: document.getElementById('req-lowercase'),
        number: document.getElementById('req-number'),
        symbol: document.getElementById('req-symbol')
    };

    const allRequirementsExist = Object.values(requirements).every(el => el !== null);
    
    let checkPassword;
    
    if (allRequirementsExist) {
        checkPassword = function(password) {
            const checks = {
                length: password.length >= 8,
                uppercase: /[A-Z]/.test(password),
                lowercase: /[a-z]/.test(password),
                number: /[0-9]/.test(password),
                symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password)
            };

            Object.keys(checks).forEach(requirement => {
                const reqElement = requirements[requirement];
                if (!reqElement) return;
                
                if (checks[requirement]) {
                    if (!reqElement.classList.contains('met')) {
                        reqElement.innerHTML = reqElement.innerHTML.replace('✗', '✓');
                        reqElement.classList.add('met');
                    }
                } else {
                    if (reqElement.classList.contains('met')) {
                        reqElement.innerHTML = reqElement.innerHTML.replace('✓', '✗');
                        reqElement.classList.remove('met');
                    }
                }
            });

            return Object.values(checks).every(check => check === true);
        };

        passwordInput.addEventListener('input', function() {
            const isValid = checkPassword(this.value);
            this.setCustomValidity(isValid ? '' : 'A senha deve atender a todos os requisitos');
        });
    }
    
    // ========================================
    // VALIDAÇÃO DE CONFIRMAÇÃO DE SENHA
    // ========================================
    
    confirmPasswordInput.addEventListener('input', function() {
        const confirmError = document.getElementById('confirmPassword-error');
        if (this.value && this.value === passwordInput.value) {
            if (confirmError) confirmError.textContent = '';
            this.style.borderColor = '';
        }
    });
    
    // ========================================
    // SUBMIT DO FORMULÁRIO
    // ========================================
    
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            password: passwordInput.value,
            confirmPassword: confirmPasswordInput.value,
            accountType: document.querySelector('input[name="accountType"]:checked')?.value || 'cliente'
        };
        
        clearAllErrors();
        
        if (!validateForm(formData)) {
            return;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Criando conta...';
        
        try {
            const response = await registerAPI(formData);
            
           showToast('Conta criada!', 'Bem-vindo à Arte Nordeste!', 'success');
            
            saveUserData(response);
            
            setTimeout(() => {
                redirectToDashboard(response.user.role);
            }, 1500);
            
        } catch (error) {
            showToast('Erro no cadastro', error.message || 'Não foi possível criar a conta', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
    
    // ========================================
    // FUNÇÕES AUXILIARES
    // ========================================
    
    function validateForm(data) {
        let isValid = true;
        
        if (!data.name) {
            showError('name', 'Nome completo é obrigatório');
            isValid = false;
        }
        
        if (!data.email) {
            showError('email', 'E-mail é obrigatório');
            isValid = false;
        } else if (!window.isValidEmail(data.email)) {
            showError('email', 'E-mail inválido');
            isValid = false;
        }
        
        if (allRequirementsExist && !checkPassword(data.password)) {
            showError('password', 'A senha deve atender a todos os requisitos');
            isValid = false;
        }
        
        if (data.password !== data.confirmPassword) {
            showError('confirmPassword', 'As senhas não coincidem');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(fieldId, message) {
        const input = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (errorElement) errorElement.textContent = message;
        if (input) {
            input.style.borderColor = 'var(--destructive)';
            input.setAttribute('aria-invalid', 'true');
        }
    }
    
    function clearAllErrors() {
        ['name', 'email', 'password', 'confirmPassword'].forEach(fieldId => {
            const input = document.getElementById(fieldId);
            const errorElement = document.getElementById(`${fieldId}-error`);
            
            if (errorElement) errorElement.textContent = '';
            if (input) {
                input.style.borderColor = '';
                input.setAttribute('aria-invalid', 'false');
            }
        });
    }
    
    // ========================================
    // API - INTEGRAÇÃO COM BACKEND
    // ========================================
    
    async function registerAPI(data) {
        const API_URL = '/api/auth/register';
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                password: data.password,
                accountType: data.accountType
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao criar conta');
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
    
    // ========================================
    // TROCA DE TEXTO NA ILUSTRAÇÃO
    // ========================================
    
    const artistaRadio = document.getElementById('artista');
    const clienteRadio = document.getElementById('cliente');
    const illustration = document.querySelector('.auth-illustration-register');
    const title = document.querySelector('.auth-illustration-title');
    const text = document.querySelector('.auth-illustration-text');

    if (artistaRadio && clienteRadio && illustration && title && text) {
        function fadeTextChange(element, newText) {
            if (element.dataset.animating === 'true') return;
            
            element.dataset.animating = 'true';
            element.classList.add('fade-out');
            
            setTimeout(() => {
                element.textContent = newText;
                element.classList.remove('fade-out');
                delete element.dataset.animating;
            }, 500);
        }

        function setToArtista() {
            fadeTextChange(title, 'Mostre seu talento');
            fadeTextChange(text, 'Crie seu portfólio, compartilhe suas obras e venda diretamente na plataforma');
            illustration.classList.add('artista-selected');
        }

        function setToCliente() {
            fadeTextChange(title, 'Explore as artes');
            fadeTextChange(text, 'Conecte-se com uma comunidade vibrante de arte e cultura');
            illustration.classList.remove('artista-selected');
        }

        // Inicializa sem animação
        if (artistaRadio.checked) {
            title.textContent = 'Mostre seu talento';
            text.textContent = 'Crie seu portfólio, compartilhe suas obras e venda diretamente na plataforma';
            illustration.classList.add('artista-selected');
        }

        artistaRadio.addEventListener('change', () => {
            if (artistaRadio.checked) setToArtista();
        });

        clienteRadio.addEventListener('change', () => {
            if (clienteRadio.checked) setToCliente();
        });
    }
});