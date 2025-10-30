// ========================================
// DASHBOARD-ARTIST.JS - Lógica do Dashboard do Artista
// ========================================

// ========================================
// ESTADO DA APLICAÇÃO
// ========================================

let artistData = {
    profile: {
        name: "Maria Silva",
        username: "@mariasilva_arte",
        bio: "Artista plástica apaixonada por cores e texturas. Especializada em pinturas que retratam a cultura nordestina.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
        email: "maria.silva@email.com",
        phone: "(81) 99999-9999",
        location: "Recife, PE",
        memberSince: "Janeiro 2024"
    },
    obras: [],
    eventos: [],
    stats: {
        totalObras: 0,
        totalEventos: 0,
        totalLikes: 1234,
        totalViews: 5432
    },
    artistId: 'artist1'
};

let editingObra = null;
let editingEvento = null;

// ========================================
// MOCK DATA
// ========================================

const mockObras = [
    {
        id: "1",
        title: "Sertão em Cores",
        category: "Pintura",
        imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=1200&fit=crop",
        price: 1500.00,
        description: "Uma explosão de cores que representa a beleza do sertão nordestino",
        artistId: "artist1"
    },
    {
        id: "2",
        title: "Horizonte Atlântico",
        category: "Fotografia",
        imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=1200&fit=crop",
        price: 2200.00,
        description: "Captura única do encontro entre céu e mar",
        artistId: "artist1"
    }
];

const mockEventos = [
    {
        id: "1",
        title: "Festival de Arte Popular",
        imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
        date: "2025-12-15",
        time: "18:00",
        location: "Recife, PE",
        description: "Grande celebração da arte popular nordestina",
        attendees: 234,
        artistId: "artist1"
    }
];

