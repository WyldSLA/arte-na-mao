// ========================================
// SERVIÇOS DE EVENTOS
// ========================================

class EventService {
    constructor() {
        this.STORAGE_KEYS = {
            EVENTS: 'db_events',
            EVENT_PARTICIPANTS: 'db_event_participants'
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
    // CRUD DE EVENTOS
    // ========================================
    
    async createEvent(artistId, eventData) {
        const events = this._getCollection(this.STORAGE_KEYS.EVENTS);
        
        const now = new Date().toISOString();
        const newEvent = {
            id: this._generateId(),
            artistaId: artistId,
            titulo: eventData.title,
            descricao: eventData.description || '',
            data: new Date(eventData.date).toISOString(),
            local: eventData.location,
            categoria: eventData.category || 'outros',
            imagemUrl: eventData.imageUrl,
            capacidade: eventData.capacity || null,
            participantes: 0,
            status: 'AGENDADO',
            dataCriacao: now,
            dataAtualizacao: now
        };

        events.push(newEvent);
        this._saveCollection(this.STORAGE_KEYS.EVENTS, events);

        return newEvent;
    }

    async getEvent(id) {
        const events = this._getCollection(this.STORAGE_KEYS.EVENTS);
        const event = events.find(e => e.id === id);
        
        if (!event) {
            throw new Error('Evento não encontrado');
        }

        return event;
    }

    async updateEvent(id, updateData) {
        const events = this._getCollection(this.STORAGE_KEYS.EVENTS);
        const index = events.findIndex(e => e.id === id);
        
        if (index === -1) {
            throw new Error('Evento não encontrado');
        }

        const event = events[index];
        const updatedEvent = {
            ...event,
            ...updateData,
            dataAtualizacao: new Date().toISOString()
        };

        events[index] = updatedEvent;
        this._saveCollection(this.STORAGE_KEYS.EVENTS, events);

        return updatedEvent;
    }

    async deleteEvent(id) {
        const events = this._getCollection(this.STORAGE_KEYS.EVENTS);
        const updatedEvents = events.filter(e => e.id !== id);
        this._saveCollection(this.STORAGE_KEYS.EVENTS, updatedEvents);

        // Remove participantes
        const participants = this._getCollection(this.STORAGE_KEYS.EVENT_PARTICIPANTS);
        const updatedParticipants = participants.filter(p => p.eventoId !== id);
        this._saveCollection(this.STORAGE_KEYS.EVENT_PARTICIPANTS, updatedParticipants);
    }

    // ========================================
    // OPERAÇÕES DE LISTAGEM
    // ========================================
    
    async listEvents(filters = {}) {
        let events = this._getCollection(this.STORAGE_KEYS.EVENTS);

        // Aplica filtros
        if (filters.artistId) {
            events = events.filter(e => e.artistaId === filters.artistId);
        }
        if (filters.category) {
            events = events.filter(e => e.categoria === filters.category);
        }
        if (filters.status) {
            events = events.filter(e => e.status === filters.status);
        }
        if (filters.fromDate) {
            events = events.filter(e => new Date(e.data) >= new Date(filters.fromDate));
        }
        if (filters.toDate) {
            events = events.filter(e => new Date(e.data) <= new Date(filters.toDate));
        }

        // Ordena por data
        events.sort((a, b) => new Date(a.data) - new Date(b.data));

        return events;
    }

    async getUpcomingEvents() {
        const now = new Date();
        const events = await this.listEvents();
        return events.filter(e => new Date(e.data) > now);
    }

    // ========================================
    // PARTICIPANTES
    // ========================================
    
    async toggleParticipation(userId, eventId) {
        const event = await this.getEvent(eventId);
        const participants = this._getCollection(this.STORAGE_KEYS.EVENT_PARTICIPANTS);
        
        const existingParticipant = participants.find(
            p => p.eventoId === eventId && p.usuarioId === userId
        );

        if (existingParticipant) {
            // Remove participação
            const updatedParticipants = participants.filter(
                p => !(p.eventoId === eventId && p.usuarioId === userId)
            );
            this._saveCollection(this.STORAGE_KEYS.EVENT_PARTICIPANTS, updatedParticipants);

            // Atualiza contador do evento
            const events = this._getCollection(this.STORAGE_KEYS.EVENTS);
            const eventIndex = events.findIndex(e => e.id === eventId);
            events[eventIndex].participantes--;
            this._saveCollection(this.STORAGE_KEYS.EVENTS, events);

            return { participating: false };
        } else {
            // Verifica capacidade
            if (event.capacidade && event.participantes >= event.capacidade) {
                throw new Error('Evento lotado');
            }

            // Adiciona participação
            const now = new Date().toISOString();
            const newParticipant = {
                id: this._generateId(),
                eventoId: eventId,
                usuarioId: userId,
                status: 'CONFIRMADO',
                dataCriacao: now
            };
            participants.push(newParticipant);
            this._saveCollection(this.STORAGE_KEYS.EVENT_PARTICIPANTS, participants);

            // Atualiza contador do evento
            const events = this._getCollection(this.STORAGE_KEYS.EVENTS);
            const eventIndex = events.findIndex(e => e.id === eventId);
            events[eventIndex].participantes++;
            this._saveCollection(this.STORAGE_KEYS.EVENTS, events);

            return { participating: true, participant: newParticipant };
        }
    }

    async getEventParticipants(eventId) {
        const participants = this._getCollection(this.STORAGE_KEYS.EVENT_PARTICIPANTS);
        return participants.filter(p => p.eventoId === eventId);
    }

    async getUserEvents(userId) {
        const participants = this._getCollection(this.STORAGE_KEYS.EVENT_PARTICIPANTS);
        const events = this._getCollection(this.STORAGE_KEYS.EVENTS);

        const participations = participants.filter(p => p.usuarioId === userId);
        return participations.map(p => ({
            ...p,
            event: events.find(e => e.id === p.eventoId)
        }));
    }
}

// Exporta instância única
window.eventService = new EventService();