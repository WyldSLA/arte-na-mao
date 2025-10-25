// ========================================
// HANDLER DE SUBMISSÃO DE LOGIN
// ========================================

async function handleLoginSubmit(event) {

    event.preventDefault(); 

    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitButton = form.querySelector('button[type="submit"]');


    if (typeof clearErrors === 'function') {
        clearErrors(form); 
    }

    let isValid = true;
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || (typeof isValidEmail === 'function' && !isValidEmail(email))) {
        isValid = false;
        if (typeof showError === 'function') {
            showError('Por favor, insira um e-mail válido.', emailInput.parentElement);
        }
    }

    if (!password) {
        isValid = false;
        if (typeof showError === 'function') {
            showError('A senha é obrigatória.', passwordInput.parentElement);
        }
    }

    if (!isValid) {
        if (typeof showToast === 'function') {
            showToast('Erro de validação', 'Verifique os campos destacados.', 'error');
        }
        return;
    }
    
    submitButton.textContent = 'Entrando...';
    submitButton.disabled = true;

    try {
        await new Promise(resolve => setTimeout(resolve, 1500)); 

        if (typeof showToast === 'function') {
             showToast('Sucesso!', 'Login realizado com sucesso. Redirecionando...', 'success');
        }
       
        setTimeout(() => {
            window.location.href = '../src/pages/explorar/index.html'; 
        }, 1000);

    } catch (error) {
        console.error('Erro de Login:', error);
        if (typeof showError === 'function') {
            showError('E-mail ou senha incorretos.', form);
        }
        if (typeof showToast === 'function') {
            showToast('Erro', 'Não foi possível realizar o login. Tente novamente.', 'error');
        }
    } finally {
        submitButton.textContent = 'Entrar';
        submitButton.disabled = false;
    }
}

// ========================================
// INICIALIZAÇÃO
// ========================================

/**
 * Adiciona o listener de evento ao formulário de login
 */
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    const forgotPasswordLink = document.querySelector('.forgot-password-link');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', () => {
             if (typeof showToast === 'function') {
                showToast('Funcionalidade em desenvolvimento', 'A recuperação de senha será implementada em breve.', 'info');
             }
        });
    }
});