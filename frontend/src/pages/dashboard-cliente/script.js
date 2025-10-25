// ========================================
// DASHBOARD-CLIENT.JS - Lógica do Dashboard do Cliente
// ========================================

// ========================================
// ESTADO DA APLICAÇÃO (Em memória)
// ========================================

let clientData = {
    favoritos: [], // Array de IDs de obras favoritas
    carrinho: [],  // Array de objetos { obraId, quantity }
    eventosConfirmados: [], // Array de IDs de eventos
    compras: [], // Array de objetos de compras
    obras: [], // Array de todas as obras disponíveis
    eventos: [] // Array de todos os eventos disponíveis
};

// ========================================
// MOCK DATA - Substituir por API
// ========================================

const mockObras = [
    {
        id: "1",
        title: "Sertão em Cores",
        artist: "Maria Silva",
        imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=1200&fit=crop",
        price: 1500.00
    },
    {
        id: "2",
        title: "Horizonte Atlântico",
        artist: "João Santos",
        imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=1200&fit=crop",
        price: 2200.00
    },
    {
        id: "3",
        title: "Raízes Nordestinas",
        artist: "Ana Oliveira",
        imageUrl: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&h=1200&fit=crop",
        price: 1800.00
    }
];

const mockEventos = [
    {
        id: "1",
        title: "Festival de Arte Popular do Sertão",
        imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
        date: "15 de Dezembro, 2025",
        time: "18:00",
        location: "Recife, PE",
        attendees: 234
    },
    {
        id: "2",
        title: "Mostra de Fotografia Contemporânea",
        imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop",
        date: "22 de Dezembro, 2025",
        time: "19:00",
        location: "Salvador, BA",
        attendees: 156
    }
];

// ========================================
// FUNÇÕES DE API
// ========================================

/**
 * Carrega dados do cliente
 * Integração Spring Boot: GET /api/client/data
 */
async function loadClientData() {
    try {
        // TODO: Substituir por chamada real
        // const response = await fetch('/api/client/data', {
        //     headers: { 'Authorization': `Bearer ${getAuthToken()}` }
        // });
        // const data = await response.json();
        
        // Mock
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            favoritos: ["1", "2"], // IDs de obras favoritas
            carrinho: [{ obraId: "3", quantity: 1 }],
            eventosConfirmados: ["1"],
            compras: [],
            obras: mockObras,
            eventos: mockEventos
        };
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        throw error;
    }
}

/**
 * Remove obra dos favoritos
 * Spring Boot: DELETE /api/client/favoritos/{id}
 */
async function removeFavorito(obraId) {
    try {
        // TODO: API call
        await new Promise(resolve => setTimeout(resolve, 300));
        return { success: true };
    } catch (error) {
        console.error('Erro ao remover favorito:', error);
        throw error;
    }
}

/**
 * Remove obra do carrinho
 * Spring Boot: DELETE /api/client/carrinho/{id}
 */
async function removeCarrinho(obraId) {
    try {
        // TODO: API call
        await new Promise(resolve => setTimeout(resolve, 300));
        return { success: true };
    } catch (error) {
        console.error('Erro ao remover do carrinho:', error);
        throw error;
    }
}

/**
 * Cancela presença em evento
 * Spring Boot: DELETE /api/client/eventos/{id}
 */
async function cancelarEvento(eventoId) {
    try {
        // TODO: API call
        await new Promise(resolve => setTimeout(resolve, 300));
        return { success: true };
    } catch (error) {
        console.error('Erro ao cancelar evento:', error);
        throw error;
    }
}

// ========================================
// SISTEMA DE TABS
// ========================================

/**
 * Inicializa o sistema de tabs
 */
function initTabs() {
    const triggers = document.querySelectorAll('.tab-trigger');
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const tabName = trigger.dataset.tab;
            switchTab(tabName);
        });
    });
}

/**
 * Troca de tab
 */
