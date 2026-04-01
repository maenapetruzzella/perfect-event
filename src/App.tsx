import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Users, 
  Layout, 
  Utensils, 
  AlertCircle, 
  Clock, 
  ChevronRight, 
  CheckCircle2, 
  ArrowLeft,
  PartyPopper,
  ShieldCheck,
  Coffee,
  Package,
  Info,
  Wine
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { EventData, EventType, TableLayout, MENU_OPTIONS, RENTAL_OPTIONS, WineFormula } from './types';

const INITIAL_EVENT: EventData = {
  id: '1',
  code: 'EVENT2026',
  clientName: 'Client Démo',
  type: 'Mariage',
  otherEventTypeDescription: '',
  guestCount: 50,
  tableLayout: 'Ronde',
  menu: {
    starter: MENU_OPTIONS.starters[0],
    main: MENU_OPTIONS.mains[0],
    dessert: MENU_OPTIONS.desserts[0]
  },
  allergies: '',
  timing: '18:00 - Accueil\n19:30 - Dîner\n22:00 - Soirée',
  date: '2026-06-15',
  rentals: [],
  coffeeService: false,
  champagneAperitif: false,
  champagnePeopleCount: '',
  serviceTimes: {
    starter: '19:30',
    main: '20:30',
    dessert: '21:30',
    coffee: '22:00'
  },
  wineFormula: {
    type: 'Aucun',
    peopleCount: ''
  },
  email: ''
};

const TablePlan = ({ layout }: { layout: TableLayout }) => {
  const renderLayout = () => {
    switch (layout) {
      case 'Ronde':
        return (
          <div className="flex flex-wrap justify-center gap-4 p-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="relative w-16 h-16 rounded-full border-2 border-blue-200 flex items-center justify-center">
                <div className="absolute -top-2 w-4 h-4 rounded-full bg-blue-100" />
                <div className="absolute -bottom-2 w-4 h-4 rounded-full bg-blue-100" />
                <div className="absolute -left-2 w-4 h-4 rounded-full bg-blue-100" />
                <div className="absolute -right-2 w-4 h-4 rounded-full bg-blue-100" />
                <span className="text-[10px] text-blue-400">Table</span>
              </div>
            ))}
          </div>
        );
      case 'Rectangulaire':
        return (
          <div className="flex flex-col items-center gap-4 p-4">
            {[1, 2].map(i => (
              <div key={i} className="w-40 h-12 rounded-md border-2 border-blue-200 flex items-center justify-center relative">
                <div className="absolute -top-2 left-2 right-2 flex justify-between px-2">
                  {[1, 2, 3, 4].map(j => <div key={j} className="w-3 h-3 rounded-full bg-blue-100" />)}
                </div>
                <div className="absolute -bottom-2 left-2 right-2 flex justify-between px-2">
                  {[1, 2, 3, 4].map(j => <div key={j} className="w-3 h-3 rounded-full bg-blue-100" />)}
                </div>
                <span className="text-[10px] text-blue-400">Banquette</span>
              </div>
            ))}
          </div>
        );
      case 'En U':
        return (
          <div className="p-4 flex justify-center">
            <div className="w-32 h-32 border-l-8 border-t-8 border-r-8 border-blue-100 rounded-t-lg relative">
              <div className="absolute -left-6 top-0 bottom-0 flex flex-col justify-between py-2">
                {[1, 2, 3].map(i => <div key={i} className="w-4 h-4 rounded-full bg-blue-200" />)}
              </div>
              <div className="absolute -right-6 top-0 bottom-0 flex flex-col justify-between py-2">
                {[1, 2, 3].map(i => <div key={i} className="w-4 h-4 rounded-full bg-blue-200" />)}
              </div>
              <div className="absolute -top-6 left-0 right-0 flex justify-between px-2">
                {[1, 2, 3].map(i => <div key={i} className="w-4 h-4 rounded-full bg-blue-200" />)}
              </div>
            </div>
          </div>
        );
      case 'Théâtre':
        return (
          <div className="flex flex-col gap-2 p-4 items-center">
            {[1, 2, 3, 4].map(row => (
              <div key={row} className="flex gap-2">
                {[1, 2, 3, 4, 5].map(seat => (
                  <div key={seat} className="w-4 h-4 rounded-sm bg-blue-100 border border-blue-200" />
                ))}
              </div>
            ))}
            <div className="w-32 h-2 bg-gray-200 rounded-full mt-4" />
            <span className="text-[8px] text-gray-400 uppercase">Scène</span>
          </div>
        );
      case 'Cocktail':
        return (
          <div className="flex flex-wrap justify-center gap-6 p-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-blue-200 flex items-center justify-center relative">
                <div className="absolute w-12 h-12 rounded-full border border-dashed border-blue-100" />
                <div className="w-2 h-2 rounded-full bg-blue-400" />
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-blue-50/50 rounded-2xl border border-blue-100 mt-4 overflow-hidden">
      <div className="bg-blue-100/50 px-4 py-2 text-[10px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2">
        <Info size={12} />
        Aperçu de la disposition
      </div>
      {renderLayout()}
    </div>
  );
};

