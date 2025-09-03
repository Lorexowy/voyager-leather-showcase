'use client';

import { useState, useEffect } from 'react';
import { 
  Mail, 
  MailOpen, 
  Search, 
  Filter, 
  Trash2, 
  Reply, 
  Phone,
  Calendar,
  User,
  Package,
  ExternalLink,
  RefreshCw,
  Eye,
  EyeOff,
  MoreVertical,
  Clock
} from 'lucide-react';
import toast from 'react-hot-toast';
import { FirestoreContactMessage } from '@/lib/firestore-types';
import { 
  getContactMessages, 
  markMessageAsRead, 
  markMessageAsUnread,
  markMessageAsReplied,
  deleteContactMessage 
} from '@/lib/contact';
import ConfirmDialog from './ConfirmDialog';

type FilterType = 'all' | 'unread' | 'read' | 'replied' | 'pending';

// NOWY INTERFACE - dodanie callbacku
interface ContactMessagesPanelProps {
  onMessagesChange?: () => void; // Callback wywoływany gdy zmienia się status wiadomości
}

export default function ContactMessagesPanel({ onMessagesChange }: ContactMessagesPanelProps) {
  const [messages, setMessages] = useState<FirestoreContactMessage[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<FirestoreContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedMessage, setSelectedMessage] = useState<FirestoreContactMessage | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<FirestoreContactMessage | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Pobierz wiadomości przy pierwszym renderze
  useEffect(() => {
    fetchMessages();
  }, []);

  // Filtruj wiadomości gdy zmieni się wyszukiwanie lub filtr
  useEffect(() => {
    let filtered = messages;

    // Filtruj według statusu
    switch (filter) {
      case 'unread':
        filtered = filtered.filter(msg => !msg.isRead);
        break;
      case 'read':
        filtered = filtered.filter(msg => msg.isRead);
        break;
      case 'replied':
        filtered = filtered.filter(msg => msg.isReplied);
        break;
      case 'pending':
        filtered = filtered.filter(msg => !msg.isReplied);
        break;
    }

    // Filtruj według wyszukiwania
    if (searchTerm) {
      filtered = filtered.filter(msg =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (msg.productName && msg.productName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredMessages(filtered);
  }, [messages, searchTerm, filter]);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const fetchedMessages = await getContactMessages();
      setMessages(fetchedMessages);
    } catch (error: any) {
      toast.error(error.message || 'Nie udało się pobrać wiadomości');
    } finally {
      setIsLoading(false);
    }
  };

  // ZAKTUALIZOWANA funkcja - dodanie callbacku
  const handleMarkAsRead = async (messageId: string, isRead: boolean) => {
    try {
      if (isRead) {
        await markMessageAsUnread(messageId);
        toast.success('Oznaczono jako nieprzeczytane');
      } else {
        await markMessageAsRead(messageId);
        toast.success('Oznaczono jako przeczytane');
      }
      await fetchMessages();
      // Wywołaj callback aby odświeżyć licznik w dashboard
      if (onMessagesChange) {
        onMessagesChange();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // ZAKTUALIZOWANA funkcja - dodanie callbacku
  const handleMarkAsReplied = async (messageId: string) => {
    try {
      await markMessageAsReplied(messageId);
      toast.success('Oznaczono jako odpowiedziane');
      await fetchMessages();
      // Wywołaj callback aby odświeżyć licznik w dashboard
      if (onMessagesChange) {
        onMessagesChange();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDeleteMessage = (message: FirestoreContactMessage) => {
    setMessageToDelete(message);
    setShowDeleteDialog(true);
  };

  // ZAKTUALIZOWANA funkcja - dodanie callbacku
  const confirmDeleteMessage = async () => {
    if (!messageToDelete) return;

    setIsDeleting(true);
    try {
      await deleteContactMessage(messageToDelete.id);
      toast.success('Wiadomość została usunięta');
      setShowDeleteDialog(false);
      setMessageToDelete(null);
      setSelectedMessage(null);
      await fetchMessages();
      // Wywołaj callback aby odświeżyć licznik w dashboard
      if (onMessagesChange) {
        onMessagesChange();
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const getMessageDate = (message: FirestoreContactMessage) => {
    return message.createdAt.toDate().toLocaleString('pl-PL');
  };

  const stats = {
    total: messages.length,
    unread: messages.filter(msg => !msg.isRead).length,
    replied: messages.filter(msg => msg.isReplied).length,
    pending: messages.filter(msg => !msg.isReplied).length
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <RefreshCw className="w-6 h-6 text-gray-400 animate-spin mr-3" />
          <span className="text-gray-600 font-light">Ładowanie wiadomości...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wider font-light">Wszystkie</p>
              <p className="text-2xl font-light text-gray-900">{stats.total}</p>
            </div>
            <Mail className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wider font-light">Nieprzeczytane</p>
              <p className="text-2xl font-light text-gray-900">{stats.unread}</p>
            </div>
            <MailOpen className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wider font-light">Odpowiedziane</p>
              <p className="text-2xl font-light text-gray-900">{stats.replied}</p>
            </div>
            <Reply className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wider font-light">Oczekujące</p>
              <p className="text-2xl font-light text-gray-900">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-lg font-light text-gray-900">Wiadomości kontaktowe</h2>
            
            <button
              onClick={fetchMessages}
              className="inline-flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors font-light"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Odśwież
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Szukaj wiadomości..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent font-light"
              />
            </div>

            {/* Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterType)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent font-light"
            >
              <option value="all">Wszystkie</option>
              <option value="unread">Nieprzeczytane</option>
              <option value="read">Przeczytane</option>
              <option value="replied">Odpowiedziane</option>
              <option value="pending">Oczekujące</option>
            </select>
          </div>
        </div>

        {/* Messages List */}
        <div className="divide-y divide-gray-200">
          {filteredMessages.length === 0 ? (
            <div className="p-12 text-center">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-light text-gray-900 mb-2">Brak wiadomości</h3>
              <p className="text-gray-500 font-light">
                {searchTerm || filter !== 'all' 
                  ? 'Nie znaleziono wiadomości pasujących do kryteriów.' 
                  : 'Nie otrzymałeś jeszcze żadnych wiadomości.'
                }
              </p>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  !message.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{message.name}</span>
                      </div>
                      
                      <span className="text-gray-400">•</span>
                      
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <a 
                          href={`mailto:${message.email}`}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          {message.email}
                        </a>
                      </div>

                      {message.phone && (
                        <>
                          <span className="text-gray-400">•</span>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <a 
                              href={`tel:${message.phone}`}
                              className="text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              {message.phone}
                            </a>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Product info */}
                    {message.productName && (
                      <div className="flex items-center space-x-2 mb-3">
                        <Package className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-blue-600 font-medium">
                          Zapytanie o: {message.productName}
                        </span>
                      </div>
                    )}

                    {/* Message */}
                    <p className="text-gray-700 font-light mb-4 leading-relaxed">
                      {message.message}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span className="font-light">{getMessageDate(message)}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {!message.isRead && (
                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              Nowe
                            </span>
                          )}
                          
                          {message.isReplied && (
                            <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              Odpowiedziane
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    {/* Mark as read/unread */}
                    <button
                      onClick={() => handleMarkAsRead(message.id, message.isRead)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title={message.isRead ? 'Oznacz jako nieprzeczytane' : 'Oznacz jako przeczytane'}
                    >
                      {message.isRead ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>

                    {/* Mark as replied */}
                    {!message.isReplied && (
                      <button
                        onClick={() => handleMarkAsReplied(message.id)}
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                        title="Oznacz jako odpowiedziane"
                      >
                        <Reply className="w-4 h-4" />
                      </button>
                    )}

                    {/* Delete */}
                    <button
                      onClick={() => handleDeleteMessage(message)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Usuń wiadomość"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Results count */}
        {filteredMessages.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="text-sm text-gray-700 font-light">
              Pokazano <span className="font-medium">{filteredMessages.length}</span> z <span className="font-medium">{messages.length}</span> wiadomości
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setMessageToDelete(null);
        }}
        onConfirm={confirmDeleteMessage}
        title="Usuń wiadomość"
        message={`Czy na pewno chcesz usunąć wiadomość od "${messageToDelete?.name}"? Tej operacji nie można cofnąć.`}
        confirmText="Usuń wiadomość"
        cancelText="Anuluj"
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}