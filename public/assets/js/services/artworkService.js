// ========================================
// SERVIÇOS DE OBRAS
// ========================================

class ArtworkService {
    constructor() {
        this.STORAGE_KEYS = {
            ARTWORKS: 'db_artworks',
            FAVORITES: 'db_favorites',
            CART: 'db_cart',
            CART_ITEMS: 'db_cart_items',
            PURCHASES: 'db_purchases',
            PURCHASE_ITEMS: 'db_purchase_items'
        };
    }

    // ========================================
    // MÉTODOS PRIVADOS
    // ========================================
    
    _getCollection(key) {
        return JSON.parse(localStorage.getItem(key) || '[]');
    }

    _saveCollection(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    _generateId() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // ========================================
    // CRUD DE OBRAS
    // ========================================
    
    async createArtwork(artistId, artworkData) {
        const artworks = this._getCollection(this.STORAGE_KEYS.ARTWORKS);
        
        const now = new Date().toISOString();
        const newArtwork = {
            id: this._generateId(),
            artistaId: artistId,
            titulo: artworkData.title,
            descricao: artworkData.description || '',
            categoria: artworkData.category,
            preco: parseFloat(artworkData.price),
            dimensoes: artworkData.dimensions || null,
            tecnica: artworkData.technique || '',
            dataProducao: artworkData.productionDate || now,
            imagemUrl: artworkData.imageUrl,
            status: 'DISPONIVEL',
            dataCriacao: now,
            dataAtualizacao: now
        };

        artworks.push(newArtwork);
        this._saveCollection(this.STORAGE_KEYS.ARTWORKS, artworks);

        return newArtwork;
    }

    async getArtwork(id) {
        const artworks = this._getCollection(this.STORAGE_KEYS.ARTWORKS);
        const artwork = artworks.find(a => a.id === id);
        
        if (!artwork) {
            throw new Error('Obra não encontrada');
        }

        return artwork;
    }

    async updateArtwork(id, updateData) {
        const artworks = this._getCollection(this.STORAGE_KEYS.ARTWORKS);
        const index = artworks.findIndex(a => a.id === id);
        
        if (index === -1) {
            throw new Error('Obra não encontrada');
        }

        const artwork = artworks[index];
        const updatedArtwork = {
            ...artwork,
            ...updateData,
            dataAtualizacao: new Date().toISOString()
        };

        artworks[index] = updatedArtwork;
        this._saveCollection(this.STORAGE_KEYS.ARTWORKS, artworks);

        return updatedArtwork;
    }

    async deleteArtwork(id) {
        const artworks = this._getCollection(this.STORAGE_KEYS.ARTWORKS);
        const updatedArtworks = artworks.filter(a => a.id !== id);
        this._saveCollection(this.STORAGE_KEYS.ARTWORKS, updatedArtworks);

        // Remove dos favoritos
        const favorites = this._getCollection(this.STORAGE_KEYS.FAVORITES);
        const updatedFavorites = favorites.filter(f => f.obraId !== id);
        this._saveCollection(this.STORAGE_KEYS.FAVORITES, updatedFavorites);

        // Remove dos carrinhos
        const cartItems = this._getCollection(this.STORAGE_KEYS.CART_ITEMS);
        const updatedCartItems = cartItems.filter(i => i.obraId !== id);
        this._saveCollection(this.STORAGE_KEYS.CART_ITEMS, updatedCartItems);
    }

    // ========================================
    // OPERAÇÕES DE LISTAGEM
    // ========================================
    
    async listArtworks(filters = {}) {
        let artworks = this._getCollection(this.STORAGE_KEYS.ARTWORKS);

        // Aplica filtros
        if (filters.artistId) {
            artworks = artworks.filter(a => a.artistaId === filters.artistId);
        }
        if (filters.category) {
            artworks = artworks.filter(a => a.categoria === filters.category);
        }
        if (filters.status) {
            artworks = artworks.filter(a => a.status === filters.status);
        }
        if (filters.priceRange) {
            artworks = artworks.filter(a => 
                a.preco >= filters.priceRange.min && 
                a.preco <= filters.priceRange.max
            );
        }

        return artworks;
    }

    async getFeaturedArtworks() {
        const artworks = this._getCollection(this.STORAGE_KEYS.ARTWORKS);
        return artworks
            .filter(a => a.status === 'DISPONIVEL')
            .sort(() => Math.random() - 0.5)
            .slice(0, 5);
    }

    // ========================================
    // FAVORITOS
    // ========================================
    
    async toggleFavorite(clientId, artworkId) {
        const favorites = this._getCollection(this.STORAGE_KEYS.FAVORITES);
        const existingIndex = favorites.findIndex(
            f => f.clienteId === clientId && f.obraId === artworkId
        );

        if (existingIndex === -1) {
            // Adiciona aos favoritos
            const newFavorite = {
                id: this._generateId(),
                clienteId: clientId,
                obraId: artworkId,
                dataCriacao: new Date().toISOString()
            };
            favorites.push(newFavorite);
            this._saveCollection(this.STORAGE_KEYS.FAVORITES, favorites);
            return { added: true, favorite: newFavorite };
        } else {
            // Remove dos favoritos
            favorites.splice(existingIndex, 1);
            this._saveCollection(this.STORAGE_KEYS.FAVORITES, favorites);
            return { added: false };
        }
    }

    async getFavorites(clientId) {
        const favorites = this._getCollection(this.STORAGE_KEYS.FAVORITES);
        const artworks = this._getCollection(this.STORAGE_KEYS.ARTWORKS);

        return favorites
            .filter(f => f.clienteId === clientId)
            .map(f => ({
                ...f,
                obra: artworks.find(a => a.id === f.obraId)
            }));
    }

    async getFavoritesCount(artworkId) {
        const favorites = this._getCollection(this.STORAGE_KEYS.FAVORITES);
        return favorites.filter(f => f.obraId === artworkId).length;
    }

    // ========================================
    // CARRINHO
    // ========================================
    
    async getOrCreateCart(clientId) {
        const carts = this._getCollection(this.STORAGE_KEYS.CART);
        let cart = carts.find(c => c.clienteId === clientId);

        if (!cart) {
            cart = {
                id: this._generateId(),
                clienteId: clientId,
                dataAtualizacao: new Date().toISOString()
            };
            carts.push(cart);
            this._saveCollection(this.STORAGE_KEYS.CART, carts);
        }

        return cart;
    }

    async addToCart(clientId, artworkId, quantity = 1) {
        const cart = await this.getOrCreateCart(clientId);
        const artwork = await this.getArtwork(artworkId);

        if (artwork.status !== 'DISPONIVEL') {
            throw new Error('Esta obra não está disponível para compra');
        }

        const cartItems = this._getCollection(this.STORAGE_KEYS.CART_ITEMS);
        const existingItem = cartItems.find(
            i => i.carrinhoId === cart.id && i.obraId === artworkId
        );

        if (existingItem) {
            existingItem.quantidade += quantity;
            this._saveCollection(this.STORAGE_KEYS.CART_ITEMS, cartItems);
            return existingItem;
        }

        const newItem = {
            id: this._generateId(),
            carrinhoId: cart.id,
            obraId: artworkId,
            quantidade: quantity,
            precoUnitario: artwork.preco
        };

        cartItems.push(newItem);
        this._saveCollection(this.STORAGE_KEYS.CART_ITEMS, cartItems);

        // Atualiza data do carrinho
        const carts = this._getCollection(this.STORAGE_KEYS.CART);
        const cartIndex = carts.findIndex(c => c.id === cart.id);
        carts[cartIndex].dataAtualizacao = new Date().toISOString();
        this._saveCollection(this.STORAGE_KEYS.CART, carts);

        return newItem;
    }

    async removeFromCart(clientId, artworkId) {
        const cart = await this.getOrCreateCart(clientId);
        const cartItems = this._getCollection(this.STORAGE_KEYS.CART_ITEMS);
        
        const updatedItems = cartItems.filter(
            i => !(i.carrinhoId === cart.id && i.obraId === artworkId)
        );
        
        this._saveCollection(this.STORAGE_KEYS.CART_ITEMS, updatedItems);
    }

    async getCartItems(clientId) {
        const cart = await this.getOrCreateCart(clientId);
        const cartItems = this._getCollection(this.STORAGE_KEYS.CART_ITEMS);
        const artworks = this._getCollection(this.STORAGE_KEYS.ARTWORKS);

        return cartItems
            .filter(i => i.carrinhoId === cart.id)
            .map(i => ({
                ...i,
                obra: artworks.find(a => a.id === i.obraId)
            }));
    }

    // ========================================
    // COMPRAS
    // ========================================
    
    async createPurchase(clientId, addressId) {
        const cartItems = await this.getCartItems(clientId);
        
        if (cartItems.length === 0) {
            throw new Error('Carrinho vazio');
        }

        // Prevent buying own artwork: ensure none of the cart items belong to the buyer
        for (const item of cartItems) {
            const artwork = item.obra || item;
            if (artwork && artwork.artistaId && artwork.artistaId === clientId) {
                throw new Error('Não é permitido comprar sua própria obra');
            }
        }

        // Calcula valor total
        const total = cartItems.reduce(
            (sum, item) => sum + (item.precoUnitario * item.quantidade), 
            0
        );

        // Cria compra
        const now = new Date().toISOString();
        const purchases = this._getCollection(this.STORAGE_KEYS.PURCHASES);
        const newPurchase = {
            id: this._generateId(),
            clienteId: clientId,
            enderecoEntregaId: addressId,
            valorTotal: total,
            status: 'PENDENTE',
            dataCriacao: now,
            dataAtualizacao: now
        };
        purchases.push(newPurchase);
        this._saveCollection(this.STORAGE_KEYS.PURCHASES, purchases);

        // Cria itens da compra
        const purchaseItems = this._getCollection(this.STORAGE_KEYS.PURCHASE_ITEMS);
        const newItems = cartItems.map(item => ({
            id: this._generateId(),
            compraId: newPurchase.id,
            obraId: item.obraId,
            quantidade: item.quantidade,
            precoUnitario: item.precoUnitario
        }));
        purchaseItems.push(...newItems);
        this._saveCollection(this.STORAGE_KEYS.PURCHASE_ITEMS, purchaseItems);

        // Atualiza status das obras
        const artworks = this._getCollection(this.STORAGE_KEYS.ARTWORKS);
        cartItems.forEach(item => {
            const index = artworks.findIndex(a => a.id === item.obraId);
            if (index !== -1) {
                artworks[index].status = 'RESERVADA';
            }
        });
        this._saveCollection(this.STORAGE_KEYS.ARTWORKS, artworks);

        // Limpa carrinho
        const cart = await this.getOrCreateCart(clientId);
        const allCartItems = this._getCollection(this.STORAGE_KEYS.CART_ITEMS);
        const updatedCartItems = allCartItems.filter(i => i.carrinhoId !== cart.id);
        this._saveCollection(this.STORAGE_KEYS.CART_ITEMS, updatedCartItems);

        return {
            purchase: newPurchase,
            items: newItems
        };
    }

    async updatePurchaseStatus(purchaseId, status) {
        const purchases = this._getCollection(this.STORAGE_KEYS.PURCHASES);
        const index = purchases.findIndex(p => p.id === purchaseId);
        
        if (index === -1) {
            throw new Error('Compra não encontrada');
        }

        purchases[index].status = status;
        purchases[index].dataAtualizacao = new Date().toISOString();
        this._saveCollection(this.STORAGE_KEYS.PURCHASES, purchases);

        // Se cancelada, disponibiliza obras novamente
        if (status === 'CANCELADA') {
            const purchaseItems = this._getCollection(this.STORAGE_KEYS.PURCHASE_ITEMS);
            const items = purchaseItems.filter(i => i.compraId === purchaseId);
            
            const artworks = this._getCollection(this.STORAGE_KEYS.ARTWORKS);
            items.forEach(item => {
                const index = artworks.findIndex(a => a.id === item.obraId);
                if (index !== -1) {
                    artworks[index].status = 'DISPONIVEL';
                }
            });
            this._saveCollection(this.STORAGE_KEYS.ARTWORKS, artworks);
        }

        return purchases[index];
    }

        // Formata o status de venda para exibição amigável
        _formatStatus(status) {
            switch (status?.toUpperCase()) {
                case 'PENDENTE': return 'Aguardando Pagamento';
                case 'PAGO': return 'Pago';
                case 'ENVIADO': return 'Enviado';
                case 'ENTREGUE': return 'Entregue';
                case 'CANCELADO': return 'Cancelado';
                default: return 'Pendente';
            }
        }

        // Formata o ID de venda para exibição mais legível
        _formatSaleId(fullId) {
            return typeof fullId === 'string' ? fullId.split('_').pop().slice(-6).toUpperCase() : fullId;
        }

        // Busca vendas onde o artista é o vendedor
        async getArtistSales(artistId) {
            // Busca todas as compras e itens
            const purchases = this._getCollection(this.STORAGE_KEYS.PURCHASES);
            const purchaseItems = this._getCollection(this.STORAGE_KEYS.PURCHASE_ITEMS);
            const artworks = this._getCollection(this.STORAGE_KEYS.ARTWORKS);
            const users = JSON.parse(localStorage.getItem('db_users') || '[]');

            // Filtra compras que incluem obras deste artista
            const salesByArtist = [];

            for (const purchase of purchases) {
                // Encontra itens desta compra que são obras do artista
                const artistItems = purchaseItems
                    .filter(item => {
                        const artwork = artworks.find(a => a.id === item.obraId);
                        return artwork && artwork.artistaId === artistId;
                    })
                    .map(item => {
                        const artwork = artworks.find(a => a.id === item.obraId);
                        return {
                            ...item,
                            obra: artwork
                        };
                    });

                // Se há itens do artista nesta compra, inclui no histórico
                if (artistItems.length > 0) {
                    const total = artistItems.reduce((sum, item) => 
                        sum + (item.precoUnitario * item.quantidade), 0
                    );

                    const comprador = users.find(u => u.id === purchase.clienteId);

                    salesByArtist.push({
                        id: this._formatSaleId(purchase.id),
                        data: purchase.dataCriacao,
                        status: this._formatStatus(purchase.status),
                        valorTotal: total,
                        comprador: comprador ? {
                            id: comprador.id,
                            nome: comprador.nome,
                            email: comprador.email
                        } : null,
                        items: artistItems
                    });
                }
            }

            return salesByArtist.sort((a, b) => new Date(b.data) - new Date(a.data));
        }

    async getPurchaseHistory(clientId) {
        const purchases = this._getCollection(this.STORAGE_KEYS.PURCHASES);
        const purchaseItems = this._getCollection(this.STORAGE_KEYS.PURCHASE_ITEMS);
        const artworks = this._getCollection(this.STORAGE_KEYS.ARTWORKS);

        return purchases
            .filter(p => p.clienteId === clientId)
            .map(p => ({
                ...p,
                items: purchaseItems
                    .filter(i => i.compraId === p.id)
                    .map(i => ({
                        ...i,
                        obra: artworks.find(a => a.id === i.obraId)
                    }))
            }));
    }

        async getArtistSales(artistId) {
            // Busca todas as compras
            const purchases = this._getCollection(this.STORAGE_KEYS.PURCHASES);
            const purchaseItems = this._getCollection(this.STORAGE_KEYS.PURCHASE_ITEMS);
            const artworks = this._getCollection(this.STORAGE_KEYS.ARTWORKS);

            // Filtra compras que incluem obras deste artista
            const artworksByArtist = artworks.filter(a => a.artistaId === artistId).map(a => a.id);
            const salesByArtist = [];

            for (const purchase of purchases) {
                // Busca itens desta compra que são obras do artista
                const artistItems = purchaseItems
                    .filter(i => i.compraId === purchase.id && artworksByArtist.includes(i.obraId))
                    .map(i => ({
                        ...i,
                        obra: artworks.find(a => a.id === i.obraId)
                    }));

                // Se há itens do artista nesta compra, inclui no histórico
                if (artistItems.length > 0) {
                    salesByArtist.push({
                        ...purchase,
                        items: artistItems
                    });
                }
            }

            return salesByArtist;
        }

        _normalizeStatus(status) {
            switch (status?.toUpperCase()) {
                case 'PENDENTE': return 'Aguardando Pagamento';
                case 'PAGO': return 'Pago';
                case 'ENVIADO': return 'Enviado';
                case 'ENTREGUE': return 'Entregue';
                case 'CANCELADO': return 'Cancelado';
                default: return 'Pendente';
            }
        }
}

// Exporta instância única
window.artworkService = new ArtworkService();