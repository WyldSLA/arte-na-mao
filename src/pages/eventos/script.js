// ========================================
// AUTENTICAÇÃO: BLOQUEIO DE ACESSO
// ========================================
(function() {
    const user = (function() {
        try { return JSON.parse(localStorage.getItem('userData') || 'null'); } catch(e){ return null; }
    })();
    if (!user || !user.id) {
        window.location.href = '../../../public/login.html';
    }
})();

// ========================================
// CONFIGURAÇÃO E CONSTANTES
// ========================================

let currentFilter = 'todos';
let allEvents = [];

// Mock data - será substituído pela chamada real à API
const mockEvents = [
    {
        id: "1",
        title: "Festival de Arte Popular do Sertão",
        imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
        date: "15 de Dezembro, 2025 - 18:00",
        location: "Recife, PE",
        attendees: 234,
        description: "Celebração da arte popular nordestina com exposições, performances ao vivo e oficinas interativas.",
        category: "festivais"
    },
    {
        id: "2",
        title: "Mostra de Fotografia Contemporânea",
        imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop",
        date: "22 de Dezembro, 2025 - 19:00",
        location: "Salvador, BA",
        attendees: 156,
        description: "Exposição coletiva de fotógrafos nordestinos explorando temas contemporâneos e identidade regional.",
        category: "exposicoes"
    },
    {
        id: "3",
        title: "Encontro de Artesãos e Designers",
        imageUrl: "https://images.unsplash.com/photo-1471666875520-c75081f42081?w=800&h=600&fit=crop",
        date: "5 de Janeiro, 2026 - 14:00",
        location: "Fortaleza, CE",
        attendees: 189,
        description: "Networking e trocas entre artesãos tradicionais e designers contemporâneos do Nordeste.",
        category: "workshops"
    },
    {
        id: "4",
        title: "Bienal de Arte Nordestina",
        imageUrl: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&h=600&fit=crop",
        date: "20 de Janeiro, 2026 - 10:00",
        location: "Natal, RN",
        attendees: 567,
        description: "Grande evento bienal reunindo artistas de todos os estados do Nordeste com curadoria internacional.",
        category: "exposicoes"
    },
];

// ========================================
// FUNÇÕES DE API
// ========================================

/**
 * Busca eventos da API
 */
async function fetchEvents() {
    try {
        if (window.eventService && typeof window.eventService.listEvents === 'function') {
            // Carrega eventos do serviço
            const events = await window.eventService.listEvents();
            
            // Normaliza dados
            const normalizedEvents = events.map(ev => ({
                id: ev.id,
                title: ev.titulo || ev.title || '',
                imageUrl: ev.imagemUrl || ev.imageUrl || '',
                date: ev.data ? new Date(ev.data).toLocaleString('pt-BR', { 
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }) : '',
                location: ev.local || ev.location || '',
                attendees: ev.participantes || 0,
                description: ev.descricao || ev.description || '',
                category: ev.categoria || ev.category || 'outros'
            }));

            // Se tiver eventos reais, retorna apenas eles
            if (normalizedEvents.length > 0) {
                return normalizedEvents;
            }
        }
        
        // Fallback para mock se serviço não disponível ou sem eventos
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockEvents.map(mock => ({
            ...mock,
            isDemo: true // Marca eventos de exemplo
        }));
    } catch (error) {
        console.error('Erro ao buscar eventos:', error);
        throw error;
    }
}

/**
 * Confirma presença em um evento
 */
async function attendEvent(eventId) {
    try {
        // TODO: Substituir por chamada real à API
        // Mock
        console.log(`Confirmando presença no evento ${eventId}`);
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true };
    } catch (error) {
        console.error('Erro ao confirmar presença:', error);
        throw error;
    }
}

// ========================================
// FUNÇÕES DE RENDERIZAÇÃO
// ========================================

/**
 * Cria um card de evento
 */
function createEventCard(event, index) {
    const card = document.createElement('article');
    card.className = 'event-card';
    card.style.animationDelay = `${index * 100}ms`;
    card.dataset.category = event.category || 'outros';
    
    card.innerHTML = `
        <div class="event-card-image-container">
            <img src="${event.imageUrl}" alt="${event.title}" class="event-card-image">
        </div>
        
        <div class="event-card-content">
            <div>
                <div class="event-card-header">
                    <h3 class="event-card-title">${event.title}</h3>
                    ${event.description ? `
                        <p class="event-card-description">${event.description}</p>
                    ` : ''}
                </div>
                
                <div class="event-card-info">
                    <div class="event-info-item">
                        <svg class="event-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        <span>${event.date}</span>
                    </div>
                    
                    <div class="event-info-item">
                        <svg class="event-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span>${event.location}</span>
                    </div>
                    
                    <div class="event-info-item">
                        <svg class="event-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        <span>${event.attendees} interessados</span>
                    </div>
                </div>
            </div>
            
            <div class="event-card-actions">
                ${event.isDemo ? `
                    <div class="event-demo-badge" style="
                        background: var(--muted);
                        color: var(--muted-foreground);
                        padding: 0.5rem;
                        text-align: center;
                        border-radius: var(--radius);
                        font-size: 0.875rem;
                    ">
                        Evento Demonstrativo
                    </div>
                ` : `
                    <button class="btn btn-primary" onclick="viewEventDetails('${event.id}')">
                        Ver Detalhes
                    </button>
                    <button class="btn btn-outline" onclick="handleAttendEvent('${event.id}')">
                        Confirmar Presença
                    </button>
                `}
            </div>
        </div>
    `;
    
    return card;
}

