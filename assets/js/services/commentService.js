// ========================================
// SERVIÇO DE COMENTÁRIOS
// ========================================

class CommentService {
    constructor() {
        this.STORAGE_KEYS = {
            COMMENTS: 'db_comments',
            REPLIES: 'db_comment_replies'
        };
    }

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
    // COMENTÁRIOS
    // ========================================
    
    async createComment(artworkId, userId, texto) {
        if (!texto || texto.trim().length === 0) {
            throw new Error('Comentário não pode estar vazio');
        }

        const comments = this._getCollection(this.STORAGE_KEYS.COMMENTS);
        
        const newComment = {
            id: this._generateId(),
            obraId: artworkId,
            usuarioId: userId,
            texto: texto.trim(),
            dataCriacao: new Date().toISOString(),
            respostas: []
        };

        comments.push(newComment);
        this._saveCollection(this.STORAGE_KEYS.COMMENTS, comments);

        return newComment;
    }

    async getComments(artworkId) {
        const comments = this._getCollection(this.STORAGE_KEYS.COMMENTS);
        return comments
            .filter(c => c.obraId === artworkId)
            .sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
    }

    async deleteComment(commentId, userId, isArtist = false) {
        const comments = this._getCollection(this.STORAGE_KEYS.COMMENTS);
        const comment = comments.find(c => c.id === commentId);

        if (!comment) {
            throw new Error('Comentário não encontrado');
        }

        // Apenas o autor do comentário ou o artista podem deletar
        if (comment.usuarioId !== userId && !isArtist) {
            throw new Error('Você não tem permissão para deletar este comentário');
        }

        const updatedComments = comments.filter(c => c.id !== commentId);
        this._saveCollection(this.STORAGE_KEYS.COMMENTS, updatedComments);

        return { deleted: true };
    }

    // ========================================
    // RESPOSTAS
    // ========================================
    
    async createReply(commentId, artistId, texto) {
        if (!texto || texto.trim().length === 0) {
            throw new Error('Resposta não pode estar vazia');
        }

        const comments = this._getCollection(this.STORAGE_KEYS.COMMENTS);
        const comment = comments.find(c => c.id === commentId);

        if (!comment) {
            throw new Error('Comentário não encontrado');
        }

        const newReply = {
            id: this._generateId(),
            artistaId: artistId,
            texto: texto.trim(),
            dataCriacao: new Date().toISOString()
        };

        if (!comment.respostas) {
            comment.respostas = [];
        }

        comment.respostas.push(newReply);
        this._saveCollection(this.STORAGE_KEYS.COMMENTS, comments);

        return newReply;
    }

    async deleteReply(commentId, replyId, artistId) {
        const comments = this._getCollection(this.STORAGE_KEYS.COMMENTS);
        const comment = comments.find(c => c.id === commentId);

        if (!comment) {
            throw new Error('Comentário não encontrado');
        }

        const reply = comment.respostas?.find(r => r.id === replyId);

        if (!reply) {
            throw new Error('Resposta não encontrada');
        }

        // Apenas o artista que fez a resposta pode deletar
        if (reply.artistaId !== artistId) {
            throw new Error('Você não tem permissão para deletar esta resposta');
        }

        comment.respostas = comment.respostas.filter(r => r.id !== replyId);
        this._saveCollection(this.STORAGE_KEYS.COMMENTS, comments);

        return { deleted: true };
    }

    // ========================================
    // UTILITÁRIOS
    // ========================================
    
    async isCommentAuthor(commentId, userId) {
        const comments = this._getCollection(this.STORAGE_KEYS.COMMENTS);
        const comment = comments.find(c => c.id === commentId);
        return comment && comment.usuarioId === userId;
    }

    async isReplyAuthor(commentId, replyId, artistId) {
        const comments = this._getCollection(this.STORAGE_KEYS.COMMENTS);
        const comment = comments.find(c => c.id === commentId);
        const reply = comment?.respostas?.find(r => r.id === replyId);
        return reply && reply.artistaId === artistId;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return 'agora';
        if (diffMins < 60) return `há ${diffMins}min`;
        if (diffHours < 24) return `há ${diffHours}h`;
        if (diffDays < 30) return `há ${diffDays}d`;

        return date.toLocaleDateString('pt-BR');
    }
}

// Exporta instância única
window.commentService = new CommentService();
