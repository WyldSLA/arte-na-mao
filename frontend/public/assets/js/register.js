document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const form = document.getElementById('registerForm');
    
    // Verifica se os elementos existem antes de continuar
    if (!passwordInput || !confirmPasswordInput || !form) {
        console.warn('Elementos do formulário de registro não encontrados');
        return;
    }
    
    // ========================================
    // TOGGLE DE SENHA
    // ========================================
    
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            if (!input) return;
            
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
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

    // Verifica se todos os elementos de requisitos existem
    const allRequirementsExist = Object.values(requirements).every(el => el !== null);
    
    if (allRequirementsExist) {
        // Função para verificar cada requisito
        function checkPassword(password) {
            const checks = {
                length: password.length >= 8,
                uppercase: /[A-Z]/.test(password),
                lowercase: /[a-z]/.test(password),
                number: /[0-9]/.test(password),
                symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password)
            };

            // Atualiza a visualização dos requisitos
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

            // Retorna true se todos os requisitos foram atendidos
            return Object.values(checks).every(check => check === true);
        }

        // Listener para verificar a senha em tempo real
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
    // VALIDAÇÃO NO SUBMIT
    // ========================================
    
    form.addEventListener('submit', function(event) {
        let valid = true;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        // Limpa erros anteriores
        const passwordError = document.getElementById('password-error');
        const confirmError = document.getElementById('confirmPassword-error');
        
        if (passwordError) passwordError.textContent = '';
        if (confirmError) confirmError.textContent = '';
        
        passwordInput.style.borderColor = '';
        confirmPasswordInput.style.borderColor = '';
        
        // Valida requisitos da senha (se elementos existirem)
        if (allRequirementsExist && !checkPassword(password)) {
            event.preventDefault();
            if (passwordError) {
                passwordError.textContent = 'A senha deve atender a todos os requisitos';
            }
            passwordInput.style.borderColor = 'var(--destructive)';
            valid = false;
        }
        
        // Valida se as senhas coincidem
        if (password !== confirmPassword) {
            event.preventDefault();
            if (confirmError) {
                confirmError.textContent = 'As senhas não coincidem';
            }
            confirmPasswordInput.style.borderColor = 'var(--destructive)';
            valid = false;
        }
        
        if (!valid) {
            // Foca no primeiro campo com erro
            if (!allRequirementsExist || !checkPassword(password)) {
                passwordInput.focus();
            } else {
                confirmPasswordInput.focus();
            }
        } else {
            window.location.href = '../src/pages/explorar/index.html'
        }
    });
    
    // ========================================
    // TROCA DE TEXTO NA ILUSTRAÇÃO (ARTISTA/CLIENTE)
    // ========================================
    
    const artistaRadio = document.getElementById('artista');
    const clienteRadio = document.getElementById('cliente');
    const illustration = document.querySelector('.auth-illustration-register');
    const title = document.querySelector('.auth-illustration-title');
    const text = document.querySelector('.auth-illustration-text');

    // Verifica se elementos existem
    if (!artistaRadio || !clienteRadio || !illustration || !title || !text) {
        console.warn('Elementos de ilustração não encontrados');
        return;
    }

    // Função para trocar texto com efeito fade (melhorada)
    function fadeTextChange(element, newText) {
        // Previne múltiplas animações simultâneas
        if (element.dataset.animating === 'true') return;
        
        element.dataset.animating = 'true';
        element.classList.add('fade-out');
        
        setTimeout(() => {
            element.textContent = newText;
            element.classList.remove('fade-out');
            delete element.dataset.animating;
        }, 300);
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

    // Inicializa conforme opção selecionada
    if (artistaRadio.checked) {
        // Não anima na primeira vez
        title.textContent = 'Mostre seu talento';
        text.textContent = 'Crie seu portfólio, compartilhe suas obras e venda diretamente na plataforma';
        illustration.classList.add('artista-selected');
    } else {
        title.textContent = 'Explore as artes';
        text.textContent = 'Conecte-se com uma comunidade vibrante de arte e cultura';
    }

    // Listeners para mudanças
    artistaRadio.addEventListener('change', () => {
        if (artistaRadio.checked) setToArtista();
    });

    clienteRadio.addEventListener('change', () => {
        if (clienteRadio.checked) setToCliente();
    });
});