export type UserRole = 'administrateur' | 'commercial';

export interface User {
  id: string;
  nom: string;
  role: UserRole;
  tauxCommission?: number;
}

export interface Contact {
  id: string;
  nom: string;
  entreprise: string;
  email: string;
  telephone: string;
  statut: 'négociation' | 'signé';
  dateCreation: Date;
  montantPotentiel?: number;
  dateDernierContact: Date;
  notes: string;
  responsableId?: string;
  tauxCommission?: number;
}