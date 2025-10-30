// ========================================
// DASHBOARD CLIENTE - MOCK VERSION
// ========================================

let clientData = {
    favoritos: [],
    carrinho: [],
    eventos: [],
    historico: []
};

// Mock data
const mockFavoritos = [
    {
        id: "1",
        title: "Sertão em Cores",
        artist: "Maria Silva",
        price: 1500,
        imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80"
    },
    {
        id: "2",
        title: "Horizonte Atlântico",
        artist: "João Santos",
        price: 2200,
        imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80"
    }
];

const mockCarrinho = [
    {
        id: "3",
        title: "Raízes Nordestinas",
        artist: "Ana Oliveira",
        price: 1800,
        imageUrl: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&q=80"
    }
];

const mockEventos = [
    {
        id: "1",
        title: "Festival de Arte Popular",
        date: "15 de Dezembro, 2025",
        time: "18:00",
        location: "Recife, PE",
        attendees: 234,
        imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80"
    }
];

// ========================================
// TABS SYSTEM
// ========================================

function initTabs() {
    const triggers = document.querySelectorAll('.tab-trigger');
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const tabName = trigger.dataset.tab;
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-trigger').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
    });
    
    document.querySelectorAll('.tab-content').forEach(c => {
        c.classList.remove('active');
    });
    
    const activeTrigger = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeTrigger) {
        activeTrigger.classList.add('active');
        activeTrigger.setAttribute('aria-selected', 'true');
    }
    
    const activeContent = document.getElementById(`${tabName}-content`);
    if (activeContent) {
        activeContent.classList.add('active');
    }
}

// ========================================
// RENDER FAVORITOS
// ========================================

function renderFavoritos() {
    const container = document.getElementById('favoritos-list');
    const count = document.getElementById('favoritos-count');
    
    count.textContent = `${clientData.favoritos.length} itens`;
    
    if (clientData.favoritos.length === 0) {
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
    
    container.innerHTML = `
        <div class="obras-grid">
            ${clientData.favoritos.map(obra => `
                <div class="obra-card">
                    <div class="obra-card-image-wrapper">
                        <img src="${obra.imageUrl}" alt="${obra.title}" class="obra-card-image">
                        <button class="btn btn-secondary btn-icon obra-card-delete" onclick="handleRemoveFavorito('${obra.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </button>
                    </div>
                    <div class="obra-card-content">
                        <h3 class="obra-card-title">${obra.title}</h3>
                        <p class="obra-card-artist">${obra.artist}</p>
                        <span class="obra-card-price">R$ ${formatPrice(obra.price)}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// ========================================
// RENDER CARRINHO
// ========================================

function renderCarrinho() {
    const container = document.getElementById('carrinho-container');
    const count = document.getElementById('carrinho-count');
    
    count.textContent = `${clientData.carrinho.length} itens`;
    
    if (clientData.carrinho.length === 0) {
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
    
    const total = clientData.carrinho.reduce((sum, obra) => sum + obra.price, 0);
    
    container.innerHTML = `
        <div class="carrinho-layout">
            <div class="carrinho-items">
                ${clientData.carrinho.map(obra => `
                    <div class="carrinho-item">
                        <div class="carrinho-item-content">
                            <img src="${obra.imageUrl}" alt="${obra.title}" class="carrinho-item-image">
                            <div class="carrinho-item-info">
                                <h3 class="carrinho-item-title">${obra.title}</h3>
                                <p class="carrinho-item-artist">${obra.artist}</p>
                                <span class="carrinho-item-price">R$ ${formatPrice(obra.price)}</span>
                            </div>
                            <button class="btn btn-ghost btn-icon carrinho-item-delete" onclick="handleRemoveCarrinho('${obra.id}')">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                `).join('')}
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
}

// ========================================
// RENDER EVENTOS
// ========================================

function renderEventos() {
    const container = document.getElementById('eventos-list');
    const count = document.getElementById('eventos-count');
    
    count.textContent = `${clientData.eventos.length} eventos`;
    
    if (clientData.eventos.length === 0) {
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
    
    container.innerHTML = `
        <div class="eventos-grid">
            ${clientData.eventos.map(evento => `
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
                            <button class="btn btn-ghost btn-icon" onclick="handleCancelarEvento('${evento.id}')">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// ========================================
// RENDER HISTÓRICO
// ========================================

function renderHistorico() {
    const container = document.getElementById('historico-list');
    
    if (clientData.historico.length === 0) {
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
    
    container.innerHTML = `
        <div class="historico-list">
            ${clientData.historico.map(compra => `
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
            `).join('')}
        </div>
    `;
}

// ========================================
// HANDLERS
// ========================================

function handleRemoveFavorito(obraId) {
    clientData.favoritos = clientData.favoritos.filter(o => o.id !== obraId);
    updateStats();
    renderFavoritos();
    
    if (typeof showToast === 'function') {
        showToast('Removido dos favoritos', 'A obra foi removida', 'success');
    }
}

function handleRemoveCarrinho(obraId) {
    clientData.carrinho = clientData.carrinho.filter(o => o.id !== obraId);
    renderCarrinho();
    
    if (typeof showToast === 'function') {
        showToast('Removido do carrinho', 'A obra foi removida', 'success');
    }
}

function handleCancelarEvento(eventoId) {
    if (!confirm('Deseja cancelar sua presença neste evento?')) return;
    
    clientData.eventos = clientData.eventos.filter(e => e.id !== eventoId);
    updateStats();
    renderEventos();
    
    if (typeof showToast === 'function') {
        showToast('Presença cancelada', 'Sua presença foi cancelada', 'success');
    }
}

function handleFinalizarCompra() {
    if (typeof showToast === 'function') {
        showToast('Em desenvolvimento', 'Funcionalidade de checkout em breve!', 'info');
    } else {
        alert('Funcionalidade em desenvolvimento');
    }
}

// ========================================
// UTILITIES
// ========================================

function updateStats() {
    document.getElementById('statFavoritos').textContent = clientData.favoritos.length;
    document.getElementById('statEventos').textContent = clientData.eventos.length;
    document.getElementById('statCompras').textContent = clientData.historico.length;
}

function formatPrice(price) {
    return price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ========================================
// INIT
// ========================================

async function init() {
    // Carrega mock data
    await new Promise(resolve => setTimeout(resolve, 500));
    clientData.favoritos = [...mockFavoritos];
    clientData.carrinho = [...mockCarrinho];
    clientData.eventos = [...mockEventos];
    clientData.historico = [];
    
    // Inicializa tabs
    initTabs();
    
    // Renderiza
    updateStats();
    renderFavoritos();
    renderCarrinho();
    renderEventos();
    renderHistorico();
}

// Torna funções globais
window.handleRemoveFavorito = handleRemoveFavorito;
window.handleRemoveCarrinho = handleRemoveCarrinho;
window.handleCancelarEvento = handleCancelarEvento;
window.handleFinalizarCompra = handleFinalizarCompra;

// Executa
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}