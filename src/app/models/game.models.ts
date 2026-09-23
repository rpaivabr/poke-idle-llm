export type TabType = 'gym' | 'shop' | 'center';

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  sprite: string;
}

export interface GameState {
  pokeDollars: number;
  energy: number;
  backpack: ShopItem[];
  activeTab: TabType;
}

export const INITIAL_SHOP_ITEMS: ShopItem[] = [
  {
    id: 'net-ball',
    name: 'Net Ball',
    price: 35,
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/net-ball.png',
  },
  {
    id: 'dive-ball',
    name: 'Dive Ball',
    price: 70,
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dive-ball.png',
  },
  {
    id: 'nest-ball',
    name: 'Nest Ball',
    price: 105,
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/nest-ball.png',
  },
  {
    id: 'repeat-ball',
    name: 'Repeat Ball',
    price: 140,
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/repeat-ball.png',
  },
  {
    id: 'timer-ball',
    name: 'Timer Ball',
    price: 175,
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/timer-ball.png',
  },
  {
    id: 'luxury-ball',
    name: 'Luxury Ball',
    price: 210,
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/luxury-ball.png',
  },
];