export default function App() {
  const [accessCode, setAccessCode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [eventData, setEventData] = useState<EventData>(INITIAL_EVENT);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.toUpperCase() === 'EVENT2026') {
      setIsAuthorized(true);
    } else {
      alert('Code invalide. Essayez "EVENT2026" pour la démo.');
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const toggleRental = (option: string) => {
    const rentals = eventData.rentals.includes(option)
      ? eventData.rentals.filter(r => r !== option)
      : [...eventData.rentals, option];
    setEventData({ ...eventData, rentals });
  };

  const eventInfoForAI = `
    Nom du site : YOUR PERFECT EVENT
    Type d'événement : ${eventData.type}
    Nombre de personnes : ${eventData.guestCount}
    Disposition des tables : ${eventData.tableLayout}
    Menu choisi :
    - Entrée : ${eventData.menu.starter} (Service à ${eventData.serviceTimes.starter})
    - Plat : ${eventData.menu.main} (Service à ${eventData.serviceTimes.main})
    - Dessert : ${eventData.menu.dessert} (Service à ${eventData.serviceTimes.dessert})
    - Café/Thé : ${eventData.coffeeService ? 'Oui' : 'Non'} (Service à ${eventData.serviceTimes.coffee})
    - Champagne : ${eventData.champagneAperitif ? 'Oui' : 'Non'}
    
    Formule Vins :
    - Type : ${eventData.wineFormula.type}
    - Pour combien de personnes : ${eventData.wineFormula.peopleCount || 0}
    
    Location de matériel : ${eventData.rentals.length > 0 ? eventData.rentals.join(', ') : 'Aucune'}
    Allergies spécifiées : ${eventData.allergies || 'Aucune'}
    Timing global : ${eventData.timing}
    
    Options de menu disponibles :
    Entrées : ${MENU_OPTIONS.starters.join(', ')}
    Plats : ${MENU_OPTIONS.mains.join(', ')}
    Desserts : ${MENU_OPTIONS.desserts.join(', ')}
    
    Matériel disponible à la location : ${RENTAL_OPTIONS.join(', ')}
  `;

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#F5F2ED] flex items-center justify-center p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-stone-200"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-stone-800 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-stone-200">
              <ShieldCheck className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-serif font-bold text-stone-900">YOUR PERFECT EVENT</h1>
            <p className="text-stone-500 text-sm mt-2 text-center italic">
              Veuillez entrer le code fourni par votre organisatrice pour accéder à votre espace professionnel.
            </p>
          </div>

          <form onSubmit={handleAccess} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1 ml-1">
                Code d'accès
              </label>
              <input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Ex: EVENT2026"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-500 focus:border-transparent outline-none transition-all text-lg font-mono tracking-widest text-center"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-stone-800 text-white py-4 rounded-xl font-semibold hover:bg-stone-900 transition-colors flex items-center justify-center gap-2 group"
            >
              Accéder à mon espace
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-stone-100 text-center">
            <p className="text-xs text-stone-400 italic">
              Organisé par YOUR PERFECT EVENT
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F2ED] font-sans pb-24">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsAuthorized(false)}
              className="p-2 hover:bg-stone-50 rounded-lg transition-colors text-stone-400"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">YOUR PERFECT EVENT</h2>
              <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">{eventData.type} • Code: {eventData.code}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={cn(
                "px-6 py-2.5 rounded-full font-semibold text-sm transition-all flex items-center gap-2",
                showSuccess ? "bg-green-600 text-white" : "bg-stone-800 text-white hover:bg-stone-900"
              )}
            >
              {isSaving ? "Enregistrement..." : showSuccess ? (
                <>
                  <CheckCircle2 size={18} />
                  Enregistré
                </>
              ) : "Enregistrer les choix"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Configuration */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Section: Type & Guests */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <PartyPopper size={20} />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900">Informations Générales</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Type d'événement
                  </label>
                  <select
                    value={eventData.type}
                    onChange={(e) => setEventData({ ...eventData, type: e.target.value as EventType })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  >
                    <option>Mariage</option>
                    <option>Réunion</option>
                    <option>Séminaire</option>
                    <option>Baptême</option>
                    <option>Anniversaire</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Nombre de personnes
                  </label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      inputMode="numeric"
                      value={eventData.guestCount === 0 ? '' : eventData.guestCount}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setEventData({ ...eventData, guestCount: val === '' ? '' : parseInt(val) });
                      }}
                      placeholder="0"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Votre adresse mail
                  </label>
                  <input
                    type="email"
                    value={eventData.email}
                    onChange={(e) => setEventData({ ...eventData, email: e.target.value })}
                    placeholder="exemple@mail.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {eventData.type === 'Autre' && (
                <div className="mt-6 animate-in fade-in slide-in-from-top-2">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Décrivez votre événement
                  </label>
                  <textarea
                    value={eventData.otherEventTypeDescription}
                    onChange={(e) => setEventData({ ...eventData, otherEventTypeDescription: e.target.value })}
                    placeholder="Dites-nous en plus sur le type d'événement que vous organisez..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[80px]"
                  />
                </div>
              )}
            </section>

            {/* Section: Layout */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                  <Layout size={20} />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900">Disposition des Tables</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {(['Ronde', 'Rectangulaire', 'En U', 'Théâtre', 'Cocktail'] as TableLayout[]).map((layout) => (
                  <button
                    key={layout}
                    onClick={() => setEventData({ ...eventData, tableLayout: layout })}
                    className={cn(
                      "flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all",
                      eventData.tableLayout === layout 
                        ? "border-blue-600 bg-blue-50 text-blue-600" 
                        : "border-gray-100 hover:border-gray-200 text-gray-500"
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                      <div className={cn(
                        "w-4 h-4 rounded-sm border-2",
                        eventData.tableLayout === layout ? "border-blue-600" : "border-gray-300"
                      )} />
                    </div>
                    <span className="text-xs font-bold">{layout}</span>
                  </button>
                ))}
              </div>

              <TablePlan layout={eventData.tableLayout} />
              
              {['Ronde', 'Rectangulaire', 'En U'].includes(eventData.tableLayout) && (
                <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
                  <Info size={18} className="text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-amber-800">
                    Pour cette disposition, vous pouvez nous envoyer votre plan de table souhaité à <a href="mailto:yourperfectevent@gmail.com" className="font-bold underline">yourperfectevent@gmail.com</a>.
                  </p>
                </div>
              )}
            </section>

            {/* Section: Rentals */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <Package size={20} />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900">Location de Matériel</h3>
              </div>
              <p className="text-sm text-gray-500 mb-6">Souhaitez-vous louer du matériel pour votre événement ?</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {RENTAL_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => toggleRental(option)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-sm font-medium",
                      eventData.rentals.includes(option)
                        ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                        : "border-gray-100 hover:border-gray-200 text-gray-600"
                    )}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                      eventData.rentals.includes(option) ? "bg-emerald-500 border-emerald-500" : "bg-white border-gray-300"
                    )}>
                      {eventData.rentals.includes(option) && <CheckCircle2 size={14} className="text-white" />}
                    </div>
                    {option}
                  </button>
                ))}
              </div>
            </section>

            {/* Section: Wine & Champagne */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-pink-600">
                  <Wine size={20} />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900">Boissons & Apéritif</h3>
              </div>
              
              <div className="space-y-8">
                {/* Champagne Option */}
                <div className="p-6 bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl border border-pink-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-pink-500 shadow-sm">
                        <PartyPopper size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Champagne en apéritif</h4>
                        <p className="text-xs text-gray-500">Souhaitez-vous proposer du champagne à vos invités ?</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setEventData({ ...eventData, champagneAperitif: !eventData.champagneAperitif })}
                      className={cn(
                        "w-12 h-6 rounded-full transition-all relative",
                        eventData.champagneAperitif ? "bg-pink-500" : "bg-gray-200"
                      )}
                    >
                      <div className={cn(
                        "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                        eventData.champagneAperitif ? "left-7" : "left-1"
                      )} />
                    </button>
                  </div>

                  {eventData.champagneAperitif && (
                    <div className="mt-6 pt-6 border-t border-pink-100 animate-in fade-in slide-in-from-top-2">
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Pour combien de personnes ?
                      </label>
                      <div className="relative max-w-[200px]">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          inputMode="numeric"
                          value={eventData.champagnePeopleCount === 0 ? '' : eventData.champagnePeopleCount}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            setEventData({ 
                              ...eventData, 
                              champagnePeopleCount: val === '' ? '' : parseInt(val)
                            });
                          }}
                          placeholder="0"
                          className="w-full pl-12 pr-4 py-3 bg-white border border-pink-100 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Wine Selection */}
                <div className="space-y-4">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Formule Vins (Un seul choix possible)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {(['Blanc', 'Rouge', 'Rosé', 'Aucun'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setEventData({ 
                          ...eventData, 
                          wineFormula: { ...eventData.wineFormula, type } 
                        })}
                        className={cn(
                          "flex items-center justify-between px-5 py-4 rounded-2xl border transition-all",
                          eventData.wineFormula.type === type
                            ? "border-pink-200 bg-pink-50 text-pink-900"
                            : "border-gray-100 hover:border-gray-200 text-gray-600"
                        )}
                      >
                        <span className="text-sm font-bold">{type}</span>
                        <div className={cn(
                          "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                          eventData.wineFormula.type === type ? "bg-pink-500 border-pink-500" : "bg-white border-gray-300"
                        )}>
                          {eventData.wineFormula.type === type && <CheckCircle2 size={14} className="text-white" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  {eventData.wineFormula.type !== 'Aucun' && (
                    <div className="pt-4 animate-in fade-in slide-in-from-top-2">
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Pour combien de personnes ?
                      </label>
                      <div className="relative max-w-[200px]">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          inputMode="numeric"
                          value={eventData.wineFormula.peopleCount === 0 ? '' : eventData.wineFormula.peopleCount}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            setEventData({ 
                              ...eventData, 
                              wineFormula: { ...eventData.wineFormula, peopleCount: val === '' ? '' : parseInt(val) } 
                            });
                          }}
                          placeholder="0"
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Supplier Note */}
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-3">
                  <Info size={18} className="text-gray-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-gray-600 leading-relaxed italic">
                    Pour le vin et le champagne, nous travaillons en collaboration avec un vigneron de confiance. Si vous souhaitez un autre fournisseur, merci de nous en informer par mail afin que nous puissions prendre contact avec celui-ci.
                  </p>
                </div>
              </div>
            </section>

            {/* Section: Menu */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                  <Utensils size={20} />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900">Choix du Menu & Horaires</h3>
              </div>
              
              <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
                <Clock size={18} className="text-amber-500 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-800 leading-relaxed">
                  Note : Nos services sont disponibles de <strong>11h00</strong> à <strong>03h00</strong> du matin maximum. Merci de respecter ce créneau pour vos choix d'horaires.
                </p>
              </div>
              
              <div className="space-y-8">
                {/* Starter */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Entrée</label>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-gray-400" />
                      <input 
                        type="time" 
                        value={eventData.serviceTimes.starter}
                        onChange={(e) => setEventData({ ...eventData, serviceTimes: { ...eventData.serviceTimes, starter: e.target.value } })}
                        className="text-xs font-bold bg-gray-50 border-none rounded p-1 outline-none focus:ring-1 focus:ring-orange-200"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {MENU_OPTIONS.starters.map((option) => (
                      <button
                        key={option}
                        onClick={() => setEventData({ ...eventData, menu: { ...eventData.menu, starter: option } })}
                        className={cn(
                          "text-left px-5 py-4 rounded-2xl border transition-all flex items-center justify-between group",
                          eventData.menu.starter === option 
                            ? "border-orange-200 bg-orange-50 text-orange-900" 
                            : "border-gray-100 hover:border-gray-200 text-gray-600"
                        )}
                      >
                        <span className="text-sm font-medium">{option}</span>
                        {eventData.menu.starter === option && <CheckCircle2 size={18} className="text-orange-500" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Plat Principal</label>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-gray-400" />
                      <input 
                        type="time" 
                        value={eventData.serviceTimes.main}
                        onChange={(e) => setEventData({ ...eventData, serviceTimes: { ...eventData.serviceTimes, main: e.target.value } })}
                        className="text-xs font-bold bg-gray-50 border-none rounded p-1 outline-none focus:ring-1 focus:ring-orange-200"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {MENU_OPTIONS.mains.map((option) => (
                      <button
                        key={option}
                        onClick={() => setEventData({ ...eventData, menu: { ...eventData.menu, main: option } })}
                        className={cn(
                          "text-left px-5 py-4 rounded-2xl border transition-all flex items-center justify-between group",
                          eventData.menu.main === option 
                            ? "border-orange-200 bg-orange-50 text-orange-900" 
                            : "border-gray-100 hover:border-gray-200 text-gray-600"
                        )}
                      >
                        <span className="text-sm font-medium">{option}</span>
                        {eventData.menu.main === option && <CheckCircle2 size={18} className="text-orange-500" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dessert */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Dessert</label>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-gray-400" />
                      <input 
                        type="time" 
                        value={eventData.serviceTimes.dessert}
                        onChange={(e) => setEventData({ ...eventData, serviceTimes: { ...eventData.serviceTimes, dessert: e.target.value } })}
                        className="text-xs font-bold bg-gray-50 border-none rounded p-1 outline-none focus:ring-1 focus:ring-orange-200"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {MENU_OPTIONS.desserts.map((option) => (
                      <button
                        key={option}
                        onClick={() => setEventData({ ...eventData, menu: { ...eventData.menu, dessert: option } })}
                        className={cn(
                          "text-left px-5 py-4 rounded-2xl border transition-all flex items-center justify-between group",
                          eventData.menu.dessert === option 
                            ? "border-orange-200 bg-orange-50 text-orange-900" 
                            : "border-gray-100 hover:border-gray-200 text-gray-600"
                        )}
                      >
                        <span className="text-sm font-medium">{option}</span>
                        {eventData.menu.dessert === option && <CheckCircle2 size={18} className="text-orange-500" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Coffee Service */}
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                        <Coffee size={16} />
                      </div>
                      <span className="text-sm font-bold text-gray-700">Service Café / Thé après dessert</span>
                    </div>
                    <button
                      onClick={() => setEventData({ ...eventData, coffeeService: !eventData.coffeeService })}
                      className={cn(
                        "w-12 h-6 rounded-full transition-all relative",
                        eventData.coffeeService ? "bg-amber-500" : "bg-gray-200"
                      )}
                    >
                      <div className={cn(
                        "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                        eventData.coffeeService ? "left-7" : "left-1"
                      )} />
                    </button>
                  </div>
                  {eventData.coffeeService && (
                    <div className="flex items-center gap-2 pl-11">
                      <Clock size={14} className="text-gray-400" />
                      <span className="text-xs text-gray-500">Heure souhaitée :</span>
                      <input 
                        type="time" 
                        value={eventData.serviceTimes.coffee}
                        onChange={(e) => setEventData({ ...eventData, serviceTimes: { ...eventData.serviceTimes, coffee: e.target.value } })}
                        className="text-xs font-bold bg-gray-50 border-none rounded p-1 outline-none focus:ring-1 focus:ring-amber-200"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Section: Allergies */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
                  <AlertCircle size={20} />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900">Allergies & Régimes</h3>
              </div>
              <textarea
                value={eventData.allergies}
                onChange={(e) => setEventData({ ...eventData, allergies: e.target.value })}
                placeholder="Précisez ici les allergies ou régimes alimentaires spécifiques..."
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[120px]"
              />
              <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-3">
                <Info size={18} className="text-blue-500 mt-0.5 shrink-0" />
                <p className="text-xs text-blue-800 leading-relaxed">
                  Si vos allergies vous empêchent de consommer les éléments de notre menu, nous vous contacterons par mail avec des options différentes, définies par notre chef en fonction des produits de saison.
                </p>
              </div>
            </section>
          </div>

          {/* Right Column: Timing & Summary */}
          <div className="space-y-8">
            
            {/* Section: Timing */}
            <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <Clock size={20} />
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900">Timing Global</h3>
              </div>
              <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-2">
                <Info size={14} className="text-blue-500" />
                <p className="text-[10px] text-blue-700 italic">
                  Rappel : Amplitude horaire de 11h00 à 03h00 maximum.
                </p>
              </div>
              <textarea
                value={eventData.timing}
                onChange={(e) => setEventData({ ...eventData, timing: e.target.value })}
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[200px] font-mono text-sm leading-relaxed"
              />
              <div className="mt-4 p-4 bg-stone-50 rounded-xl border border-stone-100 flex items-start gap-3">
                <Info size={18} className="text-stone-400 mt-0.5 shrink-0" />
                <p className="text-xs text-stone-600 leading-relaxed italic">
                  Note : Nous ne travaillons pas avec un DJ. Si vous en avez besoin, vous devrez en employer un de votre côté.
                </p>
              </div>
            </section>

            {/* Summary Card */}
            <div className="bg-stone-800 rounded-3xl p-8 text-white shadow-xl shadow-stone-200">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <CheckCircle2 size={20} />
                Récapitulatif
              </h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="opacity-70">Invités</span>
                  <span className="font-bold">{eventData.guestCount || 0} pers.</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="opacity-70">Table</span>
                  <span className="font-bold">{eventData.tableLayout}</span>
                </div>
                {eventData.champagneAperitif && (
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="opacity-70">Champagne</span>
                    <span className="font-bold">Oui {eventData.champagnePeopleCount && `(${eventData.champagnePeopleCount} pers.)`}</span>
                  </div>
                )}
                {eventData.wineFormula.type !== 'Aucun' && (
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="opacity-70">Vin</span>
                    <span className="font-bold">
                      {eventData.wineFormula.type}
                      {eventData.wineFormula.peopleCount && ` (${eventData.wineFormula.peopleCount} pers.)`}
                    </span>
                  </div>
                )}
                <div className="pt-2">
                  <span className="opacity-70 block mb-1">Menu & Horaires</span>
                  <div className="text-[10px] space-y-1 opacity-90">
                    <p>Entrée: {eventData.serviceTimes.starter}</p>
                    <p>Plat: {eventData.serviceTimes.main}</p>
                    <p>Dessert: {eventData.serviceTimes.dessert}</p>
                    {eventData.coffeeService && <p>Café: {eventData.serviceTimes.coffee}</p>}
                  </div>
                </div>
                {eventData.rentals.length > 0 && (
                  <div className="pt-2">
                    <span className="opacity-70 block mb-1">Location</span>
                    <p className="text-[10px] opacity-90">{eventData.rentals.join(', ')}</p>
                  </div>
                )}
              </div>
              <div className="mt-8 p-4 bg-white/10 rounded-2xl border border-white/10 space-y-3">
                <p className="text-[10px] leading-relaxed opacity-90">
                  Le calcul du prix vous sera communiqué par mail suite à l'envoi de votre dossier.
                </p>
                <p className="text-[10px] leading-relaxed opacity-90">
                  Une question ? Contactez-nous : <a href="mailto:yourperfectevent@gmail.com" className="underline font-bold">yourperfectevent@gmail.com</a>
                </p>
                <p className="text-xs leading-relaxed opacity-90 italic pt-2 border-t border-white/5">
                  "Merci de nous faire confiance pour votre événement."
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
