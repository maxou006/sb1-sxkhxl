import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import type { Contact, User } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'négociation' | 'signé'>('négociation');
  const [showForm, setShowForm] = useState(false);
  
  // Exemple d'utilisateurs
  const users: User[] = [
    {
      id: '1',
      nom: 'Jean Admin',
      role: 'administrateur'
    },
    {
      id: '2',
      nom: 'Marie Commercial',
      role: 'commercial',
      tauxCommission: 10
    },
    {
      id: '3',
      nom: 'Pierre Commercial',
      role: 'commercial',
      tauxCommission: 8
    }
  ];

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      nom: 'Jean Dupont',
      entreprise: 'Tech Solutions',
      email: 'jean.dupont@techsolutions.fr',
      telephone: '06 12 34 56 78',
      statut: 'négociation',
      dateCreation: new Date(),
      dateDernierContact: new Date(),
      montantPotentiel: 15000,
      notes: 'Intéressé par notre solution premium',
      responsableId: '2'
    },
    {
      id: '2',
      nom: 'Marie Martin',
      entreprise: 'Digital Services',
      email: 'marie.martin@digitalservices.fr',
      telephone: '06 98 76 54 32',
      statut: 'signé',
      dateCreation: new Date(),
      dateDernierContact: new Date(),
      montantPotentiel: 25000,
      notes: 'Contrat annuel signé',
      responsableId: '3',
      tauxCommission: 8
    }
  ]);
  const [editingContact, setEditingContact] = useState<Contact | undefined>();

  const filteredContacts = contacts.filter(contact => contact.statut === activeTab);

  const handleSubmit = (contactData: Omit<Contact, 'id' | 'dateCreation'>) => {
    if (editingContact) {
      setContacts(contacts.map(c => 
        c.id === editingContact.id 
          ? { ...contactData, id: c.id, dateCreation: c.dateCreation }
          : c
      ));
    } else {
      const newContact: Contact = {
        ...contactData,
        id: Math.random().toString(36).substr(2, 9),
        dateCreation: new Date()
      };
      setContacts([...contacts, newContact]);
    }
    setShowForm(false);
    setEditingContact(undefined);
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      setContacts(contacts.filter(c => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {activeTab === 'négociation' ? 'Contacts en négociation' : 'Contrats signés'}
            </h1>
            <button
              onClick={() => {
                setEditingContact(undefined);
                setShowForm(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Nouveau contact</span>
            </button>
          </div>

          <ContactList
            contacts={filteredContacts}
            users={users}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {showForm && (
        <ContactForm
          contact={editingContact}
          users={users}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingContact(undefined);
          }}
        />
      )}
    </div>
  );
}