import React from 'react';
import { Users, FileCheck } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-900 h-screen fixed left-0 top-0 text-white">
      <div className="p-4">
        <div className="flex items-center justify-center mb-8">
          <img 
            src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_3456/https://www.ecollecte-cda.fr/wp-content/uploads/2023/10/cropped-Logo-e.collecte-Cote-dAzur.png" 
            alt="E.collecte Logo" 
            className="h-12 w-auto object-contain"
          />
        </div>
        
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('négociation')}
            className={`w-full flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              activeTab === 'négociation' ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Contacts en négociation</span>
          </button>
          
          <button
            onClick={() => setActiveTab('signé')}
            className={`w-full flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              activeTab === 'signé' ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`}
          >
            <FileCheck className="w-5 h-5" />
            <span>Contrats signés</span>
          </button>
        </nav>
      </div>
    </div>
  );
}