// ========================================
// SISTEMA DE TABS
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
    document.querySelectorAll('.tab-trigger').forEach(trigger => {
        trigger.classList.remove('active');
        trigger.setAttribute('aria-selected', 'false');
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
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
// RENDERIZAÇÃO - PERFIL
// ========================================

function renderPerfil() {
    const container = document.getElementById('perfil-container');
    const profile = artistData.profile;
    
    container.innerHTML = `
        <div class="profile-section">
            <div class="profile-header">
                <div class="profile-avatar-wrapper">
                    <img src="${profile.avatar}" alt="${profile.name}" class="profile-avatar">
                    <button class="profile-avatar-edit" onclick="handleEditAvatar()">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                </div>
                <div class="profile-info">
                    <h2 class="profile-name">${profile.name}</h2>
                    <p class="profile-username">${profile.username}</p>
                    <p class="profile-bio">${profile.bio}</p>
                    <div class="profile-stats">
                        <div class="profile-stat">
                            <span class="profile-stat-value">${artistData.stats.totalObras}</span>
                            <span class="profile-stat-label">Obras</span>
                        </div>
                        <div class="profile-stat">
                            <span class="profile-stat-value">${artistData.stats.totalLikes}</span>
                            <span class="profile-stat-label">Curtidas</span>
                        </div>
                        <div class="profile-stat">
                            <span class="profile-stat-value">${artistData.stats.totalViews}</span>
                            <span class="profile-stat-label">Visualizações</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="profile-details">
                <div class="profile-detail-item">
                    <div class="profile-detail-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                    </div>
                    <div class="profile-detail-content">
                        <span class="profile-detail-label">Email</span>
                        <span class="profile-detail-value">${profile.email}</span>
                    </div>
                </div>
                
                <div class="profile-detail-item">
                    <div class="profile-detail-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                    </div>
                    <div class="profile-detail-content">
                        <span class="profile-detail-label">Telefone</span>
                        <span class="profile-detail-value">${profile.phone}</span>
                    </div>
                </div>
                
                <div class="profile-detail-item">
                    <div class="profile-detail-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                    </div>
                    <div class="profile-detail-content">
                        <span class="profile-detail-label">Localização</span>
                        <span class="profile-detail-value">${profile.location}</span>
                    </div>
                </div>
                
                <div class="profile-detail-item">
                    <div class="profile-detail-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                    </div>
                    <div class="profile-detail-content">
                        <span class="profile-detail-label">Membro desde</span>
                        <span class="profile-detail-value">${profile.memberSince}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ========================================
// RENDERIZAÇÃO - STATS
// ========================================

function updateStats() {
    const minhasObras = artistData.obras.filter(o => o.artistId === artistData.artistId);
    const meusEventos = artistData.eventos.filter(e => e.artistId === artistData.artistId);
    
    artistData.stats.totalObras = minhasObras.length;
    artistData.stats.totalEventos = meusEventos.length;
    
    document.getElementById('totalObras').textContent = artistData.stats.totalObras;
    document.getElementById('totalEventos').textContent = artistData.stats.totalEventos;
    document.getElementById('totalLikes').textContent = artistData.stats.totalLikes;
    document.getElementById('totalViews').textContent = artistData.stats.totalViews;
}

// ========================================
// RENDER PORTFÓLIO
// ========================================

function renderPortfolio() {
    const container = document.getElementById('portfolio-list');
    
    if (artistData.portfolio.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <p>Você ainda não adicionou obras ao seu portfólio</p>
                <button class="btn btn-primary" onclick="openAddObraDialog()">Adicionar Primeira Obra</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <div class="obras-grid">
            ${artistData.portfolio.map(obra => `
                <div class="obra-card">
                    <div class="obra-card-image-wrapper">
                        <img src="${obra.imageUrl}" alt="${obra.title}" class="obra-card-image">
                        <button class="btn btn-secondary btn-icon obra-card-delete" onclick="handleDeleteObra('${obra.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </button>
                    </div>
                    <div class="obra-card-content">
                        <h3 class="obra-card-title">${obra.title}</h3>
                        <p class="obra-card-artist">${obra.category}</p>
                        <span class="obra-card-price">R$ ${formatPrice(obra.price)}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// ========================================
// RENDER EVENTOS
// ========================================

function renderEventos() {
    const container = document.getElementById('eventos-list');
    
    if (artistData.eventos.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <p>Você ainda não criou nenhum evento</p>
                <button class="btn btn-primary" onclick="openAddEventoDialog()">Criar Primeiro Evento</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <div class="eventos-grid">
            ${artistData.eventos.map(evento => `
                <div class="evento-card">
                    <img src="${evento.imageUrl}" alt="${evento.title}" class="evento-card-image">
                    <div class="evento-card-content">
                        <h3 class="evento-card-title">${evento.title}</h3>
                        <div class="evento-card-details">
                            <p class="evento-card-date">${formatDate(evento.date)}</p>
                            <p class="evento-card-location">${evento.location}</p>
                            <p class="evento-card-attendees">${evento.attendees || 0} interessados</p>
                        </div>
                        <div class="evento-card-actions">
                            <button class="btn btn-outline" style="flex: 1;">Ver Detalhes</button>
                            <button class="btn btn-ghost btn-icon" onclick="handleDeleteEvento('${evento.id}')">
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
// RENDER FAVORITOS
// ========================================

function renderFavoritos() {
    const container = document.getElementById('favoritos-list');
    const count = document.getElementById('favoritos-count');
    
    count.textContent = `${artistData.favoritos.length} itens`;
    
    if (artistData.favoritos.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <p>Você ainda não tem favoritos</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `<div class="obras-grid">${artistData.favoritos.map(obra => `
        <div class="obra-card">
            <div class="obra-card-image-wrapper">
                <img src="${obra.imageUrl}" alt="${obra.title}" class="obra-card-image">
            </div>
            <div class="obra-card-content">
                <h3 class="obra-card-title">${obra.title}</h3>
                <p class="obra-card-artist">${obra.artist}</p>
                <span class="obra-card-price">R$ ${formatPrice(obra.price)}</span>
            </div>
        </div>
    `).join('')}</div>`;
}

// ========================================
// RENDER HISTÓRICO
// ========================================

function renderHistorico() {
    const container = document.getElementById('historico-list');
    
    if (artistData.historico.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                    <path d="M3 3v5h5"/>
                    <path d="M12 7v5l4 2"/>
                </svg>
                <p>Nenhuma venda realizada ainda</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `<div class="historico-list">${artistData.historico.map(venda => `
        <div class="compra-card">
            <div class="compra-header">
                <div>
                    <p class="compra-id">Venda #${venda.id}</p>
                    <p class="compra-date">${venda.date}</p>
                </div>
                <span class="compra-status">${venda.status}</span>
            </div>
            <div class="compra-footer">
                <span>Total</span>
                <span class="compra-total">R$ ${formatPrice(venda.total)}</span>
            </div>
        </div>
    `).join('')}</div>`;
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
// MODAL - OBRA
// ========================================

function openAddObraDialog() {
    editingObra = null;
    document.getElementById('modalTitle').textContent = 'Adicionar Obra';
    document.getElementById('obraForm').reset();
    document.getElementById('obraId').value = '';
    
    const modal = document.getElementById('obraModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        document.getElementById('obraTitle').focus();
    }, 100);
}

function handleEditObra(obra) {
    editingObra = obra;
    document.getElementById('modalTitle').textContent = 'Editar Obra';
    
    document.getElementById('obraId').value = obra.id;
    document.getElementById('obraTitle').value = obra.title;
    document.getElementById('obraCategory').value = obra.category;
    document.getElementById('obraPrice').value = obra.price;
    document.getElementById('obraDescription').value = obra.description || '';
    
    const modal = document.getElementById('obraModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeObraDialog() {
    const modal = document.getElementById('obraModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    document.getElementById('obraForm').reset();
    editingObra = null;
    clearFormErrors();
}

async function handleObraFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = {
        id: form.obraId.value || null,
        title: form.obraTitle.value.trim(),
        category: form.obraCategory.value,
        price: parseFloat(form.obraPrice.value),
        imageUrl: editingObra ? editingObra.imageUrl : "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=1200&fit=crop",
        description: form.obraDescription.value.trim(),
        artistId: artistData.artistId
    };
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Salvando...';
    
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (editingObra) {
            artistData.obras = artistData.obras.map(o => 
                o.id === formData.id ? { ...formData } : o
            );
            showToast('Obra atualizada!', 'As alterações foram salvas com sucesso', 'success');
        } else {
            formData.id = Date.now().toString();
            artistData.obras.push(formData);
            showToast('Obra adicionada!', 'Sua obra foi publicada com sucesso', 'success');
        }
        
        updateStats();
        renderObras();
        renderPerfil();
        closeObraDialog();
        
    } catch (error) {
        showToast('Erro', 'Não foi possível salvar a obra', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

async function handleDeleteObra(obraId) {
    if (!confirm('Tem certeza que deseja remover esta obra?')) {
        return;
    }
    
    try {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        artistData.obras = artistData.obras.filter(o => o.id !== obraId);
        
        updateStats();
        renderObras();
        renderPerfil();
        
        showToast('Obra removida', 'A obra foi removida com sucesso', 'success');
        
    } catch (error) {
        showToast('Erro', 'Não foi possível remover a obra', 'error');
    }
}

// ========================================
// MODAL - EVENTO
// ========================================

function openAddEventoDialog() {
    editingEvento = null;
    document.getElementById('eventoModalTitle').textContent = 'Criar Evento';
    document.getElementById('eventoForm').reset();
    document.getElementById('eventoId').value = '';
    
    const modal = document.getElementById('eventoModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        document.getElementById('eventoTitle').focus();
    }, 100);
}

function handleEditEvento(evento) {
    editingEvento = evento;
    document.getElementById('eventoModalTitle').textContent = 'Editar Evento';
    
    document.getElementById('eventoId').value = evento.id;
    document.getElementById('eventoTitle').value = evento.title;
    document.getElementById('eventoDate').value = evento.date;
    document.getElementById('eventoTime').value = evento.time;
    document.getElementById('eventoLocation').value = evento.location;
    document.getElementById('eventoImageUrl').value = evento.imageUrl;
    document.getElementById('eventoDescription').value = evento.description || '';
    
    const modal = document.getElementById('eventoModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEventoDialog() {
    const modal = document.getElementById('eventoModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    document.getElementById('eventoForm').reset();
    editingEvento = null;
}

async function handleEventoFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = {
        id: form.eventoId.value || null,
        title: form.eventoTitle.value.trim(),
        date: form.eventoDate.value,
        time: form.eventoTime.value,
        location: form.eventoLocation.value.trim(),
        imageUrl: form.eventoImageUrl.value.trim(),
        description: form.eventoDescription.value.trim(),
        attendees: editingEvento ? editingEvento.attendees : 0,
        artistId: artistData.artistId
    };
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Salvando...';
    
    try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (editingEvento) {
            artistData.eventos = artistData.eventos.map(e => 
                e.id === formData.id ? { ...formData } : e
            );
            showToast('Evento atualizado!', 'As alterações foram salvas com sucesso', 'success');
        } else {
            formData.id = Date.now().toString();
            artistData.eventos.push(formData);
            showToast('Evento criado!', 'Seu evento foi publicado com sucesso', 'success');
        }
        
        updateStats();
        renderEventos();
        closeEventoDialog();
        
    } catch (error) {
        showToast('Erro', 'Não foi possível salvar o evento', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

async function handleDeleteEvento(eventoId) {
    if (!confirm('Tem certeza que deseja remover este evento?')) {
        return;
    }
    
    try {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        artistData.eventos = artistData.eventos.filter(e => e.id !== eventoId);
        
        updateStats();
        renderEventos();
        
        showToast('Evento removido', 'O evento foi removido com sucesso', 'success');
        
    } catch (error) {
        showToast('Erro', 'Não foi possível remover o evento', 'error');
    }
}

// ========================================
// FILE UPLOAD
// ========================================

function initFileUpload() {
    const fileInput = document.getElementById('obraFile');
    const uploadBox = document.getElementById('uploadBox');
    const fileLabel = document.getElementById('fileUploadLabel');
    const previewContainer = document.getElementById('previewContainer');
    
    if (!fileInput || !uploadBox) return;
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadBox.addEventListener(eventName, e => {
            e.preventDefault();
            e.stopPropagation();
        });
    });
    
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadBox.addEventListener(eventName, () => {
            uploadBox.classList.add('highlight');
        });
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadBox.addEventListener(eventName, () => {
            uploadBox.classList.remove('highlight');
        });
    });
    
    uploadBox.addEventListener('drop', e => {
        const files = e.dataTransfer.files;
        handleFiles(files);
    });
    
    fileInput.addEventListener('change', e => {
        const files = e.target.files;
        handleFiles(files);
    });
    
    function handleFiles(files) {
        previewContainer.innerHTML = '';
        
        Array.from(files).forEach((file) => {
            if (file.size > 50 * 1024 * 1024) {
                showToast('Erro', `${file.name} é muito grande (máx 50MB)`, 'error');
                return;
            }
            
            createPreview(file);
        });
        
        if (files.length > 0) {
            uploadBox.classList.add('filled');
            fileLabel.textContent = files.length === 1 ? 
                '1 arquivo selecionado' : 
                `${files.length} arquivos selecionados`;
        }
    }
    
    function createPreview(file) {
        const reader = new FileReader();
        
        reader.onload = e => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            
            if (file.type.startsWith('image/')) {
                previewItem.innerHTML = `
                    <div class="preview-content">
                        <img src="${e.target.result}" alt="${file.name}" class="preview-image">
                        <div class="preview-info">
                            <span class="preview-filename">${truncateFilename(file.name)}</span>
                            <span class="preview-filesize">${formatFileSize(file.size)}</span>
                        </div>
                        <button type="button" class="preview-remove" onclick="this.closest('.preview-item').remove(); checkPreviews()">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                `;
            } else if (file.type.startsWith('video/')) {
                previewItem.innerHTML = `
                    <div class="preview-content">
                        <video class="preview-video" controls>
                            <source src="${e.target.result}" type="${file.type}">
                        </video>
                        <div class="preview-info">
                            <span class="preview-filename">${truncateFilename(file.name)}</span>
                            <span class="preview-filesize">${formatFileSize(file.size)}</span>
                        </div>
                        <button type="button" class="preview-remove" onclick="this.closest('.preview-item').remove(); checkPreviews()">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                `;
            } else if (file.type === 'application/pdf') {
                previewItem.innerHTML = `
                    <div class="preview-content preview-pdf">
                        <div class="preview-pdf-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                            </svg>
                        </div>
                        <div class="preview-info">
                            <span class="preview-filename">${truncateFilename(file.name)}</span>
                            <span class="preview-filesize">${formatFileSize(file.size)}</span>
                        </div>
                        <button type="button" class="preview-remove" onclick="this.closest('.preview-item').remove(); checkPreviews()">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                `;
            }
            
            previewContainer.appendChild(previewItem);
        };
        
        reader.readAsDataURL(file);
    }
    
    function truncateFilename(filename, maxLength = 20) {
        if (filename.length <= maxLength) return filename;
        const extension = filename.split('.').pop();
        const name = filename.substring(0, filename.lastIndexOf('.'));
        return `${name.substring(0, maxLength - extension.length - 4)}...${extension}`;
    }
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }
}

function checkPreviews() {
    const previewContainer = document.getElementById('previewContainer');
    const uploadBox = document.getElementById('uploadBox');
    const fileLabel = document.getElementById('fileUploadLabel');
    
    const remainingPreviews = previewContainer.querySelectorAll('.preview-item');
    
    if (remainingPreviews.length === 0) {
        uploadBox.classList.remove('filled');
        fileLabel.textContent = 'Arraste ou clique para enviar arquivos';
    } else {
        fileLabel.textContent = remainingPreviews.length === 1 ? 
            '1 arquivo selecionado' : 
            `${remainingPreviews.length} arquivos selecionados`;
    }
}

// ========================================
// HANDLERS
// ========================================

function handleEditAvatar() {
    showToast('Em desenvolvimento', 'Funcionalidade de edição de avatar em breve!', 'info');
}

// ========================================
// UTILIDADES
// ========================================

function formatPrice(price) {
    return price.toLocaleString('pt-BR', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
    });
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(el => el.textContent = '');
    
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');
    });
}

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

async function initDashboardArtist() {
    try {
        // Carrega dados mock
        await new Promise(resolve => setTimeout(resolve, 500));
        artistData.obras = mockObras;
        artistData.eventos = mockEventos;
        
        // Inicializa componentes
        initTabs();
        initFileUpload();
        
        // Renderiza todas as abas
        renderPerfil();
        renderCarrinho();
        renderEventos();
        renderFavoritos();
        renderFavoritos();
        renderPortfolio();
        updateStats();
        
        // Event listeners
        const obraForm = document.getElementById('obraForm');
        obraForm.addEventListener('submit', handleObraFormSubmit);
        
        const eventoForm = document.getElementById('eventoForm');
        eventoForm.addEventListener('submit', handleEventoFormSubmit);
        
        // Fecha modal com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const obraModal = document.getElementById('obraModal');
                const eventoModal = document.getElementById('eventoModal');
                
                if (obraModal.classList.contains('active')) {
                    closeObraDialog();
                }
                if (eventoModal.classList.contains('active')) {
                    closeEventoDialog();
                }
            }
        });
        
    } catch (error) {
        console.error('Erro ao inicializar dashboard:', error);
        showToast('Erro', 'Não foi possível carregar seus dados', 'error');
    }
}

// Funções globais
window.openAddObraDialog = openAddObraDialog;
window.closeObraDialog = closeObraDialog;
window.openAddEventoDialog = openAddEventoDialog;
window.closeEventoDialog = closeEventoDialog;
window.checkPreviews = checkPreviews;
window.handleEditAvatar = handleEditAvatar;

// Inicializa
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboardArtist);
} else {
    initDashboardArtist();
}