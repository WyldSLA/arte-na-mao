// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Featured artworks data
const featuredArtworks = [
  {
    image:
      "https://i.pinimg.com/736x/95/d7/17/95d7173af19728c91cc65a0a50ae3607.jpg",
    title: "Raizes Nordestinas",
    artist: "Maria Silva",
    category: "Pintura",
  },
  {
    image:
      "https://images.unsplash.com/photo-1631125915902-d8abe9225ff2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    title: "Vasos",
    artist: "João Santos",
    category: "Escultura",
  },
  {
    image:
      "https://i.pinimg.com/736x/31/22/c8/3122c8817a8c1c3c78843cd210fffcf8.jpg",
    title: "Vida no Sertão",
    artist: "Ana Costa",
    category: "Fotografia",
  },
  {
    image:
      "https://i.pinimg.com/736x/08/38/b5/0838b5a14beaa2e7e19026a39745931d.jpg",
    title: "Caatinga em Flor",
    artist: "Maria Silva",
    category: "Pintura",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1714841433964-2ea7e12d174a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
    title: "Pratos",
    artist: "João Santos",
    category: "Escultura",
  },
];

// Artists with works data
const artistsWithWorks = [
  {
    name: "Maria Silva",
    specialty: "Pintora",
    location: "Recife, PE",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    works: [
      {
        title: "Seca",
        image:
          "https://plus.unsplash.com/premium_photo-1675705698856-4e15ed5506d6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        price: "R$ 1.300",
      },
      {
        title: "Raízes Africanas",
        image:
          "https://i.pinimg.com/736x/5a/26/6f/5a266f7460a16bd5e7b0d2cabf54e874.jpg",
        price: "R$ 1.500",
      },
      {
        title: "Ancestralidade",
        image:
          "https://i.pinimg.com/736x/ea/8d/7b/ea8d7b910f4fd6b05f2b70b5e84c3ac9.jpg",
        price: "R$ 1.100",
      },
    ],
  },
  {
    name: "João Santos",
    specialty: "Escultor",
    location: "Caruaru, PE",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    works: [
      {
        title: "Casas",
        image:
          "https://i.pinimg.com/1200x/f2/ca/cd/f2cacdb383628c6fb4eb1709b4541032.jpg",
        price: "R$ 150",
      },
      {
        title: "Forró",
        image:
          "https://i.pinimg.com/1200x/d8/6d/d3/d86dd375d0d6a3fbbb9f44dfda27188b.jpg",
        price: "R$ 190",
      },
      {
        title: "Vida Sertaneja",
        image:
          "https://i.pinimg.com/736x/82/5d/8a/825d8a5df3181889761439567a8a136f.jpg",
        price: "R$ 320",
      },
    ],
  },
  {
    name: "Ana Costa",
    specialty: "Fotógrafa",
    location: "Fortaleza, CE",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    works: [
      {
        title: "Vida no Sertão",
        image:
          "https://i.pinimg.com/736x/86/75/41/8675418f86f36084045bc78f029ef571.jpg",
        price: "R$ 100",
      },
      {
        title: "Tradição",
        image:
          "https://i.pinimg.com/736x/e3/ab/8f/e3ab8f854b25610a8f78a6d4fec2da39.jpg",
        price: "R$ 300",
      },
      {
        title: "Texturas do Agreste",
        image:
          "https://i.pinimg.com/736x/b1/a2/ce/b1a2ce649c6cf0675d35ba7eed391404.jpg",
        price: "R$ 200",
      },
    ],
  },
];
// Events data
const eventsData = [
  {
    image:
      "https://i.pinimg.com/1200x/f4/d5/f3/f4d5f330620f5a256b9ea3b4c3dee9f3.jpg",
    title: "Exposição: Cores do Sertão",
    date: "15 de Novembro, 2025",
    location: "Recife, PE",
    description:
      "Uma celebração da paleta vibrante do sertão nordestino através de pinturas e fotografias contemporâneas.",
    attendees: "142",
    badge: "Em Breve",
  },
  {
    image:
      "https://i.pinimg.com/1200x/06/90/2d/06902d24bd882fe77adbb3377c6c3353.jpg",
    title: "Workshop: Xilogravura Tradicional",
    date: "22 de Novembro, 2025",
    location: "Fortaleza, CE",
    description:
      "Aprenda as técnicas ancestrais de xilogravura com mestres da arte popular nordestina.",
    attendees: "56",
    badge: "Inscrições Abertas",
  },
  {
    image:
      "https://i.pinimg.com/736x/49/f9/9e/49f99e8f865f4be8ab53dc88413b301c.jpg",
    title: "Feira de Arte Regional",
    date: "8 de Dezembro, 2025",
    location: "Salvador, BA",
    description:
      "Encontro de artistas, colecionadores e apreciadores. Obras exclusivas à venda e apresentações ao vivo.",
    attendees: "320",
    badge: "Destaque",
  },
];

