import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Contact, User } from '../types';

interface ContactFormProps {
  contact?: Contact;
  users: User[];
  onSubmit: (contact: Omit<Contact, 'id' | 'dateCreation'>) => void;
  onClose: () => void;
}

export default function ContactForm({ contact, users, onSubmit, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    nom: contact?.nom || '',
    entreprise: contact?.entreprise || '',
    email: contact?.email || '',
    telephone: contact?.telephone || '',
    statut: contact?.statut || 'négociation',
    montantPotentiel: contact?.montantPotentiel?.toString() || '',
    notes: contact?.notes || '',
    responsableId: contact?.responsableId || '',
    tauxCommission: contact?.tauxCommission?.toString() || ''
  });

  useEffect(() => {
    if (formData.responsableId) {
      const selectedUser = users.find(u => u.id === formData.responsableId);
      if (selectedUser?.role === 'commercial' && selectedUser?.tauxCommission) {
        setFormData(prev => ({
          ...prev,
          tauxCommission: selectedUser.tauxCommission?.toString()
        }));
      }
    }
  }, [formData.responsableId, users]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      montantPotentiel: formData.montantPotentiel ? parseFloat(formData.montantPotentiel) : undefined,
      tauxCommission: formData.tauxCommission ? parseFloat(formData.tauxCommission) : undefined,
      dateDernierContact: new Date()
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">
            {contact ? 'Modifier le contact' : 'Nouveau contact'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Entreprise</label>
            <input
              type="text"
              value={formData.entreprise}
              onChange={(e) => setFormData({ ...formData, entreprise: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Téléphone</label>
            <input
              type="tel"
              value={formData.telephone}
              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Statut</label>
            <select
              value={formData.statut}
              onChange={(e) => setFormData({ ...formData, statut: e.target.value as 'négociation' | 'signé' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="négociation">En négociation</option>
              <option value="signé">Contrat signé</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Responsable</label>
            <select
              value={formData.responsableId}
              onChange={(e) => setFormData({ ...formData, responsableId: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Sélectionner un responsable</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.nom} ({user.role})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Montant potentiel (€)</label>
            <input
              type="number"
              value={formData.montantPotentiel}
              onChange={(e) => setFormData({ ...formData, montantPotentiel: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              step="0.01"
            />
          </div>

          {formData.responsableId && users.find(u => u.id === formData.responsableId)?.role === 'commercial' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Taux de commission (%)</label>
              <input
                type="number"
                value={formData.tauxCommission}
                onChange={(e) => setFormData({ ...formData, tauxCommission: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                step="0.1"
                min="0"
                max="100"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {contact ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}