/**
 * Renderiza a lista de eventos
 */
function renderEvents(events) {
    const eventsList = document.getElementById('eventsList');
    const eventsEmpty = document.getElementById('eventsEmpty');
    
    // Limpa a lista
    eventsList.innerHTML = '';
    
    if (events.length === 0) {
        eventsList.style.display = 'none';
        eventsEmpty.style.display = 'block';
        return;
    }
    
    eventsList.style.display = 'flex';
    eventsEmpty.style.display = 'none';
    
    events.forEach((event, index) => {
        const card = createEventCard(event, index);
        eventsList.appendChild(card);
    });
}

// ========================================
// FILTROS
// ========================================

/**
 * Filtra eventos por categoria
 */
function filterEvents(category) {
    currentFilter = category;
    
    // Atualiza botões ativos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[data-filter="${category}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    // Filtra e renderiza eventos
    let filteredEvents = allEvents;
    
    if (category !== 'todos') {
        filteredEvents = allEvents.filter(event => 
            event.category === category
        );
    }
    
    renderEvents(filteredEvents);
}

// ========================================
// HANDLERS DE EVENTOS
// ========================================

/**
 * Visualiza detalhes do evento
 */
function viewEventDetails(eventId) {
    // Verifica se é um evento demonstrativo
    const event = allEvents.find(e => e.id === eventId);
    if (event?.isDemo) {
        if (typeof showToast === 'function') {
            showToast(
                'Evento demonstrativo',
                'Este evento é apenas um exemplo para demonstração',
                'info'
            );
        }
        return;
    }
    
    // TODO: Implementar página de detalhes ou modal
    console.log(`Ver detalhes do evento ${eventId}`);
    
    // Opção 1: Redirecionar para página de detalhes
    // window.location.href = `event-details.html?id=${eventId}`;
    
    // Opção 2: Abrir modal com detalhes
    // showEventModal(eventId);
    
    // Por enquanto, apenas alerta
    if (typeof showToast === 'function') {
    showToast(
        'Funcionalidade em desenvolvimento', 
        '"Ver Detalhes" será implementada em breve.', 
        'info');
    }
}

/**
 * Confirma presença em um evento
 */
async function handleAttendEvent(eventId) {
    // Verifica se é um evento demonstrativo
    const event = allEvents.find(e => e.id === eventId);
    if (event?.isDemo) {
        if (typeof showToast === 'function') {
            showToast(
                'Evento demonstrativo',
                'Este evento é apenas um exemplo para demonstração',
                'info'
            );
        }
        return;
    }

    // Verifica se usuário está logado
    showToast(
        'Funcionalidade em desenvolvimento', 
        '"Confirmar Presença" será implementada em breve.', 
        'info');
    
    try {
        // Desabilita o botão temporariamente
        const button = event.target;
        const originalText = button.textContent;
        button.disabled = true;
        button.textContent = 'Confirmando...';
        
        await attendEvent(eventId);
        
        if (typeof showToast === 'function') {
            showToast(
                'Presença confirmada!',
                'Você receberá mais informações por e-mail',
                'success'
            );
        }
        
        button.textContent = '✓ Confirmado';
        
        // Opcional: atualizar contador de interessados
        const event = allEvents.find(e => e.id === eventId);
        if (event) {
            event.attendees++;
            // Re-renderizar apenas esse card ou atualizar o número
        }
        
    } catch (error) {
        /* if (typeof showToast === 'function') {
            showToast(
                'Erro ao confirmar presença',
                'Tente novamente mais tarde',
                'error'
            );
        } */

        button.disabled = false;
        button.textContent = originalText;
    }
}

// ========================================
// INICIALIZAÇÃO
// ========================================

/**
 * Inicializa a página de eventos
 */
async function initEvents() {
    try {
        showLoading();
        
        // Busca eventos da API
        allEvents = await fetchEvents();
        
        // Renderiza eventos
        renderEvents(allEvents);
        
    } catch (error) {
        console.error('Erro ao inicializar página:', error);
        
        const eventsList = document.getElementById('eventsList');
        eventsList.innerHTML = `
            <div class="events-empty">
                <p>Erro ao carregar eventos. Por favor, tente novamente mais tarde.</p>
            </div>
        `;
    }
}

// Torna funções disponíveis globalmente
window.filterEvents = filterEvents;
window.viewEventDetails = viewEventDetails;
window.handleAttendEvent = handleAttendEvent;

// Executa quando o DOM estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEvents);
} else {
    initEvents();
}