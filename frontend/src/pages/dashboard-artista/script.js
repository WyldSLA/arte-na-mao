// ========================================
// DASHBOARD ARTISTA - MOCK VERSION
// ========================================

let artistData = {
    portfolio: [],
    eventos: [],
    favoritos: [],
    carrinho: [],
    historico: []
};

let editingObra = null;
let editingEvento = null;

// Mock data
const mockPortfolio = [
    {
        id: "1",
        title: "Sertão em Cores",
        category: "Pintura",
        price: 1500,
        imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
        description: "Uma explosão de cores que representa a beleza do sertão nordestino"
    },
    {
        id: "2",
        title: "Horizonte Atlântico",
        category: "Fotografia",
        price: 2200,
        imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
        description: "Captura única do encontro entre céu e mar"
    }
];

const mockEventos = [
    {
        id: "1",
        title: "Exposição: Cores do Nordeste",
        date: "2025-12-15",
        location: "Recife, PE",
        imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
        attendees: 45
    }
];

const mockFavoritos = [
    {
        id: "3",
        title: "Arte Popular",
        artist: "Ana Costa",
        price: 1800,
        imageUrl: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80"
    }
];

const mockCarrinho = [
    {
        id: "4",
        title: "Cerâmica Artesanal",
        artist: "Pedro Lima",
        price: 950,
        imageUrl: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&q=80"
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
    
    const total = artistData.carrinho.reduce((sum, obra) => sum + obra.price, 0);
    
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

function handleObraSubmit(e) {
    e.preventDefault();
    
    const novaObra = {
        id: Date.now().toString(),
        title: document.getElementById('obraTitle').value,
        category: document.getElementById('obraCategory').value,
        price: parseFloat(document.getElementById('obraPrice').value),
        imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
        description: document.getElementById('obraDescription').value
    };
    
    artistData.portfolio.push(novaObra);
    updateStats();
    renderPortfolio();
    closeObraDialog();
    
    if (typeof showToast === 'function') {
        showToast('Obra adicionada!', 'Sua obra foi publicada com sucesso', 'success');
    }
}

function handleDeleteObra(obraId) {
    if (!confirm('Deseja remover esta obra?')) return;
    
    artistData.portfolio = artistData.portfolio.filter(o => o.id !== obraId);
    updateStats();
    renderPortfolio();
    
    if (typeof showToast === 'function') {
        showToast('Obra removida', 'A obra foi removida do seu portfólio', 'success');
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

function handleEventoSubmit(e) {
    e.preventDefault();
    
    const novoEvento = {
        id: Date.now().toString(),
        title: document.getElementById('eventoTitle').value,
        date: document.getElementById('eventoDate').value,
        location: document.getElementById('eventoLocation').value,
        imageUrl: document.getElementById('eventoImage').value,
        attendees: 0
    };
    
    artistData.eventos.push(novoEvento);
    updateStats();
    renderEventos();
    closeEventoDialog();
    
    if (typeof showToast === 'function') {
        showToast('Evento criado!', 'Seu evento foi publicado com sucesso', 'success');
    }
}

function handleDeleteEvento(eventoId) {
    if (!confirm('Deseja cancelar este evento?')) return;
    
    artistData.eventos = artistData.eventos.filter(e => e.id !== eventoId);
    updateStats();
    renderEventos();
    
    if (typeof showToast === 'function') {
        showToast('Evento cancelado', 'O evento foi removido', 'success');
    }
}

// ========================================
// HANDLERS
// ========================================

function handleRemoveFavorito(obraId) {
    artistData.favoritos = artistData.favoritos.filter(o => o.id !== obraId);
    renderFavoritos();
    
    if (typeof showToast === 'function') {
        showToast('Removido dos favoritos', 'A obra foi removida', 'success');
    }
}

function handleRemoveCarrinho(obraId) {
    artistData.carrinho = artistData.carrinho.filter(o => o.id !== obraId);
    renderCarrinho();
    
    if (typeof showToast === 'function') {
        showToast('Removido do carrinho', 'A obra foi removida', 'success');
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
// UTILITIES
// ========================================

function formatPrice(price) {
    return price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

// ========================================
// INIT
// ========================================

async function init() {
    // Carrega mock data
    await new Promise(resolve => setTimeout(resolve, 500));
    artistData.portfolio = [...mockPortfolio];
    artistData.eventos = [...mockEventos];
    artistData.favoritos = [...mockFavoritos];
    artistData.carrinho = [...mockCarrinho];
    artistData.historico = [];
    
    // Inicializa tabs
    initTabs();
    
    // Inicializa file upload
    initFileUpload();
    
    // Renderiza
    updateStats();
    renderPortfolio();
    renderEventos();
    renderFavoritos();
    renderCarrinho();
    renderHistorico();
    
    // Event listeners
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
window.removePreview = removePreview;
window.checkPreviews = checkPreviews;

// Executa
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