function switchTab(tabName) {
    // Remove active de todos os triggers
    document.querySelectorAll('.tab-trigger').forEach(trigger => {
        trigger.classList.remove('active');
        trigger.setAttribute('aria-selected', 'false');
    });
    
    // Remove active de todos os conteúdos
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Ativa o trigger clicado
    const activeTrigger = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeTrigger) {
        activeTrigger.classList.add('active');
        activeTrigger.setAttribute('aria-selected', 'true');
    }
    
    // Ativa o conteúdo correspondente
    const activeContent = document.getElementById(`${tabName}-content`);
    if (activeContent) {
        activeContent.classList.add('active');
    }
}

// ========================================
// RENDERIZAÇÃO - FAVORITOS
// ========================================

/**
 * Renderiza obras favoritas
 */
function renderFavoritos() {
    const container = document.getElementById('favoritos-list');
    const countElement = document.getElementById('favoritos-count');
    
    // Filtra obras favoritas
    const obrasFavoritas = clientData.obras.filter(obra => 
        clientData.favoritos.includes(obra.id)
    );
    
    // Atualiza contador
    countElement.textContent = `${obrasFavoritas.length} itens`;
    
    // Empty state
    if (obrasFavoritas.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <p>Você ainda não tem favoritos</p>
                <p>Explore obras de arte e adicione aos favoritos</p>
            </div>
        `;
        return;
    }
    
    // Renderiza grid
    container.innerHTML = `
        <div class="obras-grid">
            ${obrasFavoritas.map(obra => createObraCard(obra)).join('')}
        </div>
    `;
    
    // Adiciona event listeners
    obrasFavoritas.forEach(obra => {
        const deleteBtn = document.querySelector(`[data-delete-favorito="${obra.id}"]`);
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => handleRemoveFavorito(obra.id));
        }
    });
}

/**
 * Cria card de obra
 */
function createObraCard(obra) {
    return `
        <div class="obra-card">
            <div class="obra-card-image-wrapper">
                <img src="${obra.imageUrl}" alt="${obra.title}" class="obra-card-image">
                <button class="btn btn-secondary btn-icon obra-card-delete" data-delete-favorito="${obra.id}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>
            <div class="obra-card-content">
                <h3 class="obra-card-title">${obra.title}</h3>
                <p class="obra-card-artist">${obra.artist}</p>
                <div class="obra-card-footer">
                    <span class="obra-card-price">R$ ${formatPrice(obra.price)}</span>
                    <button class="btn btn-outline btn-sm">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                        Ver
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ========================================
// RENDERIZAÇÃO - CARRINHO
// ========================================

/**
 * Renderiza carrinho de compras
 */
function renderCarrinho() {
    const container = document.getElementById('carrinho-container');
    const countElement = document.getElementById('carrinho-count');
    
    // Filtra obras no carrinho
    const obrasCarrinho = clientData.obras.filter(obra => 
        clientData.carrinho.some(item => item.obraId === obra.id)
    );
    
    // Atualiza contador
    countElement.textContent = `${obrasCarrinho.length} itens`;
    
    // Empty state
    if (obrasCarrinho.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <p>Seu carrinho está vazio</p>
                <p>Adicione obras ao carrinho para finalizar sua compra</p>
            </div>
        `;
        return;
    }
    
    // Calcula total
    const total = obrasCarrinho.reduce((sum, obra) => sum + obra.price, 0);
    
    // Renderiza layout com items e resumo
    container.innerHTML = `
        <div class="carrinho-layout">
            <div class="carrinho-items">
                ${obrasCarrinho.map(obra => createCarrinhoItem(obra)).join('')}
            </div>
            
            <div class="order-summary">
                <h3 class="order-summary-title">Resumo do Pedido</h3>
                <div class="order-summary-details">
                    <div class="order-summary-row">
                        <span class="label">Subtotal</span>
                        <span class="price">R$ ${formatPrice(total)}</span>
                    </div>
                    <div class="order-summary-row">
                        <span class="label">Taxa de serviço</span>
                        <span class="price">R$ 0,00</span>
                    </div>
                    <div class="order-summary-row total">
                        <span class="label">Total</span>
                        <span class="price">R$ ${formatPrice(total)}</span>
                    </div>
                </div>
                <button class="btn btn-primary btn-full btn-lg" onclick="handleFinalizarCompra()">
                    Finalizar Compra
                </button>
            </div>
        </div>
    `;
    
    // Adiciona event listeners
    obrasCarrinho.forEach(obra => {
        const deleteBtn = document.querySelector(`[data-delete-carrinho="${obra.id}"]`);
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => handleRemoveCarrinho(obra.id));
        }
    });
}

/**
 * Cria item do carrinho
 */
function createCarrinhoItem(obra) {
    return `
        <div class="carrinho-item">
            <div class="carrinho-item-content">
                <img src="${obra.imageUrl}" alt="${obra.title}" class="carrinho-item-image">
                <div class="carrinho-item-info">
                    <h3 class="carrinho-item-title">${obra.title}</h3>
                    <p class="carrinho-item-artist">${obra.artist}</p>
                    <span class="carrinho-item-price">R$ ${formatPrice(obra.price)}</span>
                </div>
                <button class="btn btn-ghost btn-icon carrinho-item-delete" data-delete-carrinho="${obra.id}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

// ========================================
// RENDERIZAÇÃO - EVENTOS
// ========================================

/**
 * Renderiza eventos confirmados
 */
function renderEventos() {
    const container = document.getElementById('eventos-list');
    const countElement = document.getElementById('eventos-count');
    
    // Filtra eventos confirmados
    const eventosConfirmados = clientData.eventos.filter(evento => 
        clientData.eventosConfirmados.includes(evento.id)
    );
    
    // Atualiza contador
    countElement.textContent = `${eventosConfirmados.length} eventos`;
    
    // Empty state
    if (eventosConfirmados.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <p>Você não confirmou presença em nenhum evento</p>
                <p>Explore eventos culturais e confirme sua presença</p>
            </div>
        `;
        return;
    }
    
    // Renderiza grid
    container.innerHTML = `
        <div class="eventos-grid">
            ${eventosConfirmados.map(evento => createEventoCard(evento)).join('')}
        </div>
    `;
    
    // Adiciona event listeners
    eventosConfirmados.forEach(evento => {
        const deleteBtn = document.querySelector(`[data-cancel-evento="${evento.id}"]`);
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => handleCancelarEvento(evento.id));
        }
    });
}

/**
 * Cria card de evento
 */
function createEventoCard(evento) {
    return `
        <div class="evento-card">
            <img src="${evento.imageUrl}" alt="${evento.title}" class="evento-card-image">
            <div class="evento-card-content">
                <h3 class="evento-card-title">${evento.title}</h3>
                <div class="evento-card-details">
                    <p class="evento-card-date">${evento.date} às ${evento.time}</p>
                    <p class="evento-card-location">${evento.location}</p>
                    <p class="evento-card-attendees">${evento.attendees} pessoas confirmadas</p>
                </div>
                <div class="evento-card-actions">
                    <button class="btn btn-outline" style="flex: 1;">Ver Detalhes</button>
                    <button class="btn btn-ghost btn-icon" data-cancel-evento="${evento.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ========================================
// RENDERIZAÇÃO - HISTÓRICO
// ========================================

/**
 * Renderiza histórico de compras
 */
function renderHistorico() {
    const container = document.getElementById('historico-list');
    
    // Empty state
    if (clientData.compras.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                    <path d="M3 3v5h5"/>
                    <path d="M12 7v5l4 2"/>
                </svg>
                <p>Você ainda não realizou nenhuma compra</p>
                <p>Suas compras aparecerão aqui após a finalização</p>
            </div>
        `;
        return;
    }
    
    // Renderiza lista de compras
    container.innerHTML = `
        <div class="historico-list">
            ${clientData.compras.map(compra => createCompraCard(compra)).join('')}
        </div>
    `;
}

/**
 * Cria card de compra
 */
function createCompraCard(compra) {
    return `
        <div class="compra-card">
            <div class="compra-header">
                <div>
                    <p class="compra-id">Pedido #${compra.id}</p>
                    <p class="compra-date">${compra.date}</p>
                </div>
                <span class="compra-status">${compra.status}</span>
            </div>
            <div class="compra-items">
                ${compra.items.map(item => `
                    <div class="compra-item">
                        <span>${item.title}</span>
                        <span class="compra-item-price">R$ ${formatPrice(item.price)}</span>
                    </div>
                `).join('')}
            </div>
            <div class="compra-footer">
                <span>Total</span>
                <span class="compra-total">R$ ${formatPrice(compra.total)}</span>
            </div>
        </div>
    `;
}

// ========================================
// HANDLERS DE EVENTOS
// ========================================

/**
 * Remove favorito
 */
async function handleRemoveFavorito(obraId) {
    try {
        await removeFavorito(obraId);
        
        // Atualiza estado local
        clientData.favoritos = clientData.favoritos.filter(id => id !== obraId);
        
        // Re-renderiza
        renderFavoritos();
        
        // Toast
        showToast('Removido dos favoritos', 'A obra foi removida dos seus favoritos', 'success');
    } catch (error) {
        showToast('Erro', 'Não foi possível remover dos favoritos', 'error');
    }
}

/**
 * Remove do carrinho
 */
async function handleRemoveCarrinho(obraId) {
    try {
        await removeCarrinho(obraId);
        
        // Atualiza estado local
        clientData.carrinho = clientData.carrinho.filter(item => item.obraId !== obraId);
        
        // Re-renderiza
        renderCarrinho();
        
        // Toast
        showToast('Removido do carrinho', 'A obra foi removida do carrinho', 'success');
    } catch (error) {
        showToast('Erro', 'Não foi possível remover do carrinho', 'error');
    }
}

/**
 * Cancela evento
 */
async function handleCancelarEvento(eventoId) {
    try {
        await cancelarEvento(eventoId);
        
        // Atualiza estado local
        clientData.eventosConfirmados = clientData.eventosConfirmados.filter(id => id !== eventoId);
        
        // Re-renderiza
        renderEventos();
        
        // Toast
        showToast('Presença cancelada', 'Sua presença no evento foi cancelada', 'success');
    } catch (error) {
        showToast('Erro', 'Não foi possível cancelar presença', 'error');
    }
}

/**
 * Finaliza compra
 */
function handleFinalizarCompra() {
    // TODO: Implementar fluxo de checkout
    showToast('Em desenvolvimento', 'Funcionalidade de checkout em breve!', 'info');
}

// ========================================
// UTILIDADES
// ========================================

/**
 * Formata preço
 */
function formatPrice(price) {
    return price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Toast notification (usa a função de main.js)
 */
function showToast(title, description, type = 'info') {
    if (typeof window.showToast === 'function') {
        window.showToast(title, description, type);
    } else {
        alert(`${title}: ${description}`);
    }
}

// ========================================
// INICIALIZAÇÃO
// ========================================

/**
 * Inicializa o dashboard
 */
async function initDashboard() {
    try {
        // Carrega dados do cliente
        const data = await loadClientData();
        clientData = data;
        
        // Inicializa sistema de tabs
        initTabs();
        
        // Renderiza todas as abas
        renderFavoritos();
        renderCarrinho();
        renderEventos();
        renderHistorico();
        
    } catch (error) {
        console.error('Erro ao inicializar dashboard:', error);
        showToast('Erro', 'Não foi possível carregar seus dados', 'error');
    }
}

// Torna funções disponíveis globalmente
window.handleFinalizarCompra = handleFinalizarCompra;

// Executa quando o DOM estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}