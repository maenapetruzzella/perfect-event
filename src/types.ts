export type EventType = 'Mariage' | 'Réunion' | 'Séminaire' | 'Baptême' | 'Anniversaire' | 'Autre';

export type TableLayout = 'Ronde' | 'Rectangulaire' | 'En U' | 'Théâtre' | 'Cocktail';

export interface MenuChoice {
  starter: string;
  main: string;
  dessert: string;
}

export interface ServiceTimes {
  starter: string;
  main: string;
  dessert: string;
  coffee: string;
}

export type WineType = 'Blanc' | 'Rouge' | 'Rosé' | 'Aucun';

export interface WineFormula {
  type: WineType;
  peopleCount: number | '';
}

export interface EventData {
  id: string;
  code: string;
  clientName: string;
  type: EventType;
  otherEventTypeDescription?: string;
  guestCount: number | '';
  tableLayout: TableLayout;
  menu: MenuChoice;
  allergies: string;
  timing: string;
  date: string;
  rentals: string[];
  coffeeService: boolean;
  champagneAperitif: boolean;
  champagnePeopleCount: number | '';
  serviceTimes: ServiceTimes;
  wineFormula: WineFormula;
  email: string;
}

export const RENTAL_OPTIONS = [
  "Couverts",
  "Chaises",
  "Tables",
  "Nappes",
  "Vaisselle",
  "Tables hautes",
  "Housses",
  "Verres de vins",
  "Verres à eau",
  "Flûtes de champagne"
];

export const MENU_OPTIONS = {
  starters: [
    "Tartare de saumon et pickles de légumes",
    "Croquettes de crevettes et salade",
    "Ravioles au pécorino et crème parmesan"
  ],
  mains: [
    "Filet de cabillaud, purée et chicons",
    "Côte de porc, frites et carottes rôties",
    "Filet de canette, croquettes de pomme de terre et chou rouge"
  ],
  desserts: [
    "Mousse au chocolat",
    "Panna cotta aux fruits rouges",
    "Trio de sorbet framboise, mangue et passion"
  ]
};
