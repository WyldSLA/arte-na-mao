// ========================================
// DASHBOARD-ARTIST.JS - Lógica do Dashboard do Artista
// ========================================

// ========================================
// ESTADO DA APLICAÇÃO
// ========================================

let artistData = {
    obras: [],
    eventos: [],
    artistId: 'artist1' // ID do artista logado
};

let editingObra = null; // Obra sendo editada (null = nova obra)

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
        artistId: "artist1"
    },
    {
        id: "2",
        title: "Horizonte Atlântico",
        category: "Fotografia",
        imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=1200&fit=crop",
        price: 2200.00,
        artistId: "artist1"
    }
];

const mockEventos = [
    {
        id: "1",
        title: "Festival de Arte Popular",
        imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
        date: "15/12/2025",
        location: "Recife, PE",
        attendees: 234,
        artistId: "artist1"
    }
];

// ========================================
// FUNÇÕES DE API
// ========================================

/**
 * Carrega dados do artista
 * Spring Boot: GET /api/artist/data
 */
async function loadArtistData() {
    try {
        // TODO: Substituir por chamada real
        // const response = await fetch('/api/artist/data', {
        //     headers: { 'Authorization': `Bearer ${getAuthToken()}` }
        // });
        // const data = await response.json();
        
        // Mock
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            obras: mockObras,
            eventos: mockEventos
        };
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        throw error;
    }
}

/**
 * Salva uma obra (criar ou atualizar)
 * Spring Boot: POST /api/obras (criar) ou PUT /api/obras/{id} (atualizar)
 */
async function saveObra(obra) {
    try {
        // TODO: Substituir por chamada real
        // const method = obra.id ? 'PUT' : 'POST';
        // const url = obra.id ? `/api/obras/${obra.id}` : '/api/obras';
        // const response = await fetch(url, {
        //     method: method,
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${getAuthToken()}`
        //     },
        //     body: JSON.stringify(obra)
        // });
        // return await response.json();
        
        // Mock
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (!obra.id) {
            obra.id = Date.now().toString();
            obra.artistId = artistData.artistId;
        }
        
        return obra;
    } catch (error) {
        console.error('Erro ao salvar obra:', error);
        throw error;
    }
}

/**
 * Deleta uma obra
 * Spring Boot: DELETE /api/obras/{id}
 */
async function deleteObra(obraId) {
    try {
        // TODO: Substituir por chamada real
        // await fetch(`/api/obras/${obraId}`, {
        //     method: 'DELETE',
        //     headers: { 'Authorization': `Bearer ${getAuthToken()}` }
        // });
        
        // Mock
        await new Promise(resolve => setTimeout(resolve, 300));
        return { success: true };
    } catch (error) {
        console.error('Erro ao deletar obra:', error);
        throw error;
    }
}

// ========================================
// RENDERIZAÇÃO - STATS
// ========================================

/**
 * Atualiza cards de estatísticas
 */
function updateStats() {
    const minhasObras = artistData.obras.filter(o => o.artistId === artistData.artistId);
    const meusEventos = artistData.eventos.filter(e => e.artistId === artistData.artistId);
    
    document.getElementById('totalObras').textContent = minhasObras.length;
    document.getElementById('totalEventos').textContent = meusEventos.length;
}

// ========================================
// RENDERIZAÇÃO - OBRAS
// ========================================

/**
 * Renderiza obras do artista
 */
function renderObras() {
    const container = document.getElementById('obrasContainer');
    const minhasObras = artistData.obras.filter(o => o.artistId === artistData.artistId);
    
    // Empty state
    if (minhasObras.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <p>Você ainda não adicionou nenhuma obra</p>
                <button class="btn btn-primary" onclick="openAddObraDialog()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Adicionar Primeira Obra
                </button>
            </div>
        `;
        return;
    }
    
    // Renderiza grid
    container.innerHTML = `
        <div class="obras-grid">
            ${minhasObras.map(obra => createArtistObraCard(obra)).join('')}
        </div>
    `;
    
    // Adiciona event listeners
    minhasObras.forEach(obra => {
        const editBtn = document.querySelector(`[data-edit-obra="${obra.id}"]`);
        const deleteBtn = document.querySelector(`[data-delete-obra="${obra.id}"]`);
        
        if (editBtn) {
            editBtn.addEventListener('click', () => handleEditObra(obra));
        }
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => handleDeleteObra(obra.id));
        }
    });
}

