import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Phone, Mail, Edit, Trash2, User } from 'lucide-react';
import type { Contact, User as UserType } from '../types';

interface ContactListProps {
  contacts: Contact[];
  users: UserType[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

export default function ContactList({ contacts, users, onEdit, onDelete }: ContactListProps) {
  const getResponsable = (responsableId?: string) => {
    return users.find(user => user.id === responsableId);
  };

  const calculateCommission = (montant?: number, taux?: number) => {
    if (!montant || !taux) return null;
    return (montant * taux) / 100;
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {contacts.map((contact) => {
        const responsable = getResponsable(contact.responsableId);
        const commission = calculateCommission(contact.montantPotentiel, contact.tauxCommission);

        return (
          <div key={contact.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{contact.nom}</h3>
                <p className="text-gray-600">{contact.entreprise}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(contact)}
                  className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(contact.id)}
                  className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${contact.email}`} className="hover:text-blue-600">{contact.email}</a>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <a href={`tel:${contact.telephone}`} className="hover:text-blue-600">{contact.telephone}</a>
              </div>
              {responsable && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <User className="w-4 h-4" />
                  <span>
                    Responsable: {responsable.nom} ({responsable.role})
                    {responsable.role === 'commercial' && contact.tauxCommission && (
                      <span className="ml-2 text-green-600">
                        Commission: {contact.tauxCommission}%
                        {commission && ` (${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(commission)})`}
                      </span>
                    )}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Dernier contact: {format(contact.dateDernierContact, 'dd MMMM yyyy', { locale: fr })}
                </span>
                {contact.montantPotentiel && (
                  <span className="font-semibold text-green-600">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(contact.montantPotentiel)}
                  </span>
                )}
              </div>
              {contact.notes && (
                <p className="mt-2 text-sm text-gray-600">{contact.notes}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}