
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

let currentPage = 0;
let isLoading = false;
let allArtworks = []; // Armazena todas as obras para busca
let searchActive = false; // Indica se há uma busca ativa
let filteredArtworks = []; // Armazena obras filtradas pela busca
let currentSection = 'trending'; // Seção ativa: trending, recent, community
let currentTimeFilter = 'all'; // Filtro de período: all, today, week, month, year
let currentCategoryFilter = 'all'; // Filtro de categoria

// Mock data - Dados simulados das obras
const mockArtworks = [
    {
        id: "1",
        imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=1200&fit=crop",
        title: "Sertão em Cores — Série Nordeste Vibrante",
        artistName: "Maria Oliveira",
        artistPhoto: "https://i.pravatar.cc/150?img=1",
        price: 145,
        likes: 234,
        category: "Pintura",
        dataCriacao: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: "2",
        imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=1200&fit=crop",
        title: "Mandacaru",
        artistName: "João Santos",
        artistPhoto: "https://i.pravatar.cc/150?img=12",
        price: 225,
        likes: 156,
        category: "Escultura",
        dataCriacao: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: "3",
        imageUrl: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=1200&fit=crop",
        title: "Cultura Popular — Festa Junina",
        artistName: "Ana Costa",
        artistPhoto: "https://i.pravatar.cc/150?img=5",
        price: 109,
        likes: 421,
        category: "Arte Digital",
        dataCriacao: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: "4",
        imageUrl: "https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=1080&h=1200&fit=crop",
        title: "Retratos do Sertão",
        artistName: "Paulo Almeida",
        artistPhoto: "https://i.pravatar.cc/150?img=13",
        price: 200,
        likes: 189,
        category: "Fotografia",
        dataCriacao: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: "5",
        imageUrl: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&h=1200&fit=crop",
        title: "Cerâmica Artesanal",
        artistName: "Carla Mendes",
        artistPhoto: "https://i.pravatar.cc/150?img=9",
        price: 365,
        likes: 312,
        category: "Artesanato",
        dataCriacao: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: "6",
        imageUrl: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=800&h=1200&fit=crop",
        title: "Paisagem Costeira",
        artistName: "Rafael Lima",
        artistPhoto: "https://i.pravatar.cc/150?img=14",
        price: 220,
        likes: 267,
        category: "Pintura",
        dataCriacao: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: "7",
        imageUrl: "https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800&h=1200&fit=crop",
        title: "Xilogravura Nordestina",
        artistName: "Beatriz Silva",
        artistPhoto: "https://i.pravatar.cc/150?img=10",
        price: 189,
        likes: 445,
        category: "Arte Digital",
        dataCriacao: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: "8",
        imageUrl: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&h=1200&fit=crop",
        title: "Arquitetura Colonial",
        artistName: "Fernando Rocha",
        artistPhoto: "https://i.pravatar.cc/150?img=15",
        price: 220,
        likes: 198,
        category: "Fotografia",
        dataCriacao: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: "9",
        imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=1200&fit=crop",
        title: "Cores do Sertão II",
        artistName: "Maria Oliveira",
        artistPhoto: "https://i.pravatar.cc/150?img=1",
        price: 175,
        likes: 289,
        category: "Pintura",
        dataCriacao: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: "10",
        imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=1200&fit=crop",
        title: "Esculturas Modernas",
        artistName: "João Santos",
        artistPhoto: "https://i.pravatar.cc/150?img=12",
        price: 350,
        likes: 127,
        category: "Escultura",
        dataCriacao: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: "11",
        imageUrl: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=1200&fit=crop",
        title: "Festival de Luzes",
        artistName: "Ana Costa",
        artistPhoto: "https://i.pravatar.cc/150?img=5",
        price: 95,
        likes: 512,
        category: "Arte Digital",
        dataCriacao: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: "12",
        imageUrl: "https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=1080&h=1200&fit=crop",
        title: "Retratos do Povo",
        artistName: "Paulo Almeida",
        artistPhoto: "https://i.pravatar.cc/150?img=13",
        price: 210,
        likes: 176,
        category: "Fotografia",
        dataCriacao: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString()
    },
];

// Estado dos likes (armazenado em memória durante a sessão)
const likedArtworks = new Set();
const likeCounts = {};

// ========================================
// ÍCONES SVG
// ========================================

