// ========================================
// AUTENTICAÇÃO
// ========================================

/**
 * Verifica se o usuário está logado e atualiza dados
 */
async function checkAuth() {
    const token = getAuthToken();
    const userData = getUserData();
    const isLoggedIn = !!(token && userData);
    
    if (isLoggedIn) {
        try {
            // Recarrega dados do usuário
            const updatedUser = await window.userService.getUser(userData.id);
            // Normalize and save user so other scripts can rely on `name` and `role`
            normalizeAndSaveUser(updatedUser);
        } catch (error) {
            console.error('Erro ao atualizar dados do usuário:', error);
            handleLogout();
            return false;
        }
    }
    
    updateAuthUI(isLoggedIn);
    return isLoggedIn;
}

/**
 * Redireciona para o perfil do usuário baseado no tipo
 */
function redirectToProfile() {
    const token = getAuthToken();
    const userData = getUserData();

    if (!token || !userData || !userData.role) {
        if (typeof showToast === 'function') {
            showToast('Login necessário', 'Você precisa estar logado para acessar seu perfil', 'info');
        }
        setTimeout(() => { window.location.href = '/login'; }, 1000);
        return;
    }

    if (userData.role === 'ARTISTA') {
        window.location.href = '/dashboard-artista';
    } else if (userData.role === 'CLIENTE') {
        window.location.href = '/dashboard-cliente';
    } else {
        console.error('⚠️ Role desconhecido:', userData.role);
    }
}

/**
 * Obtém o token de autenticação
 */
function getAuthToken() {
    return localStorage.getItem('authToken');
}

/**
 * Obtém os dados do usuário
 */
function getUserData() {
    try {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error('Erro ao obter dados do usuário:', error);
        return null;
    }
}

/**
 * Normaliza o objeto de usuário e salva em localStorage com chaves previsíveis
 * (mantém campos originais, mas adiciona `name` e `role`).
 */
function normalizeAndSaveUser(rawUser) {
    if (!rawUser) return null;
    const normalized = {
        ...rawUser,
        name: rawUser.nome || rawUser.name || '',
        role: rawUser.tipo || rawUser.role || ''
    };
    localStorage.setItem('userData', JSON.stringify(normalized));
    return normalized;
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
        
        // Atualiza nome do usuário se disponível
        const userData = getUserData();
        if (userData && userData.name) {
            const userNameElement = userMenu.querySelector('.user-name');
            if (userNameElement) {
                userNameElement.textContent = userData.name;
            }
        }
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
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('authData');

        if (typeof showToast === 'function') {
            showToast('Logout realizado', 'Até logo!', 'success');
        }

        updateAuthUI(false);

        setTimeout(() => { window.location.href = '/'; }, 1000);
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
    return `
        <div style="text-align: center; padding: 3rem; color: var(--muted-foreground);">
            <div style="
                width: 40px;
                height: 40px;
                border: 3px solid var(--border);
                border-top-color: var(--primary);
                border-radius: 50%;
                margin: 0 auto 1rem;
                animation: spin 0.8s linear infinite;
            "></div>
            <p>Carregando...</p>
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
function showToast(title, message, type = 'info') {
    // Remove toasts antigos
    const oldToasts = document.querySelectorAll('.toast');
    oldToasts.forEach(t => t.remove());
    
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
        display: flex;
        gap: 1rem;
    `;

    const iconMap = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠'
    };

    const icon = iconMap[type] || 'ℹ';

    toast.innerHTML = `
        <div style="font-size: 1.5rem;">${icon}</div>
        <div>
            <p style="font-weight: 600; margin: 0; color: var(--foreground);">${title}</p>
            <p style="font-size: 0.9rem; margin: 0; color: var(--muted-foreground);">${message}</p>
        </div>
    `;
        
    if (type === 'success') {
        toast.style.borderLeft = '4px solid var(--primary)';
    } else if (type === 'error') {
        toast.style.borderLeft = '4px solid #ef4444';
    } else if (type === 'warning') {
        toast.style.borderLeft = '4px solid #f59e0b';
    } else {
        toast.style.borderLeft = '4px solid var(--secondary)';
    }
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ========================================
// ANIMAÇÕES
// ========================================

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
    
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ========================================
// INICIALIZAÇÃO GLOBAL
// ========================================

function initGlobal() {
    // Verifica autenticação
    checkAuth();
    
    // Adiciona listener ao botão de perfil (se existir)
    const profileButtons = document.querySelectorAll('[data-action="profile"], .btn-profile');
    profileButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            redirectToProfile();
        });
    });
    
    // Fecha dropdowns ao clicar fora
    document.addEventListener('click', (e) => {
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

window.handleLogout = handleLogout;
window.redirectToProfile = redirectToProfile;
window.showToast = showToast;
window.formatNumber = formatNumber;
window.isValidEmail = isValidEmail;
window.showError = showError;
window.clearErrors = clearErrors;
window.getAuthToken = getAuthToken;
window.getUserData = getUserData;
window.showLoading = showLoading;
window.checkAuth = checkAuth;

// Log de inicialização
console.log('✅ Main.js carregado');
console.log('🔐 Auth status:', !!getAuthToken());
if (getAuthToken()) {
    const user = getUserData();
    console.log('👤 Usuário:', user?.name, '| Role:', user?.role);
}