// ========================================
// CONFIGURAÇÃO E CONSTANTES
// ========================================

let currentPage = 0;
let isLoading = false;

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
    },
    {
        id: "2",
        imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=1200&fit=crop",
        title: "Mandacaru",
        artistName: "João Santos",
        artistPhoto: "https://i.pravatar.cc/150?img=12",
        price: 225,
        likes: 156,
    },
    {
        id: "3",
        imageUrl: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=1200&fit=crop",
        title: "Cultura Popular — Festa Junina",
        artistName: "Ana Costa",
        artistPhoto: "https://i.pravatar.cc/150?img=5",
        price: 109,
        likes: 421,
    },
    {
        id: "4",
        imageUrl: "https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=1080&h=1200&fit=crop",
        title: "Retratos do Sertão",
        artistName: "Paulo Almeida",
        artistPhoto: "https://i.pravatar.cc/150?img=13",
        price: 200,
        likes: 189,
    },
    {
        id: "5",
        imageUrl: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&h=1200&fit=crop",
        title: "Cerâmica Artesanal",
        artistName: "Carla Mendes",
        artistPhoto: "https://i.pravatar.cc/150?img=9",
        price: 365,
        likes: 312,
    },
    {
        id: "6",
        imageUrl: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=800&h=1200&fit=crop",
        title: "Paisagem Costeira",
        artistName: "Rafael Lima",
        artistPhoto: "https://i.pravatar.cc/150?img=14",
        price: 220,
        likes: 267,
    },
    {
        id: "7",
        imageUrl: "https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800&h=1200&fit=crop",
        title: "Xilogravura Nordestina",
        artistName: "Beatriz Silva",
        artistPhoto: "https://i.pravatar.cc/150?img=10",
        price: 189,
        likes: 445,
    },
    {
        id: "8",
        imageUrl: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&h=1200&fit=crop",
        title: "Arquitetura Colonial",
        artistName: "Fernando Rocha",
        artistPhoto: "https://i.pravatar.cc/150?img=15",
        price: 220,
        likes: 198,
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
            const source = (Array.isArray(all) && all.length > 0) ? all : mockArtworks;

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
        <div class="art-card-image-container">
            <img src="${artwork.imageUrl}" alt="${artwork.title}" class="art-card-image">
            
            <div class="art-card-overlay">
                <div class="art-card-overlay-content">
                    <h3 class="art-card-title">${artwork.title}</h3>
                    <p class="art-card-price">R$ ${formatPrice(artwork.price)}</p>
                </div>
                <div class="art-card-actions">
                    <button class="action-btn" onclick="handleAddToCart('${artwork.id}')" title="Adicionar ao carrinho">
                        ${icons.cart}
                    </button>
                    <button class="action-btn ${isLiked ? 'liked' : ''}" onclick="handleToggleLike('${artwork.id}')" title="Favoritar">
                        ${isLiked ? icons.heartFilled : icons.heart}
                    </button>
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
            const likesElement = document.querySelector(`[data-artwork-id="${artworkId}"]`);
            if (likesElement) likesElement.textContent = currentCount;

            const cards = document.querySelectorAll('.art-card');
            cards.forEach(card => {
                const btn = card.querySelector(`button[onclick="handleToggleLike('${artworkId}')"]`);
                if (btn) {
                    const nowLiked = likedArtworks.has(artworkId);
                    btn.classList.toggle('liked', nowLiked);
                    btn.innerHTML = nowLiked ? icons.heartFilled : icons.heart;
                }
            });

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
    const user = (function() {
        try { return JSON.parse(localStorage.getItem('userData') || 'null'); } catch(e){ return null; }
    })();

    if (!user || !user.id) {
        alert('Faça login para adicionar ao carrinho');
        return;
    }

    (async () => {
        try {
            await window.artworkService.addToCart(user.id, artworkId, 1);
            if (typeof showToast === 'function') showToast('Adicionado', 'Obra adicionada ao carrinho', 'success');
            else alert('Obra adicionada ao carrinho');
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
        const data = await fetchArtworks(currentPage);
        renderArtworks(data.content, true);
        
        // Inicializa os contadores de likes das novas obras
        data.content.forEach(artwork => {
            if (!likeCounts[artwork.id]) {
                likeCounts[artwork.id] = artwork.likes;
            }
        });
        
        // Esconde o botão se não houver mais páginas
        if (!data.hasMore) {
            button.style.display = 'none';
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

        // Carrega as obras e renderiza
        const data = await fetchArtworks(0);
        renderArtworks(data.content);
        
        // Atualiza contadores de likes
        data.content.forEach(artwork => {
            likeCounts[artwork.id] = artwork.likes || 0;
        });
        
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