const icons = {
    heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>`,
    heartFilled: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>`,
    cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="9" cy="21" r="1"/>
        <circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>`
};

// ========================================
// FUNÇÕES DE API
// ========================================

/**
 * Busca obras de arte da API
 */
async function fetchArtworks(page = 0, size = 8) {
    try {
        // Tenta carregar obras do serviço (persistência localStorage)
        if (window.artworkService && typeof window.artworkService.listArtworks === 'function') {
            const all = await window.artworkService.listArtworks({ status: 'DISPONIVEL' });

            // Carrega dados dos artistas uma vez
            let artistsData = {};
            if (window.userService && typeof window.userService.getArtist === 'function') {
                const uniqueArtistIds = [...new Set(all.map(a => a.artistaId))];
                for (const artistId of uniqueArtistIds) {
                    try {
                        const artist = await window.userService.getArtist(artistId);
                        if (artist) artistsData[artistId] = artist;
                    } catch (err) {
                        console.warn(`Não foi possível carregar dados do artista ${artistId}:`, err);
                    }
                }
            }

            // if service returned empty, fallback to mock sample artworks so page isn't empty
            const source = (Array.isArray(all) && all.length > 0) ? all : mockArtworks.map(mock => ({
                ...mock,
                isMockData: true // Marca obras de exemplo
            }));

            // Paginação simples em memória
            const start = page * size;
            const slice = source.slice(start, start + size);

            // Carrega contagem de curtidas (favoritos) para cada obra
            const favoriteCounts = {};
            if (window.artworkService.getFavoritesCount) {
                for (const artwork of slice) {
                    favoriteCounts[artwork.id] = await window.artworkService.getFavoritesCount(artwork.id);
                }
            }
            
            return {
                content: slice.map(a => {
                    // Tenta pegar dados do artista
                    const artist = artistsData[a.artistaId] || {};
                    return {
                        id: a.id,
                        imageUrl: a.imagemUrl || a.imageUrl || '',
                        title: a.titulo || a.title || '',
                        artistId: a.artistaId,
                        artistName: artist.nome || artist.name || a.artistaNome || a.artist || 'Artista',
                        artistPhoto: artist.avatar || artist.photo || a.artistaAvatar || 'https://i.pravatar.cc/150?img=7',
                        price: Number(a.preco || a.price || 0),
                        likes: favoriteCounts[a.id] || 0
                    };
                }),
                page: page,
                totalPages: Math.ceil(all.length / size),
                hasMore: start + size < (Array.isArray(source) ? source.length : 0)
            };
        }

        // Fallback mock - simulando delay de rede
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
            content: mockArtworks,
            page: page,
            totalPages: 3,
            hasMore: page < 2
        };
    } catch (error) {
        console.error('Erro ao buscar obras:', error);
        throw error;
    }
}

// ========================================
// FUNÇÕES DE RENDERIZAÇÃO
// ========================================

/**
 * Cria um card de obra de arte
 */
function createArtCard(artwork, index) {
    const card = document.createElement('article');
    card.className = 'art-card';
    card.style.animationDelay = `${index * 50}ms`;
    
    const isLiked = likedArtworks.has(artwork.id);
    const currentLikes = likeCounts[artwork.id] || artwork.likes || 0;
    
    card.innerHTML = `
        <div class="art-card-image-container" onclick="openArtworkModal('${artwork.id}')" style="cursor: pointer;">
            <img src="${artwork.imageUrl}" alt="${artwork.title}" class="art-card-image">
            
            <div class="art-card-overlay">
                <div class="art-card-overlay-content">
                    <h3 class="art-card-title">${artwork.title}</h3>
                    <p class="art-card-price">${mockArtworks.some(a => a.id === artwork.id) ? 'Demonstrativa' : `R$ ${formatPrice(artwork.price)}`}</p>
                </div>
                <div class="art-card-actions">
                    ${mockArtworks.some(a => a.id === artwork.id) ? '' : `
                        <button class="action-btn" onclick="handleAddToCart('${artwork.id}'); event.stopPropagation();" title="Adicionar ao carrinho">
                            ${icons.cart}
                        </button>
                        <button class="action-btn like-btn ${isLiked ? 'liked' : ''}" data-artwork-id="${artwork.id}" onclick="handleToggleLike('${artwork.id}'); event.stopPropagation();" title="Favoritar">
                            ${isLiked ? icons.heartFilled : icons.heart}
                        </button>
                    `}
                </div>
            </div>
        </div>
        
        <div class="art-card-info">
            <div class="artist-info">
                <img src="${artwork.artistPhoto}" alt="${artwork.artistName}" class="artist-photo">
                <span class="artist-name">${artwork.artistName}</span>
            </div>
            <div class="likes-info">
                ${icons.heart}
                <span class="likes-count" data-artwork-id="${artwork.id}">${currentLikes}</span>
            </div>
        </div>
    `;
    
    return card;
}

// Defensive price formatter used in this page
function formatPrice(price) {
    const p = (typeof price === 'number' && !isNaN(price)) ? price : (price ? Number(price) : 0);
    try {
        return p.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } catch (err) {
        return '0,00';
    }
}

/**
 * Renderiza as obras de arte na grid
 */
function renderArtworks(artworks, append = false) {
    const grid = document.getElementById('artworksGrid');
    
    if (!append) {
        grid.innerHTML = '';
    }
    
    artworks.forEach((artwork, index) => {
        const card = createArtCard(artwork, append ? index : index);
        grid.appendChild(card);
    });
}

// ========================================
// HANDLERS DE EVENTOS
// ========================================

/**
 * Toggle do like na obra
 */
function handleToggleLike(artworkId) {
    // Verifica se é uma obra de exemplo
    const isMockArtwork = mockArtworks.some(a => a.id === artworkId);
    if (isMockArtwork) {
        if (typeof showToast === 'function') {
            showToast('Obra demonstrativa', 'Esta obra é apenas um exemplo e não pode ser favoritada', 'info');
        } else {
            alert('Esta obra é demonstrativa');
        }
        return;
    }

    // If user is logged, persist favorite via service
    const user = (function() {
        try { return JSON.parse(localStorage.getItem('userData') || 'null'); } catch(e){ return null; }
    })();

    if (!user || !user.id) {
        alert('Faça login para favoritar obras');
        return;
    }

    (async () => {
        try {
            const wasLiked = likedArtworks.has(artworkId);
            const res = await window.artworkService.toggleFavorite(user.id, artworkId);
            
            if (res && res.added) {
                likedArtworks.add(artworkId);
            } else {
                likedArtworks.delete(artworkId);
            }

            // Busca contagem real atualizada
            const currentCount = await window.artworkService.getFavoritesCount(artworkId);
            likeCounts[artworkId] = currentCount;

            // Update UI: contador e visual do botão
            const likesElement = document.querySelector(`.likes-count[data-artwork-id="${artworkId}"]`);
            if (likesElement) likesElement.textContent = currentCount;

            // Find the heart button by data attribute and update it
            const likeBtn = document.querySelector(`.like-btn[data-artwork-id="${artworkId}"]`);
            if (likeBtn) {
                const nowLiked = likedArtworks.has(artworkId);
                likeBtn.classList.toggle('liked', nowLiked);
                likeBtn.innerHTML = nowLiked ? icons.heartFilled : icons.heart;
            }

            // Notify other parts of the app (other tabs/pages) that artwork data changed
            try {
                // Cross-tab: set a storage key which dashboard listens to
                localStorage.setItem('artwork-updated', Date.now());
            } catch (err) {
                // ignore storage failures (e.g., private mode)
            }

            // Same-window SPA: directly call the dashboard refresh hook if available
            if (window.refreshArtistStats && typeof window.refreshArtistStats === 'function') {
                try { window.refreshArtistStats(); } catch (err) { /* ignore */ }
            }

        } catch (err) {
            console.error('Erro ao favoritar:', err);
            alert('Não foi possível favoritar. Tente novamente.');
            
            // Reverte estado local em caso de erro
            if (likedArtworks.has(artworkId)) {
                likedArtworks.delete(artworkId);
            } else {
                likedArtworks.add(artworkId);
            }
        }
    })();
}

/**
 * Adiciona obra ao carrinho
 */
function handleAddToCart(artworkId) {
    // Verifica se é uma obra de exemplo
    const isMockArtwork = mockArtworks.some(a => a.id === artworkId);
    if (isMockArtwork) {
        if (typeof showToast === 'function') {
            showToast('Obra demonstrativa', 'Esta obra é apenas um exemplo e não pode ser adicionada ao carrinho', 'info');
        } else {
            alert('Esta obra é demonstrativa');
        }
        return;
    }

    const user = (function() {
        try { return JSON.parse(localStorage.getItem('userData') || 'null'); } catch(e){ return null; }
    })();

    if (!user || !user.id) {
        alert('Faça login para adicionar ao carrinho');
        return;
    }

    (async () => {
        try {
            // Verifica se não é obra do próprio artista
            const artwork = await window.artworkService.getArtwork(artworkId);
            if (artwork.artistaId === user.id) {
                alert('Você não pode comprar sua própria obra');
                return;
            }

            await window.artworkService.addToCart(user.id, artworkId, 1);
            if (typeof showToast === 'function') {
                showToast('Adicionado', 'Obra adicionada ao carrinho', 'success');
            } else {
                alert('Obra adicionada ao carrinho');
            }
        } catch (err) {
            console.error('Erro ao adicionar ao carrinho:', err);
            alert('Não foi possível adicionar ao carrinho.');
        }
    })();
}

/**
 * Carrega mais obras (paginação)
 */
async function loadMoreArtworks() {
    if (isLoading) return;
    
    isLoading = true;
    const button = event.target;
    button.disabled = true;
    button.textContent = 'Carregando...';
    
    try {
        currentPage++;
        
        // Se está em busca, carrega mais dos resultados da busca
        if (searchActive) {
            const pageSize = 8;
            const start = currentPage * pageSize;
            const paged = filteredArtworks.slice(start, start + pageSize);
            renderArtworks(paged, true);
            
            // Esconde botão se não houver mais
            if (start + pageSize >= filteredArtworks.length) {
                button.style.display = 'none';
            }
        } else {
            // Senão, renderiza baseado na seção
            renderSectionArtworks();
        }
        
    } catch (error) {
        console.error('Erro ao carregar mais obras:', error);
        alert('Erro ao carregar mais obras. Tente novamente.');
        currentPage--;
    } finally {
        isLoading = false;
        button.disabled = false;
        button.textContent = 'Carregar mais obras';
    }
}

// ========================================
// FUNÇÕES DE BUSCA
// ========================================

/**
 * Filtra obras de arte baseado no termo de busca
 */
function filterArtworks(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    
    if (!term) {
        return allArtworks;
    }
    
    return allArtworks.filter(artwork => {
        const titleMatch = artwork.title.toLowerCase().includes(term);
        const artistMatch = artwork.artistName.toLowerCase().includes(term);
        return titleMatch || artistMatch;
    });
}

/**
 * Lida com a busca de obras
 */
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();
    const clearBtn = document.getElementById('clearSearchBtn');
    const noResultsMsg = document.getElementById('noResultsMessage');
    
    if (!searchTerm) {
        // Se campo vazio, retorna ao estado normal
        handleClearSearch();
        return;
    }
    
    // Filtra as obras
    filteredArtworks = filterArtworks(searchTerm);
    searchActive = true;
    currentPage = 0;
    
    // Mostra/esconde mensagem de sem resultados
    if (filteredArtworks.length === 0) {
        noResultsMsg.classList.remove('hidden');
        document.getElementById('noResultsText').textContent = `Nenhuma arte foi encontrada com os termos "${searchTerm}".`;
        document.getElementById('artworksGrid').innerHTML = '';
    } else {
        noResultsMsg.classList.add('hidden');
        const pageSize = 8;
        const initialPage = filteredArtworks.slice(0, pageSize);
        renderArtworks(initialPage, false);
        
        // Mostra/esconde botão de carregar mais
        const loadMoreBtn = document.querySelector('.load-more-container button');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = filteredArtworks.length > pageSize ? 'block' : 'none';
        }
    }
    
    // Mostra botão de limpar
    clearBtn.classList.remove('hidden');
}

/**
 * Lida com a limpeza da busca
 */
function handleClearSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearchBtn');
    const noResultsMsg = document.getElementById('noResultsMessage');
    
    // Limpa o input
    searchInput.value = '';
    
    // Desativa a busca
    searchActive = false;
    filteredArtworks = [];
    
    // Esconde mensagem de sem resultados
    noResultsMsg.classList.add('hidden');
    
    // Esconde botão de limpar
    clearBtn.classList.add('hidden');
    
    // Reseta a paginação
    currentPage = 0;
    
    // Renderiza as obras da seção novamente
    renderSectionArtworks();
}

// ========================================
// FUNÇÕES DE SEÇÕES (Em Alta, Recente, Comunidade)
// ========================================

/**
 * Calcula score de "trending" baseado em likes e data
 */
function calculateTrendingScore(artwork) {
    const now = new Date();
    const createdDate = artwork.dataCriacao ? new Date(artwork.dataCriacao) : (artwork.createdDate ? new Date(artwork.createdDate) : now);
    const daysOld = (now - createdDate) / (1000 * 60 * 60 * 24);
    
    // Score = likes com decay baseado na idade
    const decayFactor = Math.max(1, 1 - (daysOld / 30)); // Decai em 30 dias
    return (artwork.likes || 0) * decayFactor;
}

/**
 * Muda a seção ativa
 */
function handleSectionChange(section) {
    currentSection = section;
    currentPage = 0;
    
    // Atualiza visual dos tabs
    document.querySelectorAll('.section-tab').forEach(tab => {
        if (tab.dataset.section === section) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Renderiza obras da nova seção
    renderSectionArtworks();
}

/**
 * Renderiza obras baseado na seção atual
 */
function renderSectionArtworks() {
    let artworksToRender = [];
    
    console.log(`renderSectionArtworks: allArtworks.length = ${allArtworks.length}`);
    
    // Aplica filtros de categoria e tempo
    let filtered = allArtworks.filter(a => {
        // Filtro de categoria
        if (currentCategoryFilter !== 'all' && a.category !== currentCategoryFilter) {
            return false;
        }
        
        // Filtro de tempo
        if (currentTimeFilter !== 'all') {
            const createdDate = a.dataCriacao ? new Date(a.dataCriacao) : (a.createdDate ? new Date(a.createdDate) : new Date());
            const now = new Date();
            const daysOld = (now - createdDate) / (1000 * 60 * 60 * 24);
            
            switch(currentTimeFilter) {
                case 'today':
                    return daysOld < 1;
                case 'week':
                    return daysOld < 7;
                case 'month':
                    return daysOld < 30;
                case 'year':
                    return daysOld < 365;
                default:
                    return true;
            }
        }
        
        return true;
    });
    
    console.log(`Após filtros: filtered.length = ${filtered.length}`);
    
    // Ordena baseado na seção
    if (currentSection === 'trending') {
        artworksToRender = [...filtered].sort((a, b) => calculateTrendingScore(b) - calculateTrendingScore(a));
    } else if (currentSection === 'recent') {
        artworksToRender = [...filtered].sort((a, b) => {
            const dateA = a.dataCriacao ? new Date(a.dataCriacao) : (a.createdDate ? new Date(a.createdDate) : new Date(0));
            const dateB = b.dataCriacao ? new Date(b.dataCriacao) : (b.createdDate ? new Date(b.createdDate) : new Date(0));
            return dateB - dateA;
        });
    } else if (currentSection === 'community') {
        // Embaralha aleatoriamente
        artworksToRender = [...filtered].sort(() => Math.random() - 0.5);
    }
    
    // Paginação
    const pageSize = 8;
    const start = currentPage * pageSize;
    const paged = artworksToRender.slice(start, start + pageSize);
    
    if (paged.length === 0 && currentPage === 0) {
        document.getElementById('noResultsMessage').classList.remove('hidden');
        document.getElementById('artworksGrid').innerHTML = '';
    } else {
        document.getElementById('noResultsMessage').classList.add('hidden');
        renderArtworks(paged, currentPage > 0);
    }
    
    // Controla visibilidade do botão "carregar mais"
    const hasMore = start + pageSize < artworksToRender.length;
    const loadMoreBtn = document.querySelector('.load-more-container button');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = hasMore ? 'block' : 'none';
    }
    
    console.log(`Seção: ${currentSection}, Total de obras após filtros: ${artworksToRender.length}, Mostrando: ${paged.length}, hasMore: ${hasMore}`);
}

/**
 * Muda o filtro de tempo
 */
function handleTimeFilterChange() {
    const select = document.getElementById('timeFilter');
    currentTimeFilter = select.value;
    currentPage = 0;
    renderSectionArtworks();
}

/**
 * Alterna o dropdown de categorias
 */
function toggleCategoryDropdown() {
    const dropdown = document.getElementById('categoryDropdown');
    dropdown.classList.toggle('hidden');
}

/**
 * Lida com a seleção de categoria
 */
function handleCategoryFilter(category) {
    currentCategoryFilter = category;
    currentPage = 0;
    
    // Atualiza o texto do botão
    const displayText = category === 'all' ? 'Todas' : category;
    document.getElementById('selectedCategoryText').textContent = displayText;
    
    // Atualiza o radio button selecionado
    document.querySelectorAll('input[name="category"]').forEach(radio => {
        radio.checked = radio.value === category;
    });
    
    // Fecha o dropdown
    document.getElementById('categoryDropdown').classList.add('hidden');
    
    // Renderiza obras da seção com novo filtro
    renderSectionArtworks();
}

/**
 * Lida com Enter na barra de busca
 */
function setupSearchListener() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    // Fecha dropdown ao clicar fora
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('categoryDropdown');
        const btn = document.querySelector('.category-filter-btn');
        if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });
}
// ========================================
// INICIALIZAÇÃO
// ========================================

/**
 * Inicializa a página
 */
async function initExplorar() {
    try {
        // Se usuário logado, carregue favoritos reais primeiro
        const user = (function() {
            try { return JSON.parse(localStorage.getItem('userData') || 'null'); } catch(e){ return null; }
        })();

        // Limpa estado
        likedArtworks.clear();
        for (const key in likeCounts) delete likeCounts[key];

        if (user && user.id && window.artworkService) {
            try {
                const favs = await window.artworkService.getFavorites(user.id);
                favs.forEach(f => {
                    const obra = f.obra || f;
                    if (obra && obra.id) likedArtworks.add(obra.id);
                });
            } catch (err) {
                console.warn('Não foi possível carregar favoritos do usuário:', err);
            }
        }

        // Carrega TODAS as obras uma única vez para busca
        if (window.artworkService && typeof window.artworkService.listArtworks === 'function') {
            try {
                const allWorks = await window.artworkService.listArtworks({ status: 'DISPONIVEL' });
                
                // Carrega dados dos artistas
                let artistsData = {};
                if (window.userService && typeof window.userService.getArtist === 'function') {
                    const uniqueArtistIds = [...new Set(allWorks.map(a => a.artistaId))];
                    for (const artistId of uniqueArtistIds) {
                        try {
                            const artist = await window.userService.getArtist(artistId);
                            if (artist) artistsData[artistId] = artist;
                        } catch (err) {
                            console.warn(`Não foi possível carregar dados do artista ${artistId}:`, err);
                        }
                    }
                }
                
                // Normaliza as obras
                let source = [];
                if (Array.isArray(allWorks) && allWorks.length > 0) {
                    // Se há obras reais, usa apenas elas
                    source = allWorks;
                } else {
                    // Se não há obras reais, usa mocks com flag
                    source = mockArtworks.map(mock => ({
                        ...mock,
                        isMockData: true
                    }));
                }
                
                // Carrega contagem de curtidas
                const favoriteCounts = {};
                if (window.artworkService.getFavoritesCount) {
                    for (const artwork of source) {
                        favoriteCounts[artwork.id] = await window.artworkService.getFavoritesCount(artwork.id);
                    }
                }
                
                allArtworks = source.map(a => {
                    const artist = artistsData[a.artistaId] || {};
                    return {
                        id: a.id,
                        imageUrl: a.imagemUrl || a.imageUrl || '',
                        title: a.titulo || a.title || '',
                        artistId: a.artistaId,
                        artistName: artist.nome || artist.name || a.artistaNome || a.artist || 'Artista',
                        artistPhoto: artist.avatar || artist.photo || a.artistaAvatar || 'https://i.pravatar.cc/150?img=7',
                        price: Number(a.preco || a.price || 0),
                        likes: favoriteCounts[a.id] || a.likes || 0,
                        category: a.categoria || a.category || 'Sem categoria',
                        dataCriacao: a.dataCriacao || a.createdDate || new Date().toISOString(),
                        descricao: a.descricao || a.description || '',
                        isMockData: a.isMockData || false
                    };
                });
                
                console.log(`Carregadas ${allArtworks.length} obras`);
            } catch (err) {
                console.warn('Erro ao carregar todas as obras:', err);
                allArtworks = mockArtworks;
            }
        } else {
            allArtworks = mockArtworks;
        }

        // Carrega as obras e renderiza (usando seções)
        const initialArtworks = allArtworks.slice(0, 8);
        
        // Atualiza contadores de likes
        initialArtworks.forEach(artwork => {
            likeCounts[artwork.id] = artwork.likes || 0;
        });
        
        // Setup do listener de busca
        setupSearchListener();
        
        // Renderiza a seção padrão (trending)
        renderSectionArtworks();
        
    } catch (error) {
        console.error('Erro ao inicializar página:', error);
        document.getElementById('artworksGrid').innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <p style="color: var(--muted-foreground);">
                    Erro ao carregar obras. Por favor, tente novamente mais tarde.
                </p>
            </div>
        `;
    }
}