/**
 * Cria card de obra do artista (com overlay de edição)
 */
function createArtistObraCard(obra) {
    return `
        <div class="obra-card">
            <div class="obra-card-image-wrapper">
                <img src="${obra.imageUrl}" alt="${obra.title}" class="obra-card-image">
                <div class="obra-card-overlay">
                    <button class="btn btn-secondary btn-icon" data-edit-obra="${obra.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                    <button class="btn btn-destructive btn-icon" data-delete-obra="${obra.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="obra-card-content">
                <h3 class="obra-card-title">${obra.title}</h3>
                <p class="obra-card-artist">${obra.category}</p>
                <span class="obra-card-price">R$ ${formatPrice(obra.price)}</span>
            </div>
        </div>
    `;
}

// ========================================
// RENDERIZAÇÃO - EVENTOS
// ========================================

/**
 * Renderiza eventos do artista
 */
function renderEventos() {
    const container = document.getElementById('eventosContainer');
    const meusEventos = artistData.eventos.filter(e => e.artistId === artistData.artistId);
    
    // Empty state
    if (meusEventos.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <p>Você ainda não criou nenhum evento</p>
            </div>
        `;
        return;
    }
    
    // Renderiza grid
    container.innerHTML = `
        <div class="eventos-artist-grid">
            ${meusEventos.map(evento => createEventoCardHorizontal(evento)).join('')}
        </div>
    `;
}

/**
 * Cria card horizontal de evento
 */
function createEventoCardHorizontal(evento) {
    return `
        <div class="evento-card-horizontal">
            <div class="evento-card-horizontal-content">
                <img src="${evento.imageUrl}" alt="${evento.title}" class="evento-card-horizontal-image">
                <div class="evento-card-horizontal-info">
                    <h3 class="evento-card-horizontal-title">${evento.title}</h3>
                    <p class="evento-card-horizontal-location">${evento.location}</p>
                    <div class="evento-card-horizontal-meta">
                        <span class="evento-card-horizontal-date">${evento.date}</span>
                        <span class="evento-card-horizontal-attendees">${evento.attendees} interessados</span>
                    </div>
                </div>
            </div>
        </div>
    `;
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
// MODAL - ADICIONAR/EDITAR OBRA
// ========================================

/**
 * Abre dialog para adicionar obra
 */
function openAddObraDialog() {
    editingObra = null;
    document.getElementById('modalTitle').textContent = 'Adicionar Obra';
    document.getElementById('obraForm').reset();
    document.getElementById('obraId').value = '';
    
    const modal = document.getElementById('obraModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Foca no primeiro campo
    setTimeout(() => {
        document.getElementById('obraTitle').focus();
    }, 100);
}

/**
 * Abre dialog para editar obra
 */
function handleEditObra(obra) {
    editingObra = obra;
    document.getElementById('modalTitle').textContent = 'Editar Obra';
    
    // Preenche o formulário
    document.getElementById('obraId').value = obra.id;
    document.getElementById('obraTitle').value = obra.title;
    document.getElementById('obraCategory').value = obra.category;
    document.getElementById('obraPrice').value = obra.price;
    document.getElementById('obraImageUrl').value = obra.imageUrl;
    document.getElementById('obraDescription').value = obra.description || '';
    
    const modal = document.getElementById('obraModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Fecha o dialog
 */
function closeObraDialog() {
    const modal = document.getElementById('obraModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Limpa formulário e estado
    document.getElementById('obraForm').reset();
    editingObra = null;
    clearFormErrors();
}

/**
 * Limpa erros do formulário
 */
function clearFormErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(el => el.textContent = '');
    
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.classList.remove('error');
        input.setAttribute('aria-invalid', 'false');
    });
}

/**
 * Valida formulário de obra
 */
function validateObraForm(formData) {
    const errors = {};
    
    if (!formData.title || formData.title.trim() === '') {
        errors.obraTitle = 'Título é obrigatório';
    }
    
    if (!formData.category) {
        errors.obraCategory = 'Selecione uma categoria';
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
        errors.obraPrice = 'Preço deve ser maior que zero';
    }
    
    if (!formData.imageUrl || formData.imageUrl.trim() === '') {
        errors.obraImageUrl = 'URL da imagem é obrigatória';
    } else if (!/^https?:\/\/.+/.test(formData.imageUrl)) {
        errors.obraImageUrl = 'URL inválida';
    }
    
    return errors;
}

/**
 * Exibe erros no formulário
 */
function displayFormErrors(errors) {
    clearFormErrors();
    
    Object.keys(errors).forEach(fieldId => {
        const input = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (input && errorElement) {
            input.classList.add('error');
            input.setAttribute('aria-invalid', 'true');
            errorElement.textContent = errors[fieldId];
        }
    });
}

/**
 * Submete formulário de obra
 */
async function handleObraFormSubmit(event) {
    event.preventDefault();
    
    // Coleta dados do formulário
    const form = event.target;
    const formData = {
        id: form.obraId.value || null,
        title: form.obraTitle.value.trim(),
        category: form.obraCategory.value,
        price: parseFloat(form.obraPrice.value),
        imageUrl: form.obraImageUrl.value.trim(),
        description: form.obraDescription.value.trim()
    };
    
    // Valida
    const errors = validateObraForm(formData);
    if (Object.keys(errors).length > 0) {
        displayFormErrors(errors);
        return;
    }
    
    // Desabilita botão
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Salvando...';
    
    try {
        // Salva via API
        const savedObra = await saveObra(formData);
        
        // Atualiza estado local
        if (editingObra) {
            // Atualiza obra existente
            artistData.obras = artistData.obras.map(o => 
                o.id === savedObra.id ? savedObra : o
            );
            showToast('Obra atualizada!', 'As alterações foram salvas com sucesso', 'success');
        } else {
            // Adiciona nova obra
            artistData.obras.push(savedObra);
            showToast('Obra adicionada!', 'Sua obra foi publicada com sucesso', 'success');
        }
        
        // Re-renderiza
        updateStats();
        renderObras();
        
        // Fecha modal
        closeObraDialog();
        
    } catch (error) {
        showToast('Erro', 'Não foi possível salvar a obra', 'error');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

// ========================================
// HANDLERS - DELETAR OBRA
// ========================================

/**
 * Deleta uma obra
 */
async function handleDeleteObra(obraId) {
    // Confirmação
    if (!confirm('Tem certeza que deseja remover esta obra?')) {
        return;
    }
    
    try {
        await deleteObra(obraId);
        
        // Atualiza estado local
        artistData.obras = artistData.obras.filter(o => o.id !== obraId);
        
        // Re-renderiza
        updateStats();
        renderObras();
        
        showToast('Obra removida', 'A obra foi removida com sucesso', 'success');
        
    } catch (error) {
        showToast('Erro', 'Não foi possível remover a obra', 'error');
    }
}

// ========================================
// UTILIDADES
// ========================================

/**
 * Formata preço
 */
function formatPrice(price) {
    return price.toLocaleString('pt-BR', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    });
}

/**
 * Toast notification
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
async function initDashboardArtist() {
    try {
        // Carrega dados
        const data = await loadArtistData();
        artistData.obras = data.obras;
        artistData.eventos = data.eventos;

        initFileUpload()
        
        // Renderiza
        updateStats();
        renderObras();
        renderEventos();
        
        // Event listener do formulário
        const form = document.getElementById('obraForm');
        form.addEventListener('submit', handleObraFormSubmit);
        
        // Fecha modal ao clicar fora
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modal = document.getElementById('obraModal');
                if (modal.classList.contains('active')) {
                    closeObraDialog();
                }
            }
        });
        
    } catch (error) {
        console.error('Erro ao inicializar dashboard:', error);
        showToast('Erro', 'Não foi possível carregar seus dados', 'error');
    }
}

// Torna funções disponíveis globalmente
window.openAddObraDialog = openAddObraDialog;
window.closeObraDialog = closeObraDialog;
window.checkPreviews = checkPreviews;

// Executa quando o DOM estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboardArtist);
} else {
    initDashboardArtist();
}