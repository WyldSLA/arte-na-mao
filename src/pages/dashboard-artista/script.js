// ========================================
// DASHBOARD ARTISTA
// ========================================

let userData = null;
let artistData = null;

let editingObra = null;
let editingEvento = null;
// holds data URL of uploaded artwork (set when file is selected)
let uploadedArtworkDataUrl = null;

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
// UPDATE STATS
// ========================================

function updateStats() {
    const statObras = document.getElementById('statObras');
    const statEventos = document.getElementById('statEventos');
    
    if (statObras) {
        statObras.textContent = artistData.portfolio.length;
    }
    if (statEventos) {
        statEventos.textContent = artistData.eventos.length;
    }
}

// ========================================
// RENDER PORTFÓLIO
// ========================================

function renderPortfolio() {
    const container = document.getElementById('portfolio-list');
    if (!container) return;
    
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
    if (!container) return;
    
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
    
    if (!container) return;
    
    if (count) {
        count.textContent = `${artistData.favoritos.length} itens`;
    }
    
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
    
    container.innerHTML = `
        <div class="obras-grid">
            ${artistData.favoritos.map(obra => `
                <div class="obra-card">
                    <div class="obra-card-image-wrapper">
                        <img src="${obra.imageUrl}" alt="${obra.title}" class="obra-card-image">
                            <button class="btn btn-secondary btn-icon obra-card-delete" onclick="window.handleRemoveFavorito('${obra.id}')">
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
    
    if (!container) return;
    
    if (count) {
        count.textContent = `${artistData.carrinho.length} itens`;
    }
    
    if (artistData.carrinho.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <p>Seu carrinho está vazio</p>
            </div>
        `;
        return;
    }
    
    const total = artistData.carrinho.reduce((sum, obra) => sum + (Number(obra.price || 0) * (obra.quantity || 1)), 0);
    
    container.innerHTML = `
        <div class="carrinho-layout">
            <div class="carrinho-items">
                ${artistData.carrinho.map(obra => `
                    <div class="carrinho-item">
                        <div class="carrinho-item-content">
                            <img src="${obra.imageUrl}" alt="${obra.title}" class="carrinho-item-image">
                            <div class="carrinho-item-info">
                                <h3 class="carrinho-item-title">${obra.title}</h3>
                                <p class="carrinho-item-artist">${obra.artist}</p>
                                <span class="carrinho-item-price">R$ ${formatPrice(obra.price)}</span>
                            </div>
                                <button class="btn btn-ghost btn-icon carrinho-item-delete" onclick="window.handleRemoveCarrinho('${obra.id}')">
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
// RENDER HISTÓRICO
// ========================================

function renderHistorico() {
    const container = document.getElementById('historico-list');
    if (!container) return;
    
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
                        <p class="compra-id">
                            <span>Venda #${venda.id}</span>
                            ${venda.comprador ? `<span class="compra-buyer">para ${venda.comprador.nome}</span>` : ''}
                        </p>
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
// MODALS - OBRA
// ========================================

function openAddObraDialog() {
    const modal = document.getElementById('obraModal');
    const modalTitle = document.getElementById('modalTitle');
    
    if (!modal) return;
    
    editingObra = null;
    if (modalTitle) modalTitle.textContent = 'Adicionar Obra';
    
    const form = document.getElementById('obraForm');
    if (form) form.reset();
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeObraDialog() {
    const modal = document.getElementById('obraModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
    editingObra = null;
}

async function handleObraSubmit(e) {
    e.preventDefault();
    
    try {
        const formData = {
            title: document.getElementById('obraTitle').value,
            category: document.getElementById('obraCategory').value,
            price: parseFloat(document.getElementById('obraPrice').value),
            description: document.getElementById('obraDescription').value
        };

        // TODO: Implementar upload de imagem real
        // Use uploaded data URL if available (from file preview), otherwise fallback to placeholder
        formData.imageUrl = uploadedArtworkDataUrl || "https://via.placeholder.com/800x600";

        // Cria obra
        await window.artworkService.createArtwork(userData.id, formData);
        
        // Recarrega dados
        await loadData();
        
        // Fecha modal
        closeObraDialog();
    // clear uploaded preview data after submit
    uploadedArtworkDataUrl = null;
        
        if (typeof showToast === 'function') {
            showToast('Obra adicionada!', 'Sua obra foi publicada com sucesso', 'success');
        }

    } catch (error) {
        console.error('Erro ao adicionar obra:', error);
        if (typeof showToast === 'function') {
            showToast('Erro', 'Não foi possível adicionar a obra', 'error');
        }
    }
}

async function handleDeleteObra(obraId) {
    if (!confirm('Tem certeza que deseja remover esta obra?')) return;
    
    try {
        await window.artworkService.deleteArtwork(obraId);
        await loadData();
        
        if (typeof showToast === 'function') {
            showToast('Obra removida', 'A obra foi removida do seu portfólio', 'success');
        }
    } catch (error) {
        console.error('Erro ao remover obra:', error);
        if (typeof showToast === 'function') {
            showToast('Erro', 'Não foi possível remover a obra', 'error');
        }
    }
}

// ========================================
// MODALS - EVENTO
// ========================================

function openAddEventoDialog() {
    const modal = document.getElementById('eventoModal');
    if (!modal) return;
    
    editingEvento = null;
    const form = document.getElementById('eventoForm');
    if (form) form.reset();
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEventoDialog() {
    const modal = document.getElementById('eventoModal');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
    editingEvento = null;
}

async function handleEventoSubmit(e) {
    e.preventDefault();
    
    try {
        const formData = {
            title: document.getElementById('eventoTitle').value,
            date: document.getElementById('eventoDate').value,
            location: document.getElementById('eventoLocation').value,
            imageUrl: document.getElementById('eventoImage').value
        };

        // Cria evento
        await window.eventService.createEvent(userData.id, formData);
        
        // Recarrega dados
        await loadData();
        
        // Fecha modal
        closeEventoDialog();
        
        if (typeof showToast === 'function') {
            showToast('Evento criado!', 'Seu evento foi publicado com sucesso', 'success');
        }

    } catch (error) {
        console.error('Erro ao criar evento:', error);
        if (typeof showToast === 'function') {
            showToast('Erro', 'Não foi possível criar o evento', 'error');
        }
    }
}

async function handleDeleteEvento(eventoId) {
    if (!confirm('Tem certeza que deseja cancelar este evento?')) return;
    
    try {
        await window.eventService.deleteEvent(eventoId);
        await loadData();
        
        if (typeof showToast === 'function') {
            showToast('Evento cancelado', 'O evento foi removido', 'success');
        }
    } catch (error) {
        console.error('Erro ao cancelar evento:', error);
        if (typeof showToast === 'function') {
            showToast('Erro', 'Não foi possível cancelar o evento', 'error');
        }
    }
}

// ========================================
// HANDLERS
// ========================================

async function handleRemoveFavorito(obraId) {
    try {
        await window.artworkService.toggleFavorite(userData.id, obraId);
        // Recarrega favoritos do serviço para garantir sincronismo
        const favs = await window.artworkService.getFavorites(userData.id);
        artistData.favoritos = favs.map(f => ({
            id: f.obra.id,
            title: f.obra.titulo || f.obra.title || '',
            imageUrl: f.obra.imagemUrl || f.obra.imageUrl || '',
            price: Number(f.obra.preco || f.obra.price || 0),
            artist: f.obra.artistaNome || f.obra.artist || userData.nome || ''
        })).filter(Boolean);
        updateStats();
        renderFavoritos();
        if (typeof showToast === 'function') {
            showToast('Removido dos favoritos', 'A obra foi removida', 'success');
        }
    } catch (error) {
        console.error('Erro ao remover dos favoritos:', error);
        if (typeof showToast === 'function') {
            showToast('Erro', 'Não foi possível remover dos favoritos', 'error');
        }
    }
}

async function handleRemoveCarrinho(obraId) {
    try {
        await window.artworkService.removeFromCart(userData.id, obraId);
        // Recarrega carrinho do serviço para garantir sincronismo
        const carrinho = await window.artworkService.getCartItems(userData.id);
        artistData.carrinho = carrinho.map(i => {
            const art = i.obra;
            if (!art) return null;
            return {
                id: art.id,
                title: art.titulo || art.title || '',
                imageUrl: art.imagemUrl || art.imageUrl || '',
                price: Number(art.preco || art.price || 0),
                artist: art.artistaNome || art.artist || userData.nome || '',
                quantity: i.quantidade || 1
            };
        }).filter(Boolean);
        updateStats();
        renderCarrinho();
        if (typeof showToast === 'function') {
            showToast('Removido do carrinho', 'A obra foi removida', 'success');
        }
    } catch (error) {
        console.error('Erro ao remover do carrinho:', error);
        if (typeof showToast === 'function') {
            showToast('Erro', 'Não foi possível remover do carrinho', 'error');
        }
    }
}

async function handleFinalizarCompra() {
    try {
        // TODO: Implementar seleção de endereço
        const address = (await window.userService.getUser(userData.id)).addresses[0];
        
        if (!address) {
            if (typeof showToast === 'function') {
                showToast('Atenção', 'Adicione um endereço antes de finalizar a compra', 'warning');
            }
            return;
        }

        await window.artworkService.createPurchase(userData.id, address.id);
        await loadData();
        
        if (typeof showToast === 'function') {
            showToast('Compra realizada!', 'Sua compra foi finalizada com sucesso', 'success');
        }
    } catch (error) {
        console.error('Erro ao finalizar compra:', error);
        if (typeof showToast === 'function') {
            showToast('Erro', 'Não foi possível finalizar a compra', 'error');
        }
    }
}

// ========================================
// FILE UPLOAD COM PREVIEW
// ========================================

function initFileUpload() {
    const fileInput = document.getElementById('obraFile');
    const uploadBox = document.getElementById('uploadBox');
    const fileLabel = document.getElementById('fileUploadLabel');
    const previewContainer = document.getElementById('previewContainer');
    
    if (!fileInput || !uploadBox) return;
    
    // Previne comportamento padrão
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadBox.addEventListener(eventName, e => {
            e.preventDefault();
            e.stopPropagation();
        });
    });
    
    // Highlight ao arrastar
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
    
    // Handle drop
    uploadBox.addEventListener('drop', e => {
        const files = e.dataTransfer.files;
        handleFiles(files);
    });
    
    // Handle file select
    fileInput.addEventListener('change', e => {
        const files = e.target.files;
        handleFiles(files);
    });
    
    function handleFiles(files) {
        previewContainer.innerHTML = '';
        
        Array.from(files).forEach((file) => {
            // Valida tamanho (50MB)
            if (file.size > 50 * 1024 * 1024) {
                if (typeof showToast === 'function') {
                    showToast('Erro', `${file.name} é muito grande (máx 50MB)`, 'error');
                }
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
            // store the latest uploaded file as data URL for submission
            uploadedArtworkDataUrl = e.target.result;
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
                        <button type="button" class="preview-remove" onclick="removePreview(this)">
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
                        <button type="button" class="preview-remove" onclick="removePreview(this)">
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
                        <button type="button" class="preview-remove" onclick="removePreview(this)">
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
}

function removePreview(button) {
    const previewItem = button.closest('.preview-item');
    if (previewItem) {
        previewItem.remove();
    }
    checkPreviews();
}

function checkPreviews() {
    const previewContainer = document.getElementById('previewContainer');
    const uploadBox = document.getElementById('uploadBox');
    const fileLabel = document.getElementById('fileUploadLabel');
    
    if (!previewContainer || !uploadBox || !fileLabel) return;
    
    const remainingPreviews = previewContainer.querySelectorAll('.preview-item');
    
    if (remainingPreviews.length === 0) {
        uploadBox.classList.remove('filled');
        fileLabel.textContent = 'Arraste ou clique para enviar arquivos';
        
        // Limpa o input file
        const fileInput = document.getElementById('obraFile');
        if (fileInput) fileInput.value = '';
    } else {
        fileLabel.textContent = remainingPreviews.length === 1 ? 
            '1 arquivo selecionado' : 
            `${remainingPreviews.length} arquivos selecionados`;
    }
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

// ========================================
// CARREGA DADOS
// ========================================

async function loadData() {
    try {
        // Carrega obras do artista
        const portfolio = await window.artworkService.listArtworks({
            artistId: userData.id,
            includeStats: true
        });

        // Carrega eventos do artista
        const eventos = await window.eventService.listEvents({
            artistId: userData.id
        });

        // Carrega favoritos
        const favoritos = await window.artworkService.getFavorites(userData.id);

        // Carrega carrinho
        const carrinho = await window.artworkService.getCartItems(userData.id);

        // Carrega histórico de vendas
        const historico = await window.artworkService.getArtistSales(userData.id);

        // Normaliza dados para a UI (converte chaves PT-BR -> esperado pela UI em inglês)
        const normalizeArtwork = (a) => {
            if (!a) return null;
            return {
                id: a.id || a.id,
                title: a.titulo || a.title || '',
                imageUrl: a.imagemUrl || a.imageUrl || '',
                price: typeof a.preco !== 'undefined' ? Number(a.preco) : (typeof a.price !== 'undefined' ? Number(a.price) : 0),
                category: a.categoria || a.category || '',
                artist: a.artistaNome || a.artist || userData.name || userData.nome || ''
            };
        };

        const normalizedPortfolio = (portfolio || []).map(normalizeArtwork).filter(Boolean);

        // favoritos: artworkService.getFavorites returns wrappers { ...f, obra }
        const normalizedFavoritos = (favoritos || []).map(f => normalizeArtwork(f.obra)).filter(Boolean);

        // carrinho: getCartItems returns items with obra property and quantity
        const normalizedCarrinho = (carrinho || []).map(i => {
            const art = normalizeArtwork(i.obra);
            if (!art) return null;
            return {
                ...art,
                quantity: i.quantidade || i.quantity || 1
            };
        }).filter(Boolean);

        // historico: map purchases to expected shape
        const normalizedHistorico = (historico || []).map(p => ({
            id: p.id,
                date: p.dataCriacao ? new Date(p.dataCriacao).toLocaleString('pt-BR') : '',
                status: window.artworkService._normalizeStatus(p.status),
            total: p.valorTotal || p.total || 0,
            items: (p.items || []).map(it => ({
                id: it.id,
                obra: normalizeArtwork(it.obra),
                quantidade: it.quantidade || it.quantity || 1,
                precoUnitario: it.precoUnitario || it.preco || 0
            }))
        }));

        // Atualiza dados
        artistData = {
            portfolio: normalizedPortfolio,
            eventos: (eventos || []).map(ev => ({
                id: ev.id,
                title: ev.titulo || ev.title || '',
                imageUrl: ev.imagemUrl || ev.imageUrl || '',
                date: ev.data || ev.date || '',
                location: ev.local || ev.location || '',
                attendees: ev.participantes || ev.attendees || 0,
                status: ev.status || ''
            })),
            favoritos: normalizedFavoritos,
            carrinho: normalizedCarrinho,
            historico: normalizedHistorico
        };

        // Atualiza interface
        updateStats();
        renderPortfolio();
        renderEventos();
        renderFavoritos();
        renderCarrinho();
        renderHistorico();

    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        if (typeof showToast === 'function') {
            showToast('Erro', 'Não foi possível carregar alguns dados', 'error');
        }
    }
}

// ========================================
// ATUALIZA INTERFACE
// ========================================

function updateUserInterface() {
    // Avatar
    const avatar = document.getElementById('profileAvatar');
    if (avatar && userData.avatar) {
        avatar.src = userData.avatar;
        avatar.alt = userData.nome;
    }

    // Nome
    const name = document.getElementById('profileName');
    if (name) {
        name.textContent = userData.nome;
    }
}

function setupEventListeners() {
    // Forms
    const obraForm = document.getElementById('obraForm');
    if (obraForm) {
        obraForm.addEventListener('submit', handleObraSubmit);
    }
    
    const eventoForm = document.getElementById('eventoForm');
    if (eventoForm) {
        eventoForm.addEventListener('submit', handleEventoSubmit);
    }
    
    // ESC para fechar modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeObraDialog();
            closeEventoDialog();
        }
    });
}

// ========================================
// UTILITIES
// ========================================

function formatPrice(price) {
    // Defensive: handle undefined/null
    const p = (typeof price === 'number' && !isNaN(price)) ? price : (price ? Number(price) : 0);
    try {
        return p.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } catch (err) {
        return '0,00';
    }
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

// ========================================
// INIT
// ========================================

async function init() {
    try {
        // Verifica autenticação
        const token = localStorage.getItem('authToken');
        if (!token) {
            window.location.href = '../../../public/login.html';
            return;
        }

        // Carrega dados do usuário
        userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData || userData.tipo !== 'ARTISTA') {
            handleLogout();
            return;
        }

        // Atualiza interface com dados do usuário
        updateUserInterface();
        
        // Inicializa abas
        initTabs();
        
        // Inicializa upload de arquivos
        initFileUpload();
        
        // Carrega dados
        await loadData();
        
        // Adiciona event listeners
        setupEventListeners();
        
    } catch (error) {
        console.error('Erro ao inicializar dashboard:', error);
        if (typeof showToast === 'function') {
            showToast('Erro', 'Não foi possível carregar seus dados', 'error');
        }
    }
}

// Torna funções globais
window.openAddObraDialog = openAddObraDialog;
window.closeObraDialog = closeObraDialog;
window.openAddEventoDialog = openAddEventoDialog;
window.closeEventoDialog = closeEventoDialog;
window.handleDeleteObra = handleDeleteObra;
window.handleDeleteEvento = handleDeleteEvento;
window.handleRemoveFavorito = handleRemoveFavorito;
window.handleRemoveCarrinho = handleRemoveCarrinho;
window.handleFinalizarCompra = handleFinalizarCompra;
window.removePreview = removePreview;
window.checkPreviews = checkPreviews;

// Garante listeners dos formulários e modais
document.addEventListener('DOMContentLoaded', () => {
    const obraForm = document.getElementById('obraForm');
    if (obraForm) obraForm.addEventListener('submit', handleObraSubmit);
    const eventoForm = document.getElementById('eventoForm');
    if (eventoForm) eventoForm.addEventListener('submit', handleEventoSubmit);
});
// Executa
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