// Executa quando o DOM estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExplorar);
} else {
    initExplorar();
}

// ========================================
// MODAL DE ARTE - FUNCIONALIDADES
// ========================================

let currentModalArtwork = null;

async function openArtworkModal(artworkId) {
    try {
        // Encontra a obra
        const artwork = allArtworks.find(a => a.id === artworkId);
        if (!artwork) {
            console.error('Obra não encontrada');
            return;
        }

        currentModalArtwork = artwork;

        // Preenche informações básicas
        document.getElementById('modalArtworkTitle').textContent = artwork.title;
        document.getElementById('modalArtworkImage').src = artwork.imageUrl;
        document.getElementById('modalArtistName').textContent = artwork.artistName;
        document.getElementById('modalArtistPhoto').src = artwork.artistPhoto;
        document.getElementById('modalPrice').textContent = `R$ ${artwork.price.toFixed(2).replace('.', ',')}`;
        document.getElementById('modalCategory').textContent = artwork.category || 'Sem categoria';
        document.getElementById('modalDescription').textContent = artwork.descricao || 'Sem descrição fornecida';

        // Verifica se é favorito
        const user = JSON.parse(localStorage.getItem('userData'));
        if (user && user.tipo === 'CLIENTE') {
            const isFavorited = (await window.artworkService.getFavorites(user.id))
                .some(fav => fav.obraId === artworkId);
            
            const likeBtn = document.getElementById('modalLikeBtn');
            if (isFavorited) {
                likeBtn.classList.add('liked');
                likeBtn.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    Favorito
                `;
            } else {
                likeBtn.classList.remove('liked');
                likeBtn.innerHTML = `
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    Favoritar
                `;
            }
        }

        // Carrega sugestões do artista
        await loadArtistSuggestions(artwork.artistId || artwork.artistName);

        // Carrega comentários
        await loadModalComments(artworkId);

        // Exibe o modal
        document.getElementById('artworkModal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';

    } catch (error) {
        console.error('Erro ao abrir modal:', error);
    }
}

function closeArtworkModal() {
    document.getElementById('artworkModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
    currentModalArtwork = null;
}

async function loadArtistSuggestions(artistIdentifier) {
    try {
        // Filtra outras obras do mesmo artista
        const suggestions = allArtworks.filter(a => 
            (a.artistId === artistIdentifier || a.artistName === artistIdentifier) &&
            a.id !== currentModalArtwork.id
        ).slice(0, 4);

        const suggestionsSection = document.getElementById('modalSuggestionsSection');
        const suggestionsGrid = document.getElementById('modalSuggestions');

        if (suggestions.length === 0) {
            suggestionsSection.classList.add('hidden');
            return;
        }

        suggestionsSection.classList.remove('hidden');

        suggestionsGrid.innerHTML = suggestions.map(artwork => `
            <div class="suggestion-card" onclick="openArtworkModal('${artwork.id}')">
                <img src="${artwork.imageUrl}" alt="${artwork.title}" class="suggestion-card-image">
                <div class="suggestion-card-title">${artwork.title}</div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Erro ao carregar sugestões:', error);
        document.getElementById('modalSuggestionsSection').classList.add('hidden');
    }
}

async function loadModalComments(artworkId) {
    try {
        const comments = await window.commentService.getComments(artworkId);
        const commentsList = document.getElementById('modalCommentsList');
        const noComments = document.getElementById('modalNoComments');
        const user = JSON.parse(localStorage.getItem('userData'));

        if (comments.length === 0) {
            commentsList.innerHTML = '';
            noComments.classList.remove('hidden');
            return;
        }

        noComments.classList.add('hidden');
        
        // Carrega dados dos usuários para comentários
        const users = JSON.parse(localStorage.getItem('db_users') || '[]');

        commentsList.innerHTML = comments.map(comment => {
            const commentAuthor = users.find(u => u.id === comment.usuarioId) || {};
            const isCommentAuthor = user && user.id === comment.usuarioId;
            const isArtist = user && user.id === currentModalArtwork.artistId;
            
            return `
                <div class="comment-item">
                    <img src="${commentAuthor.avatar || 'https://i.pravatar.cc/150?img=7'}" alt="" class="comment-avatar">
                    <div class="comment-content">
                        <div class="comment-header">
                            <div class="comment-meta">
                                <span class="comment-author ${isCommentAuthor ? 'is-author' : ''}">${commentAuthor.nome || 'Usuário'}</span>
                                <span>•</span>
                                <span>${window.commentService.formatDate(comment.dataCriacao)}</span>
                            </div>
                            <div class="comment-actions">
                                ${isCommentAuthor ? `
                                    <button class="comment-action-btn" onclick="deleteComment('${comment.id}')" title="Deletar comentário">
                                        Deletar
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                        <p class="comment-text">${comment.texto}</p>

                        <!-- Respostas -->
                        ${comment.respostas && comment.respostas.length > 0 ? `
                            <div class="comment-replies">
                                ${comment.respostas.map(reply => {
                                    const replyAuthor = users.find(u => u.id === reply.artistaId) || {};
                                    const isReplyAuthor = user && user.id === reply.artistaId;
                                    return `
                                        <div class="reply-item">
                                            <div class="reply-content">
                                                <div class="reply-header">
                                                    <span class="reply-author">${replyAuthor.nome || 'Artista'}</span>
                                                    <span class="reply-meta">${window.commentService.formatDate(reply.dataCriacao)}</span>
                                                </div>
                                                <p class="reply-text">${reply.texto}</p>
                                            </div>
                                            ${isReplyAuthor ? `
                                                <div class="reply-actions">
                                                    <button class="reply-delete-btn" onclick="deleteReply('${comment.id}', '${reply.id}')" title="Deletar resposta">
                                                        ✕
                                                    </button>
                                                </div>
                                            ` : ''}
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        ` : ''}

                        <!-- Form de resposta (apenas para artista) -->
                        ${isArtist && !comment.respostas?.some(r => r.artistaId === user.id) ? `
                            <div class="reply-form">
                                <input type="text" 
                                       class="reply-input reply-input-${comment.id}" 
                                       placeholder="Responder como artista..." 
                                       maxlength="300">
                                <button class="reply-submit-btn" onclick="submitReply('${comment.id}')">
                                    Responder
                                </button>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');

    } catch (error) {
        console.error('Erro ao carregar comentários:', error);
    }
}

async function handleSubmitComment() {
    try {
        const user = JSON.parse(localStorage.getItem('userData'));
        if (!user || user.tipo === 'ARTISTA') {
            alert('Apenas clientes podem fazer comentários');
            return;
        }

        const commentInput = document.getElementById('modalCommentInput');
        const texto = commentInput.value.trim();

        if (!texto) {
            alert('Comentário não pode estar vazio');
            return;
        }

        await window.commentService.createComment(currentModalArtwork.id, user.id, texto);
        
        commentInput.value = '';
        document.getElementById('commentCharCount').textContent = '0/500';
        
        await loadModalComments(currentModalArtwork.id);

    } catch (error) {
        console.error('Erro ao submeter comentário:', error);
        alert('Erro ao enviar comentário. Tente novamente.');
    }
}

async function deleteComment(commentId) {
    if (!confirm('Tem certeza que deseja deletar este comentário?')) {
        return;
    }

    try {
        const user = JSON.parse(localStorage.getItem('userData'));
        const isArtist = user.id === currentModalArtwork.artistId;
        
        await window.commentService.deleteComment(commentId, user.id, isArtist);
        await loadModalComments(currentModalArtwork.id);

    } catch (error) {
        console.error('Erro ao deletar comentário:', error);
        alert('Erro ao deletar comentário. Tente novamente.');
    }
}

async function submitReply(commentId) {
    try {
        const user = JSON.parse(localStorage.getItem('userData'));
        if (!user || user.tipo !== 'ARTISTA') {
            alert('Apenas o artista pode responder comentários');
            return;
        }

        const replyInput = document.querySelector(`.reply-input-${commentId}`);
        const texto = replyInput.value.trim();

        if (!texto) {
            alert('Resposta não pode estar vazia');
            return;
        }

        await window.commentService.createReply(commentId, user.id, texto);
        await loadModalComments(currentModalArtwork.id);

    } catch (error) {
        console.error('Erro ao submeter resposta:', error);
        alert('Erro ao enviar resposta. Tente novamente.');
    }
}

async function deleteReply(commentId, replyId) {
    if (!confirm('Tem certeza que deseja deletar esta resposta?')) {
        return;
    }

    try {
        const user = JSON.parse(localStorage.getItem('userData'));
        await window.commentService.deleteReply(commentId, replyId, user.id);
        await loadModalComments(currentModalArtwork.id);

    } catch (error) {
        console.error('Erro ao deletar resposta:', error);
        alert('Erro ao deletar resposta. Tente novamente.');
    }
}

function handleAddToCartModal() {
    if (!currentModalArtwork) return;
    handleAddToCart({ id: currentModalArtwork.id });
}

async function handleToggleLikeModal() {
    try {
        const user = JSON.parse(localStorage.getItem('userData'));
        if (!user || user.tipo !== 'CLIENTE') {
            alert('Apenas clientes podem favoritar obras');
            return;
        }

        await window.artworkService.toggleFavorite(user.id, currentModalArtwork.id);
        
        // Atualiza botão
        const likeBtn = document.getElementById('modalLikeBtn');
        likeBtn.classList.toggle('liked');
        
        if (likeBtn.classList.contains('liked')) {
            likeBtn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                Favorito
            `;
        } else {
            likeBtn.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                Favoritar
            `;
        }

    } catch (error) {
        console.error('Erro ao favorirar obra:', error);
    }
}

// Atualiza contador de caracteres do comentário
document.addEventListener('input', function(e) {
    if (e.target.id === 'modalCommentInput') {
        const count = e.target.value.length;
        document.getElementById('commentCharCount').textContent = `${count}/500`;
    }
});

// ========================================
// FUNÇÃO ADAPTADORA PARA DASHBOARDS
// ========================================
// Permite abrir o modal de uma obra nos dashboards
// Procura a obra no banco de dados e abre o modal

async function openArtworkModalFromDashboard(artworkId) {
    try {
        // Tenta encontrar a obra no banco de dados
        let artwork = await window.artworkService.getArtwork(artworkId);
        
        // Se encontrou, precisa normalizar para o formato do modal
        if (artwork) {
            // Carrega dados do artista
            let artist = {};
            if (artwork.artistaId && window.userService) {
                try {
                    artist = await window.userService.getArtist(artwork.artistaId) || {};
                } catch (e) {
                    console.warn('Erro ao carregar artista:', e);
                }
            }
            
            // Carrega contagem de curtidas
            let likes = 0;
            if (window.artworkService.getFavoritesCount) {
                likes = await window.artworkService.getFavoritesCount(artworkId);
            }
            
            // Normaliza o artwork
            const normalizedArtwork = {
                id: artwork.id,
                imageUrl: artwork.imagemUrl || artwork.imageUrl || '',
                title: artwork.titulo || artwork.title || '',
                artistId: artwork.artistaId,
                artistName: artist.nome || artist.name || artwork.artistaNome || 'Artista',
                artistPhoto: artist.avatar || artist.photo || 'https://i.pravatar.cc/150?img=7',
                price: Number(artwork.preco || artwork.price || 0),
                likes: likes || artwork.likes || 0,
                category: artwork.categoria || artwork.category || 'Sem categoria',
                dataCriacao: artwork.dataCriacao || artwork.createdDate || new Date().toISOString(),
                descricao: artwork.descricao || artwork.description || '',
                isMockData: artwork.isMockData || false
            };
            
            // Abre o modal
            currentModalArtwork = normalizedArtwork;
            
            // Preenche informações básicas
            document.getElementById('modalArtworkTitle').textContent = normalizedArtwork.title;
            document.getElementById('modalArtworkImage').src = normalizedArtwork.imageUrl;
            document.getElementById('modalArtistName').textContent = normalizedArtwork.artistName;
            document.getElementById('modalArtistPhoto').src = normalizedArtwork.artistPhoto;
            document.getElementById('modalPrice').textContent = `R$ ${normalizedArtwork.price.toFixed(2).replace('.', ',')}`;
            document.getElementById('modalCategory').textContent = normalizedArtwork.category;
            document.getElementById('modalDescription').textContent = normalizedArtwork.descricao || 'Sem descrição fornecida';

            // Verifica se é favorito
            const user = JSON.parse(localStorage.getItem('userData'));
            if (user && user.tipo === 'CLIENTE') {
                const isFavorited = (await window.artworkService.getFavorites(user.id))
                    .some(fav => fav.obraId === artworkId);
                
                const likeBtn = document.getElementById('modalLikeBtn');
                if (isFavorited) {
                    likeBtn.classList.add('liked');
                    likeBtn.innerHTML = `
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        Favorito
                    `;
                } else {
                    likeBtn.classList.remove('liked');
                    likeBtn.innerHTML = `
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        Favoritar
                    `;
                }
            }

            // Carrega sugestões do artista
            await loadArtistSuggestions(normalizedArtwork.artistId || normalizedArtwork.artistName);

            // Carrega comentários
            await loadModalComments(artworkId);

            // Exibe o modal
            document.getElementById('artworkModal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    } catch (error) {
        console.error('Erro ao abrir modal:', error);
        alert('Erro ao abrir obra. Tente novamente.');
    }
}