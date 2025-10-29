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
        price: 145,
        likes: 234,
        views: 2100,
        comments: 18,
    },
    {
        id: "2",
        imageUrl: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=1200&fit=crop",
        title: "Mandacaru",
        artistName: "João Santos",
        price: 225,
        likes: 156,
        views: 1300,
        comments: 7,
    },
    {
        id: "3",
        imageUrl: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=1200&fit=crop",
        title: "Cultura Popular — Festa Junina",
        artistName: "Ana Costa",
        price: 109,
        likes: 421,
        views: 3800,
        comments: 32,
    },
    {
        id: "4",
        imageUrl: "https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=1080&h=1200&fit=crop",
        title: "Retratos do Sertão",
        artistName: "Paulo Almeida",
        price: 200,
        likes: 189,
        views: 1500,
        comments: 12,
    },
    {
        id: "5",
        imageUrl: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&h=1200&fit=crop",
        title: "Cerâmica Artesanal",
        artistName: "Carla Mendes",
        price: 365,
        likes: 312,
        views: 2600,
        comments: 24,
    },
    {
        id: "6",
        imageUrl: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=800&h=1200&fit=crop",
        title: "Paisagem Costeira",
        artistName: "Rafael Lima",
        price: 220,
        likes: 267,
        views: 2200,
        comments: 19,
    },
    {
        id: "7",
        imageUrl: "https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800&h=1200&fit=crop",
        title: "Xilogravura Nordestina",
        artistName: "Beatriz Silva",
        price: 189,
        likes: 445,
        views: 4100,
        comments: 38,
    },
    {
        id: "8",
        imageUrl: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&h=1200&fit=crop",
        title: "Arquitetura Colonial",
        artistName: "Fernando Rocha",
        price: 220,
        likes: 198,
        views: 1700,
        comments: 14,
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
    eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
    </svg>`,
    message: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
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
        // TODO: Substituir por chamada real à API
        // const response = await fetch(`/api/artworks?page=${page}&size=${size}`);
        // const data = await response.json();
        // return data;
        
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
      
      card.innerHTML = `
        <div class="art-card-image-container">
          <img src="${artwork.imageUrl}" alt="${artwork.title}" class="art-card-image">
          
          <div class="art-card-overlay">
            <div class="art-card-overlay-content">
              <h3 class="art-card-title">${artwork.title}</h3>
              <p class="art-card-price">R$ ${artwork.price}</p>
              <p class="art-card-artist">por <span>${artwork.artistName}</span></p>
            </div>
          </div>
        </div>
        
        <div class="art-card-info">
          <span class="art-card-artist-name">${artwork.artistName}</span>
          <div class="art-card-stats">
            <div class="stat-item">
              ${icons.heart}
              <span>${artwork.likes}</span>
            </div>
            <div class="stat-item">
              ${icons.eye}
              <span>${artwork.views}</span>
            </div>
            <div class="stat-item">
              ${icons.message}
              <span>${artwork.comments}</span>
            </div>
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

/**
 * Handler para click no card da obra
 */
function handleArtworkClick(artworkId) {
    console.log('Obra clicada:', artworkId);
    // TODO: Redirecionar para página de detalhes da obra
    // window.location.href = `obra.html?id=${artworkId}`;
    
    // Temporário: mostra alert
    const artwork = mockArtworks.find(a => a.id === artworkId);
    if (artwork) {
        alert(`Você clicou em: ${artwork.title}\nArtista: ${artwork.artistName}`);
    }
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

/**
 * Handler de logout
 */
function handleLogout() {
    if (confirm('Deseja realmente sair?')) {
        // TODO: Implementar logout real
        // await fetch('/api/auth/logout', { method: 'POST' });
        // localStorage.removeItem('token');
        window.location.href = '../index.html';
    }
}

// ========================================
// FILTROS
// ========================================

/**
 * Inicializa os filtros
 */
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active de todos
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Adiciona active no clicado
            this.classList.add('active');
            
            const filterType = this.textContent.trim();
            console.log('Filtro selecionado:', filterType);
            
            // TODO: Implementar filtro real
            // filterArtworks(filterType);
        });
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
        // Carrega as obras iniciais
        const data = await fetchArtworks(0);
        renderArtworks(data.content);
        
        // Inicializa os contadores de likes
        data.content.forEach(artwork => {
            likeCounts[artwork.id] = artwork.likes;
        });
        
        // Inicializa os filtros
        initFilters();
        
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