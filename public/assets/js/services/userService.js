// ========================================
// SERVIÇOS DE USUÁRIO
// ========================================

class UserService {
    constructor() {
        this.STORAGE_KEYS = {
            USERS: 'db_users',
            ARTISTS: 'db_artists',
            CLIENTS: 'db_clients',
            ADDRESSES: 'db_addresses'
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
    // CRUD DE USUÁRIO
    // ========================================
    
    async createUser(userData) {
        const users = this._getCollection(this.STORAGE_KEYS.USERS);
        
        // Verifica email duplicado
        if (users.some(u => u.email === userData.email)) {
            throw new Error('Este e-mail já está cadastrado');
        }

        // Cria usuário base
        const now = new Date().toISOString();
        const newUser = {
            id: this._generateId(),
            nome: userData.name,
            email: userData.email,
            senha: userData.password, // Em produção: deve ser hasheada
            tipo: userData.accountType.toUpperCase(),
            avatar: userData.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${userData.name}`,
            cpf: userData.cpf || null,
            genero: userData.genero || null,
            telefone: userData.telefone || null,
            dataNascimento: userData.dataDeNascimento || userData.data_de_nascimento || null,
            idade: typeof userData.idade !== 'undefined' ? userData.idade : null,
            dataCriacao: now,
            dataAtualizacao: now
        };

        // Adiciona usuário à coleção
        users.push(newUser);
        this._saveCollection(this.STORAGE_KEYS.USERS, users);

        // Cria perfil específico (Artista ou Cliente)
        if (newUser.tipo === 'ARTISTA') {
            const artists = this._getCollection(this.STORAGE_KEYS.ARTISTS);
            const artist = {
                id: this._generateId(),
                usuarioId: newUser.id,
                especialidade: userData.specialty || 'Artista Visual',
                biografia: '',
                portfolio: '',
                redesSociais: {}
            };
            artists.push(artist);
            this._saveCollection(this.STORAGE_KEYS.ARTISTS, artists);
        } else {
            const clients = this._getCollection(this.STORAGE_KEYS.CLIENTS);
            const client = {
                id: this._generateId(),
                usuarioId: newUser.id,
                preferenciasCategorias: []
            };
            clients.push(client);
            this._saveCollection(this.STORAGE_KEYS.CLIENTS, clients);
        }

        // Se endereço foi fornecido, salva
        if (userData.address) {
            const addresses = this._getCollection(this.STORAGE_KEYS.ADDRESSES);
            const address = {
                id: this._generateId(),
                usuarioId: newUser.id,
                ...userData.address,
                principal: true
            };
            addresses.push(address);
            this._saveCollection(this.STORAGE_KEYS.ADDRESSES, addresses);
        }

        return {
            user: newUser,
            token: 'mock-jwt-' + newUser.id // Em produção: usar JWT real
        };
    }

    async getUser(id) {
        const users = this._getCollection(this.STORAGE_KEYS.USERS);
        const user = users.find(u => u.id === id);
        
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Adiciona dados específicos do tipo de usuário
        if (user.tipo === 'ARTISTA') {
            const artists = this._getCollection(this.STORAGE_KEYS.ARTISTS);
            const artistData = artists.find(a => a.usuarioId === id);
            if (artistData) {
                user.profileData = artistData;
            }
        } else {
            const clients = this._getCollection(this.STORAGE_KEYS.CLIENTS);
            const clientData = clients.find(c => c.usuarioId === id);
            if (clientData) {
                user.profileData = clientData;
            }
        }

        // Adiciona endereços
        const addresses = this._getCollection(this.STORAGE_KEYS.ADDRESSES);
        user.addresses = addresses.filter(a => a.usuarioId === id);

        return user;
    }

    async updateUser(id, updateData) {
        const users = this._getCollection(this.STORAGE_KEYS.USERS);
        const index = users.findIndex(u => u.id === id);
        
        if (index === -1) {
            throw new Error('Usuário não encontrado');
        }

        // Atualiza dados base do usuário
        const user = users[index];
        const updatedUser = {
            ...user,
            ...updateData,
            dataAtualizacao: new Date().toISOString()
        };

        users[index] = updatedUser;
        this._saveCollection(this.STORAGE_KEYS.USERS, users);

        // Atualiza dados específicos se fornecidos
        if (updateData.profileData) {
            if (user.tipo === 'ARTISTA') {
                const artists = this._getCollection(this.STORAGE_KEYS.ARTISTS);
                const artistIndex = artists.findIndex(a => a.usuarioId === id);
                if (artistIndex !== -1) {
                    artists[artistIndex] = {
                        ...artists[artistIndex],
                        ...updateData.profileData
                    };
                    this._saveCollection(this.STORAGE_KEYS.ARTISTS, artists);
                }
            } else {
                const clients = this._getCollection(this.STORAGE_KEYS.CLIENTS);
                const clientIndex = clients.findIndex(c => c.usuarioId === id);
                if (clientIndex !== -1) {
                    clients[clientIndex] = {
                        ...clients[clientIndex],
                        ...updateData.profileData
                    };
                    this._saveCollection(this.STORAGE_KEYS.CLIENTS, clients);
                }
            }
        }

        return updatedUser;
    }

    async deleteUser(id) {
        // Remove usuário
        const users = this._getCollection(this.STORAGE_KEYS.USERS);
        const updatedUsers = users.filter(u => u.id !== id);
        this._saveCollection(this.STORAGE_KEYS.USERS, updatedUsers);

        // Remove perfil específico
        const artists = this._getCollection(this.STORAGE_KEYS.ARTISTS);
        const updatedArtists = artists.filter(a => a.usuarioId !== id);
        this._saveCollection(this.STORAGE_KEYS.ARTISTS, updatedArtists);

        const clients = this._getCollection(this.STORAGE_KEYS.CLIENTS);
        const updatedClients = clients.filter(c => c.usuarioId !== id);
        this._saveCollection(this.STORAGE_KEYS.CLIENTS, updatedClients);

        // Remove endereços
        const addresses = this._getCollection(this.STORAGE_KEYS.ADDRESSES);
        const updatedAddresses = addresses.filter(a => a.usuarioId !== id);
        this._saveCollection(this.STORAGE_KEYS.ADDRESSES, updatedAddresses);
    }

    // ========================================
    // AUTENTICAÇÃO
    // ========================================
    
    async login(email, password) {
        const users = this._getCollection(this.STORAGE_KEYS.USERS);
        const user = users.find(u => u.email === email && u.senha === password);
        
        if (!user) {
            throw new Error('E-mail ou senha incorretos');
        }

        // Get the full user data including avatar and other fields
        const fullUserData = await this.getUser(user.id);

        return {
            user: fullUserData,
            token: 'mock-jwt-' + user.id // Em produção: usar JWT real
        };
    }

        // ========================================
        // UTILITÁRIOS
        // ========================================
        async getArtist(artistId) {
            // Busca o usuário base que é artista
            const users = this._getCollection(this.STORAGE_KEYS.USERS);
            const user = users.find(u => u.id === artistId && u.tipo === 'ARTISTA');
            if (!user) return null;
        
            // Busca dados do perfil artista
            const artists = this._getCollection(this.STORAGE_KEYS.ARTISTS);
            const artistData = artists.find(a => a.usuarioId === artistId);
        
            return {
                id: user.id,
                nome: user.nome,
                email: user.email,
                avatar: user.avatar,
                especialidade: artistData?.especialidade || 'Artista Visual',
                biografia: artistData?.biografia || '',
                portfolio: artistData?.portfolio || ''
            };
        }
}

// Exporta instância única
window.userService = new UserService();