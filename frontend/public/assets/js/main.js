 // ========================================
// AUTENTICAÇÃO
// ========================================

/**
 * Verifica se o usuário está logado
 */
function checkAuth() {
    // TODO: Implementar Autenticação
    
    const token = getAuthToken();
    const isLoggedIn = !!token; // Simplificado - implementar lógica real
    
    updateAuthUI(isLoggedIn);
    return isLoggedIn;
}

/**
 * Obtém o token de autenticação
 */
function getAuthToken() {
    // TODO: Implementar obtenção do token do Spring Security
    // return localStorage.getItem('authToken');
    return null; // Mock - usuário não logado
}

/**
 * Atualiza a UI baseado no estado de autenticação
 */
function updateAuthUI(isLoggedIn) {
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    
    if (!authButtons || !userMenu) return;
    
    if (isLoggedIn) {
        authButtons.style.display = 'none';
        userMenu.style.display = 'flex';
    } else {
        authButtons.style.display = 'flex';
        userMenu.style.display = 'none';
    }
}

/**
 * Faz logout do usuário
 */
async function handleLogout() {
    try {
        // TODO: Chamar endpoint de logout da API
        
        // Limpa os dados locais
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        
        // Atualiza a UI
        updateAuthUI(false);
        
        // Redireciona para a home
        window.location.href = '../../../public/index.html';
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        alert('Erro ao fazer logout. Tente novamente.');
    }
}

// ========================================
// UTILIDADES
// ========================================

/**
 * Mostra estado de carregamento
 */
function showLoading() {
    const eventsList = document.getElementById('eventsList');
    eventsList.innerHTML = `
        <div class="events-loading">
            <div class="loading-spinner"></div>
        </div>
    `;
}

/**
 * Formata número para exibição (ex: 1000 -> 1k)
 */
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

/**
 * Debounce para otimizar performance em eventos frequentes
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Valida formato de email
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Exibe mensagem de erro
 */
function showError(message, element) {
    if (!element) return;
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        color: var(--destructive);
        font-size: 0.875rem;
        margin-top: 0.5rem;
        animation: fadeIn 0.3s ease-out;
    `;
    errorDiv.textContent = message;
    
    // Remove erro anterior se existir
    const existingError = element.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    element.appendChild(errorDiv);
}

/**
 * Remove mensagens de erro
 */
function clearErrors(form) {
    const errors = form.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());
}

/**
 * Exibe toast de notificação
 */
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 0.5rem;
        box-shadow: var(--shadow-medium);
        z-index: 9999;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    if (type === 'success') {
        toast.style.borderLeft = '4px solid var(--primary)';
    } else if (type === 'error') {
        toast.style.borderLeft = '4px solid var(--destructive)';
    }
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ========================================
// ANIMAÇÕES
// ========================================

// Adiciona estilos para animações de toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// INICIALIZAÇÃO GLOBAL
// ========================================

/**
 * Inicializa funcionalidades globais
 */
function initGlobal() {
    
    showLoading()
    // Verifica autenticação em todas as páginas
    checkAuth();
    
    // Adiciona listeners globais
    document.addEventListener('click', (e) => {
        // Fecha dropdowns ao clicar fora
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    });
    
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Executa quando o DOM estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobal);
} else {
    initGlobal();
}

// ========================================
// EXPORTS (para uso em outros scripts)
// ========================================

// Torna funções disponíveis globalmente
window.handleLogout = handleLogout;
window.showToast = showToast;
window.formatNumber = formatNumber;
window.isValidEmail = isValidEmail;
window.showError = showError;
window.clearErrors = clearErrors;
window.getAuthToken = getAuthToken;
window.showLoading = showLoading;