// Render featured artworks
function renderFeaturedArtworks() {
  const grid = document.getElementById("featuredGrid");

  featuredArtworks.forEach((artwork, index) => {
    const card = document.createElement("div");
    card.className = "artwork-card";
    card.style.animationDelay = `${index * 100}ms`;

    card.innerHTML = `
                    <img src="${artwork.image}" alt="${artwork.title}">
                    <div class="artwork-overlay">
                        <div class="artwork-info">
                            <div class="artwork-category">${artwork.category}</div>
                            <h3 class="artwork-title">${artwork.title}</h3>
                            <p class="artwork-artist">${artwork.artist}</p>
                        </div>
                    </div>
                `;

    grid.appendChild(card);
  });
}

// Render artists and their works
function renderArtists() {
  const container = document.getElementById("artistsContainer");

  artistsWithWorks.forEach((artist, artistIndex) => {
    const showcase = document.createElement("div");
    showcase.className = "artist-showcase";
    showcase.style.animationDelay = `${artistIndex * 200}ms`;

    let worksHTML = "";
    artist.works.forEach((work) => {
      worksHTML += `
                        <div class="work-card">
                            <div class="work-image">
                                <img src="${work.image}" alt="${work.title}">
                            </div>
                            <div>
                                <h4 class="work-title">${work.title}</h4>
                                <p class="work-price">${work.price}</p>
                            </div>
                        </div>
                    `;
    });

    showcase.innerHTML = `
                    <div class="artist-header">
                        <div class="artist-avatar">
                            <img src="${artist.avatar}" alt="${artist.name}">
                        </div>
                        <div>
                            <h3 class="artist-name">${artist.name}</h3>
                            <p class="artist-meta">${artist.specialty} • ${artist.location}</p>
                        </div>
                    </div>
                    <div class="artist-works">
                        ${worksHTML}
                    </div>
                `;

    container.appendChild(showcase);
  });
}

function renderEvents() {
  const grid = document.getElementById("eventsGrid");

  eventsData.forEach((event, index) => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.style.animationDelay = `${index * 150}ms`;

    card.innerHTML = `
                    <div class="event-image">
                        <img src="${event.image}" alt="${event.title}">
                        <div class="event-badge">${event.badge}</div>
                    </div>
                    <div class="event-content">
                        <div class="event-date">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            <span>${event.date}</span>
                        </div>
                        <h3 class="event-title">${event.title}</h3>
                        <p class="event-description">${event.description}</p>
                        <div class="event-footer">
                            <div class="event-location">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                    <circle cx="12" cy="10" r="3"/>
                                </svg>
                                <span>${event.location}</span>
                            </div>
                            <div class="event-attendees">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                </svg>
                                <span>${event.attendees}</span>
                            </div>
                        </div>
                    </div>
                `;

    grid.appendChild(card);
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", async () => {
    try {
    // Render static example content for featured, artists and events as a guide/sample
    // Render featured sample artworks first
    renderFeaturedArtworks();

    // Render static artists/examples (guide)
    renderArtists();

    // Render static events/examples (guide)
    renderEvents();

    // Mantém apenas exemplos estáticos na tela pública, não carrega artes reais do serviço
    // ...existing code...

    } catch (error) {
        console.error('Erro ao carregar dados da página inicial:', error);
        if (typeof showToast === 'function') {
            showToast(
                'Erro ao carregar',
                'Não foi possível carregar alguns conteúdos. Tente novamente mais tarde.',
                'error'
            );
        }
    }
});
