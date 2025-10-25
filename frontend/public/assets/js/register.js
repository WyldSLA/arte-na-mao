// ========================================
// HANDLER DE SUBMISSÃO DE CADASTRO
// ========================================

async function handleRegisterSubmit(event) {
    event.preventDefault(); 

    const form = document.getElementById('registerForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const accountTypeRadios = document.querySelectorAll('input[name="accountType"]');
    const submitButton = form.querySelector('button[type="submit"]');

    if (typeof clearErrors === 'function') {
        clearErrors(form); 
    }

    let isValid = true;
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    let accountType = null;
    
    accountTypeRadios.forEach(radio => {
        if (radio.checked) {
            accountType = radio.value;
        }
    });

    const handleError = (message, element) => {
        if (typeof showError === 'function') {
            showError(message, element.parentElement);
        }
    };

    if (name.length < 3) {
        isValid = false;
        handleError('O nome deve ter pelo menos 3 caracteres.', nameInput);
    }

    if (!email || (typeof isValidEmail === 'function' && !isValidEmail(email))) {
        isValid = false;
        handleError('Por favor, insira um e-mail válido.', emailInput);
    }

    if (password.length < 8) {
        isValid = false;
        handleError('A senha deve ter no mínimo 8 caracteres.', passwordInput);
    } else if (password !== confirmPassword) {
        isValid = false;
        handleError('As senhas não coincidem.', confirmPasswordInput);
    }
    
    if (!accountType) {
        isValid = false;
        handleError('Selecione um tipo de conta.', accountTypeRadios[0].closest('.form-group').querySelector('.radio-group'));
    }

    if (!isValid) {
        if (typeof showToast === 'function') {
            showToast('Erro de validação', 'Verifique os campos obrigatórios e tente novamente.', 'error');
        }
        return;
    }
    
    submitButton.textContent = 'Cadastrando...';
    submitButton.disabled = true;

    try {
        
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        if (typeof showToast === 'function') {
             showToast(
                 'Bem-vindo(a) à Arte na Mão!', 
                 'Seu cadastro foi concluído com sucesso. Redirecionando...', 
                 'success'
             );
        }
       
        setTimeout(() => {
            window.location.href = '../src/pages/explorar/index.html'; 
        }, 1000);

    } catch (error) {
        console.error('Erro de Cadastro:', error);
        if (typeof showToast === 'function') {
            showToast('Erro', 'Não foi possível criar sua conta. Tente novamente.', 'error');
        }
    } finally {
        submitButton.textContent = 'Criar conta';
        submitButton.disabled = false;
    }
}

// ========================================
// INICIALIZAÇÃO
// ========================================

/**
 * Adiciona o listener de evento ao formulário de cadastro
 */
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }
});