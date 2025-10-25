// ========================================
// CONFIGURAÇÃO E CONSTANTES
// ========================================

let currentPage = 0;
let isLoading = false;

// Mock data - Dados simulados
const mockArtworks = [
    {
        id: "1",
        imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=1200&fit=crop",
        title: "Sertão em Cores",
        artistName: "Maria Silva",
        price: 145,
        likes: 142,
    },
    {
        id: "2",
        imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=1200&fit=crop",
        title: "Horizonte Atlântico",
        artistName: "João Santos",
        price: 225,
        likes: 89,
    },
    {
        id: "3",
        imageUrl: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&h=1200&fit=crop",
        title: "Caatinga Viva",
        artistName: "Pedro Costa",
        price: 109,
        likes: 156,
    },
    {
        id: "4",
        imageUrl: "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=800&h=1200&fit=crop",
        title: "Memórias do Litoral",
        artistName: "Rafael Lima",
        price: 200,
        likes: 167,
    },
    {
        id: "5",
        imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=1200&fit=crop",
        title: "Identidade Cultural",
        artistName: "Beatriz Rocha",
        price: 365,
        likes: 134,
    },
    {
        id: "6",
        imageUrl: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800&h=1200&fit=crop",
        title: "Sol Poente",
        artistName: "Lucas Ferreira",
        price: 220,
        likes: 221,
    },
    {
        id: "7",
        imageUrl: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=1200&fit=crop",
        title: "Festividades",
        artistName: "Juliana Souza",
        price: 189,
        likes: 178,
    },
];

// Estado dos likes (armazenado em memória durante a sessão)
const likedArtworks = new Set();
const likeCounts = {};

// ========================================
// FUNÇÕES DE API
// ========================================

/**
 * Busca obras em destaque de arte da API
 */
async function fetchArtworks(page = 0, size = 9) {
    try {
        // TODO: Substituir por chamada real à API
        // Mock - simulando delay de rede
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
    
    const currentLikes = likeCounts[artwork.id] || artwork.likes;
    
    card.innerHTML = `
        <div class="art-card-image-container" onclick="handleArtCard()">
            <img src="${artwork.imageUrl}" alt="${artwork.title}" class="art-card-image">
            
            <div class="art-card-overlay">
                <div class="art-card-overlay-content">
                    <h3 class="art-card-title">${artwork.title}</h3>
                    <p class="art-card-price">R$${artwork.price}</>
                    <p class="art-card-artist">por <span>${artwork.artistName}</span></p>
                </div>
            </div>
        </div>
        
        <div class="art-card-info">
            <span class="art-card-artist-name">${artwork.artistName}</span>
            <div class="art-card-likes">
                <svg class="like-icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <span class="like-count">${currentLikes}</span>
            </div>
        </div>
    `;
    
    return card;
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

async function handleArtCard(){
        showToast(
        'Login necessário',
        'Você precisa estar logado para interagir',
        'info'
    );
    
    // Redireciona para login após 1 segundo
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
    return;
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
        
        // Esconde o botão se não houver mais páginas
        if (!data.hasMore) {
            button.style.display = 'none';
        }
    } catch (error) {
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
async function initIndex() {
    try {
        // Carrega as obras iniciais
        const data = await fetchArtworks(0);
        renderArtworks(data.content);
        
        // Inicializa os contadores de likes
        data.content.forEach(artwork => {
            likeCounts[artwork.id] = artwork.likes;
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
    document.addEventListener('DOMContentLoaded', initIndex);
} else {
    initIndex();
}