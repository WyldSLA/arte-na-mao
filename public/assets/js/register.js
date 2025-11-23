document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const cpfInput = document.getElementById('cpf');
    const dobInput = document.getElementById('data_de_nascimento');
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    const passwordStrengthContainer = document.getElementById('password-strength');
    
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
    // PASSWORD STRENGTH (min 6 required)
    // ========================================

    function calculatePasswordScore(pw) {
        if (!pw) return 0;
        let score = 0;
        if (pw.length >= 6) score += 1; // minimum
        if (pw.length >= 8) score += 1;
        if (/[A-Z]/.test(pw)) score += 1;
        if (/[0-9]/.test(pw)) score += 1;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(pw)) score += 1;
        return score;
    }

    function updatePasswordStrengthUI(pw) {
        const score = calculatePasswordScore(pw);
        // determine label
        let label = 'fraca';
        let pct = 0;
        // muito forte for long passwords
        if (pw && pw.length >= 15) {
            label = 'muito forte'; pct = 100;
        } else if (score <= 1) { label = 'fraca'; pct = 20; }
        else if (score === 2 || score === 3) { label = 'média'; pct = 60; }
        else if (score === 4) { label = 'forte'; pct = 80; }
        else { label = 'forte'; pct = 100; }

        if (strengthBar) {
            strengthBar.style.width = pct + '%';
            let color = '#ef4444'; // red
            if (label === 'média') color = '#f59e0b';
            else if (label === 'forte') color = '#10b981';
            else if (label === 'muito forte') color = '#064e3b';
            strengthBar.style.background = color;
        }
        if (strengthText) {
            strengthText.innerHTML = `Força da senha: <strong>${label}</strong>`;
            // color the label text for accessibility
            const strongEl = strengthText.querySelector('strong');
            if (strongEl) strongEl.style.color = (label === 'fraca' ? '#ef4444' : (label === 'média' ? '#f59e0b' : (label === 'muito forte' ? '#064e3b' : '#10b981')));
        }

        // set validity: only minimum 6 chars required
        if (passwordInput) {
            passwordInput.setCustomValidity(pw.length >= 6 ? '' : 'A senha deve ter no mínimo 6 caracteres');
        }
    }

    // initialize UI: hide strength until user starts typing
    if (passwordStrengthContainer) passwordStrengthContainer.style.display = 'none';
    updatePasswordStrengthUI('');

    passwordInput.addEventListener('input', function() {
        const val = this.value || '';
        if (val.length > 0) {
            if (passwordStrengthContainer) passwordStrengthContainer.style.display = '';
        } else {
            if (passwordStrengthContainer) passwordStrengthContainer.style.display = 'none';
        }
        updatePasswordStrengthUI(val);
    });

    // ========================================
    // CPF MASK & VALIDATION, DOB -> AGE
    // ========================================

    function onlyDigits(str) {
        return (str || '').replace(/\D+/g, '');
    }

    function formatCPF(value) {
        const v = onlyDigits(value).slice(0, 11);
        let out = v;
        if (v.length > 9) out = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        else if (v.length > 6) out = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
        else if (v.length > 3) out = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
        return out;
    }

    function validateCPF(cpf) {
        const s = onlyDigits(cpf);
        if (!s || s.length !== 11) return false;
        // invalid known patterns
        if (/^(\d)\1{10}$/.test(s)) return false;

        const calc = (t) => {
            let sum = 0;
            for (let i = 0; i < t; i++) {
                sum += parseInt(s.charAt(i)) * (t + 1 - i);
            }
            const d = 11 - (sum % 11);
            return d > 9 ? 0 : d;
        };

        return calc(9) === parseInt(s.charAt(9)) && calc(10) === parseInt(s.charAt(10));
    }

    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            const formatted = formatCPF(this.value);
            this.value = formatted;
            const err = document.getElementById('cpf-error');
            if (formatted && !validateCPF(formatted)) {
                if (err) err.textContent = 'CPF inválido';
                this.style.borderColor = 'var(--destructive, #ef4444)';
            } else {
                if (err) err.textContent = '';
                this.style.borderColor = '';
            }
        });
    }

    // derive age from DOB helper (does not update any input - age will be sent to service)
    function computeAgeFromDOB(dobValue) {
        if (!dobValue) return null;
        const birth = new Date(dobValue);
        if (isNaN(birth.getTime())) return null;
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
        return age >= 0 ? age : null;
    }

    // Clear field error when user starts typing/selecting after a failed submit
    const interactiveFields = form.querySelectorAll('input, select, textarea');
    interactiveFields.forEach(field => {
        field.addEventListener('input', function() {
            const id = this.id;
            if (!id) return;
            const err = document.getElementById(`${id}-error`);
            if (err) err.textContent = '';
            this.style.borderColor = '';
            this.setAttribute('aria-invalid', 'false');
        });
        // also clear on focus for selects / other controls
        field.addEventListener('focus', function() {
            const id = this.id;
            if (!id) return;
            const err = document.getElementById(`${id}-error`);
            if (err) err.textContent = '';
            this.style.borderColor = '';
            this.setAttribute('aria-invalid', 'false');
        });
    });
    
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
            accountType: document.querySelector('input[name="accountType"]:checked')?.value || 'cliente',
            cpf: document.getElementById('cpf') ? document.getElementById('cpf').value.trim() : '',
            genero: document.getElementById('genero') ? document.getElementById('genero').value : '',
            telefone: document.getElementById('telefone') ? document.getElementById('telefone').value.trim() : '',
            data_de_nascimento: document.getElementById('data_de_nascimento') ? document.getElementById('data_de_nascimento').value : ''
        };

        // derive age from dob for storage
        formData.idade = computeAgeFromDOB(formData.data_de_nascimento);
        
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
            
            if (typeof showToast === 'function') {
                showToast('Conta criada!', 'Bem-vindo à Arte na Mão!', 'success');
            } else {
                alert('Conta criada com sucesso!');
            }
            
            saveUserData(response);

            // usa campo 'tipo' retornado pelo serviço (ARTISTA | CLIENTE)
            setTimeout(() => {
                redirectToDashboard(response.user.tipo);
            }, 800);
            
        } catch (error) {
            if (typeof showToast === 'function') {
                showToast('Erro no cadastro', error.message || 'Não foi possível criar a conta', 'error');
            } else {
                alert(error.message || 'Erro ao criar conta');
            }
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
        } else if (!isValidEmail(data.email)) {
            showError('email', 'E-mail inválido');
            isValid = false;
        }

        if (!data.cpf) {
            showError('cpf', 'CPF é obrigatório');
            isValid = false;
        } else if (!validateCPF(data.cpf)) {
            showError('cpf', 'CPF inválido');
            isValid = false;
        }

        // Data de nascimento ou idade: pelo menos uma deve estar preenchida
        if (!data.data_de_nascimento) {
            showError('data_de_nascimento', 'Data de nascimento é obrigatória');
            isValid = false;
        }
        
        if (!data.password || data.password.length < 6) {
            showError('password', 'A senha deve ter no mínimo 6 caracteres');
            isValid = false;
        }
        
        if (data.password !== data.confirmPassword) {
            showError('confirmPassword', 'As senhas não coincidem');
            isValid = false;
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showError(fieldId, message) {
        const input = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (errorElement) errorElement.textContent = message;
        if (input) {
            input.style.borderColor = 'var(--destructive, #ef4444)';
            input.setAttribute('aria-invalid', 'true');
        }
    }
    
    function clearAllErrors() {
        ['name', 'email', 'password', 'confirmPassword', 'cpf', 'genero', 'telefone', 'data_de_nascimento'].forEach(fieldId => {
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
    // REGISTRO DE USUÁRIO
    // ========================================
    
    async function registerAPI(data) {
        // Simula delay de rede
        await new Promise(resolve => setTimeout(resolve, 800));
        
        try {
            // Usa o serviço de usuário para criar conta
            const response = await window.userService.createUser({
                name: data.name,
                email: data.email,
                password: data.password,
                accountType: data.accountType,
                cpf: data.cpf,
                genero: data.genero,
                telefone: data.telefone,
                dataDeNascimento: data.data_de_nascimento,
                idade: data.idade
            });
            
            console.log('✅ Novo usuário registrado:', response.user);
            
            return response;
            
        } catch (error) {
            console.error('❌ Erro ao registrar usuário:', error);
            throw error;
        }
    }
    
    function saveUserData(data) {
        window.authData = data;
        localStorage.setItem('authToken', data.token);

        // Normalize user object so other scripts can rely on consistent keys (name, role)
        const rawUser = data.user || {};
        const normalizedUser = {
            ...rawUser,
            // keep existing portuguese keys but provide english aliases expected elsewhere
            name: rawUser.nome || rawUser.name || '',
            role: rawUser.tipo || rawUser.role || ''
        };

        localStorage.setItem('userData', JSON.stringify(normalizedUser));
        console.log('✅ Dados salvos (normalizados):', normalizedUser);
    }
    
    function redirectToDashboard(role) {
        console.log('🔄 Redirecionando para dashboard:', role);
        
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