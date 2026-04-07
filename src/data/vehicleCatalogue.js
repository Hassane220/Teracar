// Structure centralisée pour toutes les marques et véhicules du catalogue
// Ajoute ici les images et specs pour chaque véhicule de chaque marque

export const vehicleCatalogue = [
  {
    brand: "Ford",
    logo: require('../assets/images/ford/FORD.png'),
    vehicles: [
      {
        name: "Explorer",
        image: require('../assets/images/ford/explorer.png'),
        specs: [
          { label: 'MOTORISATION', value: '6 CYLINDRES 2,3L' },
          { label: 'CARBURANT', value: 'ESSENCE' },
          { label: 'PUISSANCE DIN', value: '280 ch' },
          { label: 'ASSISES', value: '05' },
          { label: 'PUISSANCE FISCALE', value: '14 CV' },
        ]
      },
      // ... autres véhicules Ford
    ]
  },
  {
    brand: "Toyota",
    logo: require('../assets/images/toyota/logo.png'), // à adapter
    vehicles: [
      // ... véhicules Toyota
    ]
  },
  {
    brand: "Hyundai",
    logo: require('../assets/images/hyundai/logo.png'), // à adapter
    vehicles: [
      // ... véhicules Hyundai
    ]
  },
  // ... autres marques
];
