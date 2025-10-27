document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const togglePassword = document.getElementById('togglePassword');

    // Validação em tempo real - limpa erros ao digitar
    emailInput.addEventListener('input', function() {
        if (this.value.trim()) {
            emailError.textContent = '';
            this.style.borderColor = '';
        }
    });

    passwordInput.addEventListener('input', function() {
        if (this.value.trim()) {
            passwordError.textContent = '';
            this.style.borderColor = '';
        }
    });
    
    // Toggle mostrar/ocultar senha
    if (togglePassword) {
        togglePassword.addEventListener('click', function () {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            this.classList.toggle('showing');
            this.setAttribute('aria-label', isPassword ? 'Ocultar senha' : 'Mostrar senha');
        });
    }

    // Validação no submit
    form.addEventListener('submit', function (e) {
        let valid = true;
        
        // Limpa mensagens anteriores
        emailError.textContent = '';
        passwordError.textContent = '';
        emailInput.style.borderColor = '';
        passwordInput.style.borderColor = '';

        // Valida email
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Por favor, preencha o e-mail.';
            emailInput.style.borderColor = 'var(--destructive)';
            valid = false;
        } else if (!isValidEmail(emailInput.value)) {
            emailError.textContent = 'Por favor, insira um e-mail válido.';
            emailInput.style.borderColor = 'var(--destructive)';
            valid = false;
        }
        
        // Valida senha (apenas se está vazio - SEM validação forte no login!)
        if (!passwordInput.value.trim()) {
            passwordError.textContent = 'Por favor, preencha a senha.';
            passwordInput.style.borderColor = 'var(--destructive)';
            valid = false;
        }
        
        if (!valid) {
            e.preventDefault();
        } else {
            window.location.href = '../src/pages/explorar/index.html'
        }
    });

    // Função auxiliar para validar email
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});