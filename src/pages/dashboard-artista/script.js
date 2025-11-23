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
    const statCurtidas = document.getElementById('statCurtidas');
    
    if (statObras) {
        statObras.textContent = artistData.portfolio.length;
    }
    if (statEventos) {
        statEventos.textContent = artistData.eventos.length;
    }
    // Sum likes from artworks (defensive: artworks may or may not include likes)
    if (statCurtidas) {
        const totalLikes = (artistData.portfolio || []).reduce((sum, obra) => {
            return sum + (Number(obra.likes) || 0);
        }, 0);

        // Format: show '1.2k' for thousands, otherwise raw number
        let display = String(totalLikes);
        if (totalLikes >= 1000) {
            display = (totalLikes / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
        }
        statCurtidas.textContent = display;
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
                <svg class="logo-icon text-[#c9481d]" version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24" viewBox="0 0 546.000000 457.000000"
                    preserveAspectRatio="xMidYMid meet" fill="currentColor">
                    <g transform="translate(0.000000,457.000000) scale(0.100000,-0.100000)"
                    stroke="none">
                        <path d="M2931 3434 c-63 -17 -143 -55 -148 -71 -2 -6 24 -28 59 -49 168 -102
                        278 -283 278 -454 0 -68 -18 -108 -108 -242 -136 -203 -208 -383 -237 -593 -3
                        -27 -12 -75 -20 -105 -7 -30 -15 -85 -18 -122 l-5 -68 30 45 c62 94 163 171
                        415 317 184 106 249 153 330 242 114 124 157 239 157 411 -1 222 -84 428 -230
                        566 -73 69 -132 103 -209 123 -74 20 -222 20 -294 0z"/>
                        <path d="M2709 3238 c-45 -70 -50 -146 -14 -223 44 -94 203 -210 296 -216 52
                        -4 59 5 59 76 0 105 -53 222 -134 293 -49 43 -115 79 -157 87 -30 6 -38 3 -50
                        -17z"/>
                        <path d="M2357 3192 c-10 -10 -17 -33 -17 -50 0 -58 71 -88 117 -50 20 16 16
                        82 -5 101 -25 22 -75 21 -95 -1z"/>
                        <path d="M2385 2845 c-30 -30 -32 -64 -4 -99 26 -33 79 -36 109 -6 30 30 27
                        83 -6 109 -35 28 -69 26 -99 -4z"/>
                        <path d="M1810 2721 c-114 -16 -258 -78 -324 -139 -44 -40 -47 -77 -10 -121
                        39 -47 110 -74 310 -119 201 -46 291 -75 409 -135 203 -102 345 -229 429 -387
                        42 -78 46 -69 53 105 5 112 3 142 -16 215 -73 289 -278 494 -566 564 -76 18
                        -214 27 -285 17z"/>
                        <path d="M3846 2559 c-20 -16 -26 -29 -26 -59 0 -52 8 -68 41 -85 66 -35 129
                        1 129 74 0 74 -85 116 -144 70z"/>
                        <path d="M4050 2244 c-36 -19 -123 -50 -195 -70 -270 -75 -508 -160 -553 -197
                        -12 -9 -11 -12 5 -18 17 -7 17 -8 -2 -8 -17 -1 -17 -3 -5 -11 12 -8 12 -10 1
                        -10 -18 0 -6 -65 20 -101 11 -16 19 -44 19 -68 0 -22 6 -46 13 -53 12 -10 -2
                        -22 -78 -63 -101 -56 -219 -148 -286 -223 -48 -53 -80 -100 -185 -267 -38 -60
                        -87 -129 -110 -152 l-41 -43 106 0 c332 1 649 126 924 364 62 54 173 181 225
                        258 84 123 169 334 196 485 16 84 25 214 16 212 -3 -1 -34 -16 -70 -35z"/>
                        <path d="M1354 2147 c20 -247 141 -518 320 -717 177 -196 428 -360 648 -424
                        123 -35 158 -36 206 -3 117 82 173 260 138 438 -57 284 -290 527 -630 653 -83
                        32 -101 35 -112 24 -12 -12 -11 -14 6 -15 11 -1 18 2 15 7 -3 4 4 6 15 3 19
                        -5 19 -6 -6 -19 -15 -8 -29 -12 -32 -10 -5 6 -62 -69 -62 -81 0 -4 -19 -24
                        -41 -44 -28 -25 -40 -43 -36 -53 5 -11 0 -16 -13 -16 -11 0 -20 -2 -20 -5 0
                        -13 62 -59 170 -127 270 -169 359 -244 413 -349 33 -65 57 -143 57 -184 0 -30
                        -1 -30 -19 10 -34 74 -139 159 -381 305 -85 52 -187 117 -226 146 -146 107
                        -337 356 -379 494 -4 13 -14 31 -23 39 -14 14 -14 6 -8 -72z"/>
                    </g>
                </svg>
                <p>Você ainda não adicionou obras ao seu portfólio</p>
                <button class="btn btn-primary" onclick="openAddObraDialog()">Adicionar Primeira Obra</button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        ${artistData.portfolio.map(obra => `
            <div class="obra-card" onclick="openArtworkModalFromDashboard('${obra.id}')" style="cursor: pointer;">
                <div class="obra-card-image-wrapper">
                    <img src="${obra.imageUrl || obra.imagemUrl}" alt="${obra.titulo || obra.title}" class="obra-card-image">
                    <div class="obra-card-badges">
                        ${obra.isForSale ? '<span class="badge-venda">À Venda</span>' : '<span class="badge-portfolio">Portfólio</span>'}
                        ${obra.software ? `<span class="badge-software">${obra.software}</span>` : ''}
                    </div>
                    <button class="btn btn-secondary btn-icon obra-card-delete" onclick="handleDeleteObra('${obra.id}'); event.stopPropagation();" title="Deletar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
                <div class="obra-card-content">
                    <h3 class="obra-card-title">${obra.titulo || obra.title}</h3>
                    <p class="obra-card-category">${obra.categoria || obra.category}</p>
                    ${obra.tags && obra.tags.length > 0 ? `
                        <div class="obra-card-tags">
                            ${obra.tags.slice(0, 3).map(tag => `<span class="tag-small">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                    <div class="obra-card-footer">
                        <span class="obra-card-price">${obra.isForSale ? `R$ ${formatPrice(obra.preco || obra.price)}` : 'Portfólio'}</span>
                    </div>
                </div>
            </div>
        `).join('')}
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
        ${artistData.favoritos.map(obra => `
            <div class="obra-card" onclick="openArtworkModalFromDashboard('${obra.id}')" style="cursor: pointer;">
                <div class="obra-card-image-wrapper">
                    <img src="${obra.imageUrl}" alt="${obra.title}" class="obra-card-image">
                        <button class="btn btn-secondary btn-icon obra-card-delete" onclick="window.handleRemoveFavorito('${obra.id}'); event.stopPropagation();" title="Remover dos favoritos">
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
    
    // Limpar formulário e preview
    const obraForm = document.getElementById('obraForm');
    if (obraForm) obraForm.reset();
    
    uploadedArtworkDataUrl = null;
    
    // Resetar preview de imagem
    const imagePreview = document.getElementById('imagePreview');
    const uploadBox = document.getElementById('uploadBox');
    if (imagePreview) imagePreview.classList.add('hidden');
    if (uploadBox) uploadBox.classList.remove('hidden');
    
    // Resetar para modo portfólio
    const publishPortfolioRadio = document.getElementById('publishPortfolio');
    if (publishPortfolioRadio) publishPortfolioRadio.checked = true;
    togglePublishType('portfolio');
    
    // Resetar contador de caracteres
    const descCharCount = document.getElementById('descCharCount');
    if (descCharCount) descCharCount.textContent = '0/1000';
}

// Alterna entre modo portfólio e venda
function togglePublishType(type) {
    const priceSection = document.getElementById('priceSection');
    const priceInput = document.getElementById('obraPrice');
    
    if (type === 'venda') {
        priceSection.classList.remove('hidden');
        priceInput.required = true;
    } else {
        priceSection.classList.add('hidden');
        priceInput.required = false;
        priceInput.value = '';
    }
}

// Atualiza contador de caracteres da descrição
function setupObraFormListeners() {
    const obraForm = document.getElementById('obraForm');
    if (!obraForm) return;

    // Imagem preview
    const obraFile = document.getElementById('obraFile');
    if (obraFile) {
        obraFile.addEventListener('change', (e) => {
            handleImageUpload(e);
        });
    }

    // Descrição - contador de caracteres
    const obraDescription = document.getElementById('obraDescription');
    if (obraDescription) {
        obraDescription.addEventListener('input', (e) => {
            const count = e.target.value.length;
            const descCharCount = document.getElementById('descCharCount');
            if (descCharCount) {
                descCharCount.textContent = `${count}/1000`;
            }
        });
    }

    // Publicação tipo radio buttons
    const publishRadios = document.querySelectorAll('input[name="publishType"]');
    publishRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            togglePublishType(e.target.value);
        });
    });
}

function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Validação de tipo
    if (!file.type.startsWith('image/')) {
        if (typeof showToast === 'function') {
            showToast('Erro', 'Por favor, selecione uma imagem válida', 'error');
        }
        return;
    }

    // Validação de tamanho (50MB)
    if (file.size > 50 * 1024 * 1024) {
        if (typeof showToast === 'function') {
            showToast('Erro', 'Arquivo muito grande (máx 50MB)', 'error');
        }
        return;
    }

    // Ler arquivo e criar preview
    const reader = new FileReader();
    reader.onload = (event) => {
        uploadedArtworkDataUrl = event.target.result;
        
        // Mostrar preview
        const imagePreview = document.getElementById('imagePreview');
        const imagePreviewImg = document.getElementById('obraImagePreviewImg');
        const uploadBox = document.getElementById('uploadBox');
        
        if (imagePreview && imagePreviewImg && uploadBox) {
            imagePreviewImg.src = uploadedArtworkDataUrl;
            uploadBox.style.display = 'none';
            imagePreview.classList.remove('hidden');
            imagePreview.classList.add('block');
            
            // Adicionar botão de remover imagem
            updateImagePreviewControls();
        }
    };
    reader.readAsDataURL(file);
}

function updateImagePreviewControls() {
    const imagePreview = document.getElementById('imagePreview');
    
    // Remover controles antigos se existirem
    const existingControls = imagePreview.querySelector('.image-preview-controls');
    if (existingControls) {
        existingControls.remove();
    }
    
    // Criar container de controles
    const controls = document.createElement('div');
    controls.className = 'image-preview-controls absolute top-0 right-0 flex gap-2 p-3';
    controls.innerHTML = `
        <button type="button" class="btn btn-sm bg-[#c9481d] text-white hover:bg-[#a83517] rounded-lg px-3 py-1.5 inline-flex items-center gap-2 text-xs font-medium transition" onclick="changeArtworkImage(); event.preventDefault(); event.stopPropagation();">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Trocar Imagem
        </button>
        <button type="button" class="btn btn-sm bg-red-500/20 text-red-600 hover:bg-red-500/30 rounded-lg px-3 py-1.5 inline-flex items-center gap-2 text-xs font-medium transition" onclick="removeArtworkImage(); event.preventDefault(); event.stopPropagation();">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
            Remover
        </button>
    `;
    
    imagePreview.style.position = 'relative';
    imagePreview.appendChild(controls);
}

function changeArtworkImage() {
    const obraFile = document.getElementById('obraFile');
    if (obraFile) {
        obraFile.click();
    }
}

function removeArtworkImage() {
    uploadedArtworkDataUrl = null;
    
    const imagePreview = document.getElementById('imagePreview');
    const uploadBox = document.getElementById('uploadBox');
    const obraFile = document.getElementById('obraFile');
    
    if (imagePreview) {
        imagePreview.classList.add('hidden');
        imagePreview.classList.remove('block');
    }
    if (uploadBox) uploadBox.style.display = '';
    if (obraFile) obraFile.value = '';
    
    if (typeof showToast === 'function') {
        showToast('Imagem removida', 'Você pode adicionar outra imagem', 'info');
    }
}

async function handleObraSubmit(e) {
    e.preventDefault();
    
    try {
        const publishType = document.querySelector('input[name="publishType"]:checked').value;
        const obraTitle = document.getElementById('obraTitle').value.trim();
        const obraCategory = document.getElementById('obraCategory').value;
        
        // Validações básicas
        if (!obraTitle) {
            if (typeof showToast === 'function') {
                showToast('Erro', 'Preencha o título da obra', 'error');
            }
            return;
        }
        
        if (!obraCategory) {
            if (typeof showToast === 'function') {
                showToast('Erro', 'Selecione uma categoria', 'error');
            }
            return;
        }

        if (!uploadedArtworkDataUrl) {
            if (typeof showToast === 'function') {
                showToast('Aviso', 'Adicione uma imagem para sua obra', 'info');
            }
            // Continua mesmo sem imagem (usa placeholder), mas avisa
        }
        
        const formData = {
            title: obraTitle,
            category: obraCategory,
            description: document.getElementById('obraDescription').value.trim(),
            software: document.getElementById('obraSoftware').value.trim(),
            tags: document.getElementById('obraTags').value.split(',').map(tag => tag.trim()).filter(tag => tag),
            isForSale: publishType === 'venda'
        };

        // Price only required if for sale
        if (formData.isForSale) {
            const price = parseFloat(document.getElementById('obraPrice').value);
            if (isNaN(price) || price < 0) {
                if (typeof showToast === 'function') {
                    showToast('Erro', 'Preço inválido', 'error');
                }
                return;
            }
            if (price < 50) {
                if (typeof showToast === 'function') {
                    showToast('Aviso', 'Preço recomendado: mínimo R$ 50,00', 'warning');
                }
            }
            formData.price = price;
        } else {
            formData.price = 0;
        }

        // Use uploaded data URL if available, otherwise fallback to placeholder
        formData.imageUrl = uploadedArtworkDataUrl || "https://via.placeholder.com/800x600";

        // Cria obra
        await window.artworkService.createArtwork(userData.id, formData);
        
        // Recarrega dados
        await loadData();
        
        // Fecha modal
        closeObraDialog();
        uploadedArtworkDataUrl = null;
        
        if (typeof showToast === 'function') {
            showToast('Sucesso!', 'Sua obra foi publicada com sucesso', 'success');
        }

    } catch (error) {
        console.error('Erro ao adicionar obra:', error);
        if (typeof showToast === 'function') {
            showToast('Erro', 'Não foi possível publicar a obra', 'error');
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
// MODAL - EDIT PROFILE
// ========================================

function openEditProfileDialog() {
    const modal = document.getElementById('editProfileModal');
    if (!modal) return;

    const bioEl = document.getElementById('editBio');
    const cityEl = document.getElementById('editCity');
    const avatarImg = document.getElementById('editAvatarImg');
    const bannerPreview = document.getElementById('editBannerPreview');
    const bannerImgEl = document.querySelector('.profile-banner-image');

    if (bioEl) bioEl.value = (userData?.profileData && userData.profileData.biografia) || (userData.biografia) || '';
    if (cityEl) cityEl.value = (userData?.profileData && userData.profileData.cidade) || (userData.cidade) || '';
    if (avatarImg) avatarImg.src = userData?.avatar || avatarImg.src;
    if (bannerPreview && bannerImgEl) {
        const inner = bannerPreview.querySelector('div');
        if (inner) inner.style.backgroundImage = `url('${bannerImgEl.src}')`;
    }

    // Popula as badges
    const badges = (userData?.badges && Array.isArray(userData.badges)) ? userData.badges : [];
    for (let i = 1; i <= 3; i++) {
        const badgeEl = document.getElementById(`editBadge${i}`);
        if (badgeEl) {
            badgeEl.value = badges[i - 1] || '';
        }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEditProfileDialog() {
    const modal = document.getElementById('editProfileModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        if (!file) return resolve(null);
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function handleEditProfileSubmit(e) {
    e.preventDefault();
    try {
        const bannerFile = document.getElementById('editBannerFile')?.files?.[0];
        const avatarFile = document.getElementById('editAvatarFile')?.files?.[0];
        const bio = document.getElementById('editBio')?.value || '';
        const city = document.getElementById('editCity')?.value || '';

        // Coleta as badges
        const badges = [];
        for (let i = 1; i <= 3; i++) {
            const badge = document.getElementById(`editBadge${i}`)?.value?.trim();
            if (badge) {
                badges.push(badge);
            }
        }

        const bannerData = await readFileAsDataUrl(bannerFile);
        const avatarData = await readFileAsDataUrl(avatarFile);

        const updatePayload = {};
        if (avatarData) updatePayload.avatar = avatarData;
        updatePayload.profileData = { biografia: bio, cidade: city };
        updatePayload.badges = badges;
        if (bannerData) updatePayload.profileData.banner = bannerData;

        await window.userService.updateUser(userData.id, updatePayload);

        // reload userData and persist locally
        userData = await window.userService.getUser(userData.id);
        localStorage.setItem('userData', JSON.stringify(userData));

        // update UI immediately
        if (avatarData) {
            const avatar = document.getElementById('profileAvatar');
            if (avatar) avatar.src = avatarData;
        }
        if (bannerData) {
            const banner = document.querySelector('.profile-banner-image');
            if (banner) banner.src = bannerData;
        }
        const bioEl = document.getElementById('profileBio');
        if (bioEl) bioEl.textContent = userData.profileData?.biografia || '';
        const cityEl = document.getElementById('profileCity');
        if (cityEl) {
            const icon = cityEl.querySelector('i');
            cityEl.innerHTML = '';
            if (icon) cityEl.appendChild(icon);
            const textNode = document.createTextNode(' ' + (userData.profileData?.cidade || ''));
            cityEl.appendChild(textNode);
        }

        // Atualiza as badges na UI
        const profileRoleDiv = document.querySelector('.profile-role');
        if (profileRoleDiv) {
            if (badges && badges.length > 0) {
                profileRoleDiv.innerHTML = badges.map(badge => `<span class="role-badge">${badge}</span>`).join('');
            } else {
                profileRoleDiv.innerHTML = '<span class="role-badge">Artista Digital</span>';
            }
        }

        // close modal and refresh dashboard data
        closeEditProfileDialog();
        await loadData();

        if (typeof showToast === 'function') showToast('Perfil atualizado', 'Suas alterações foram salvas', 'success');
    } catch (err) {
        console.error('Erro ao atualizar perfil:', err);
        if (typeof showToast === 'function') showToast('Erro', 'Não foi possível atualizar o perfil', 'error');
    }
}

// expose helper and modal handlers globally so other scripts can call them if needed
window.openEditProfileDialog = openEditProfileDialog;
window.closeEditProfileDialog = closeEditProfileDialog;
window.handleEditProfileSubmit = handleEditProfileSubmit;

// bind events for file previews and form on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('editProfileBtn');
    if (btn) btn.addEventListener('click', openEditProfileDialog);

    const editForm = document.getElementById('editProfileForm');
    if (editForm) editForm.addEventListener('submit', handleEditProfileSubmit);

    const bannerFile = document.getElementById('editBannerFile');
    if (bannerFile) {
        bannerFile.addEventListener('change', () => {
            const f = bannerFile.files[0];
            if (!f) return;
            const r = new FileReader();
            r.onload = () => {
                const previewDiv = document.querySelector('#editBannerPreview div');
                if (previewDiv) previewDiv.style.backgroundImage = `url('${r.result}')`;
            };
            r.readAsDataURL(f);
        });
    }

    const avatarFile = document.getElementById('editAvatarFile');
    if (avatarFile) {
        avatarFile.addEventListener('change', () => {
            const f = avatarFile.files[0];
            if (!f) return;
            const r = new FileReader();
            r.onload = () => {
                const img = document.getElementById('editAvatarImg');
                if (img) img.src = r.result;
            };
            r.readAsDataURL(f);
        });
    }
});

// ========================================
// HANDLERS
// ========================================

async function handleRemoveFavorito(obraId) {
    try {
            const result = await window.artworkService.toggleFavorite(userData.id, obraId);
            if (!result.added) {
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
        // attempt to extract a likes/curtidas count from multiple possible API shapes
        const likesRaw = a.curtidas || a.likes || (a.stats && (a.stats.likes || a.stats.likes_count)) || a.likeCount || a.likesCount || 0;
        const likes = Number(likesRaw || 0);

        return {
            id: a.id || a.id,
            title: a.titulo || a.title || '',
            imageUrl: a.imagemUrl || a.imageUrl || '',
            price: typeof a.preco !== 'undefined' ? Number(a.preco) : (typeof a.price !== 'undefined' ? Number(a.price) : 0),
            category: a.categoria || a.category || '',
            artist: a.artistaNome || a.artist || userData.name || userData.nome || '',
            likes: likes
            };
        };

        const normalizedPortfolio = (portfolio || []).map(normalizeArtwork).filter(Boolean);

        // If the service exposes a favorites count, fetch likes per artwork so stats are accurate
        if (window.artworkService && typeof window.artworkService.getFavoritesCount === 'function') {
            try {
                const counts = await Promise.all(normalizedPortfolio.map(async (art) => {
                    try {
                        const c = await window.artworkService.getFavoritesCount(art.id);
                        return Number(c || 0);
                    } catch (err) {
                        return 0;
                    }
                }));

                normalizedPortfolio.forEach((art, idx) => {
                    art.likes = counts[idx] || 0;
                });
            } catch (err) {
                // ignore: we'll fallback to likes present on artwork objects if any
                console.warn('Não foi possível recuperar contagens de favoritos por obra:', err);
            }
        }

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
    if (avatar) {
        if (userData.avatar) {
            avatar.src = userData.avatar;
        } else {
            avatar.src = 'https://i.pravatar.cc/150?img=7'; // fallback avatar
        }
        avatar.alt = userData.nome || userData.name || 'Usuário';
    }

    // Nome
    const name = document.getElementById('profileName');
    if (name) {
        name.textContent = userData.nome || userData.name || 'Usuário';
    }

    // Banner (artist profile banner may be stored in profileData.banner or userData.banner)
    const banner = document.querySelector('.profile-banner-image');
    if (banner) {
        const bannerSrc = (userData && userData.profileData && userData.profileData.banner) || userData.banner || banner.src;
        if (bannerSrc) banner.src = bannerSrc;
    }

    // Biografia
    const bioEl = document.getElementById('profileBio');
    if (bioEl) {
        bioEl.textContent = (userData && userData.profileData && userData.profileData.biografia) || userData.biografia || bioEl.textContent || '';
    }

    // Cidade (mantendo o ícone se presente)
    const cityEl = document.getElementById('profileCity');
    if (cityEl) {
        const icon = cityEl.querySelector('i');
        cityEl.innerHTML = '';
        if (icon) cityEl.appendChild(icon);
        const cityText = document.createTextNode(' ' + ((userData && userData.profileData && userData.profileData.cidade) || userData.cidade || ''));
        cityEl.appendChild(cityText);
    }

    // Badges/Tags
    const profileRoleDiv = document.querySelector('.profile-role');
    if (profileRoleDiv) {
        if (userData.badges && Array.isArray(userData.badges) && userData.badges.length > 0) {
            profileRoleDiv.innerHTML = userData.badges.map(badge => `<span class="role-badge">${badge}</span>`).join('');
        } else {
            profileRoleDiv.innerHTML = '<span class="role-badge">Artista Digital</span>';
        }
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

// Debounce helper to avoid rapid reloads
function debounce(fn, wait = 200) {
    let t;
    return function(...args) {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}

// Expose a refresh hook so other pages (e.g. explorar) can notify this dashboard
// that artworks changed (e.g., likes were toggled). Call `window.refreshArtistStats()`
// after a like/unlike action in another page, or set localStorage key 'artwork-updated'.
window.refreshArtistStats = async function() {
    try {
        await loadData();
    } catch (err) {
        console.error('Erro ao atualizar estatísticas:', err);
    }
};

const debouncedLoadData = debounce(() => {
    // only reload when page is visible (avoid background churn)
    if (document.visibilityState === 'visible') {
        loadData().catch(err => console.error('Erro no reload debounced:', err));
    }
}, 300);

// If another tab/page updates artworks, it can write localStorage.setItem('artwork-updated', Date.now())
// which triggers this handler and refreshes data.
window.addEventListener('storage', (e) => {
    if (!e) return;
    if (e.key === 'artwork-updated') {
        debouncedLoadData();
    }
});

// Also refresh when user focuses or returns to the tab
window.addEventListener('focus', debouncedLoadData);
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') debouncedLoadData();
});

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
        
        // Inicializa listeners do formulário de obra
        setupObraFormListeners();
        
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
window.togglePublishType = togglePublishType;
window.handleImageUpload = handleImageUpload;
window.changeArtworkImage = changeArtworkImage;
window.removeArtworkImage = removeArtworkImage;
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
