import { Injectable, computed, effect, signal } from '@angular/core';
import { INITIAL_SHOP_ITEMS, ShopItem, TabType } from '../models/game.models';

const STORAGE_KEY = 'pokeidle_save_v1';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  readonly pokeDollars = signal<number>(50);
  readonly energy = signal<number>(100);
  readonly maxEnergy = 100;
  readonly energyCostPerBattle = 10;
  readonly pokeDollarsPerBattle = 20;

  readonly backpack = signal<ShopItem[]>([]);
  readonly activeTab = signal<TabType>('gym');
  readonly shopItems = signal<ShopItem[]>(INITIAL_SHOP_ITEMS);

  // Computed states
  readonly canBattle = computed(() => this.energy() >= this.energyCostPerBattle);
  readonly isExhausted = computed(() => this.energy() < this.energyCostPerBattle);
  readonly isFullEnergy = computed(() => this.energy() >= this.maxEnergy);
  readonly backpackCount = computed(() => this.backpack().length);

  constructor() {
    this.loadState();

    // Auto-save effect
    effect(() => {
      const state = {
        pokeDollars: this.pokeDollars(),
        energy: this.energy(),
        backpack: this.backpack(),
        activeTab: this.activeTab(),
      };
      this.saveState(state);
    });
  }

  setTab(tab: TabType): void {
    this.activeTab.set(tab);
  }

  battle(): boolean {
    if (!this.canBattle()) {
      return false;
    }
    this.energy.update((e) => Math.max(0, e - this.energyCostPerBattle));
    this.pokeDollars.update((p) => p + this.pokeDollarsPerBattle);
    return true;
  }

  heal(): boolean {
    if (this.isFullEnergy()) {
      return false;
    }
    this.energy.set(this.maxEnergy);
    return true;
  }

  canAfford(item: ShopItem): boolean {
    return this.pokeDollars() >= item.price;
  }

  buyItem(item: ShopItem): boolean {
    if (!this.canAfford(item)) {
      return false;
    }
    this.pokeDollars.update((p) => p - item.price);
    this.backpack.update((items) => [...items, item]);
    return true;
  }

  resetGame(): void {
    this.pokeDollars.set(50);
    this.energy.set(100);
    this.backpack.set([]);
    this.activeTab.set('gym');
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  private loadState(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.pokeDollars === 'number') this.pokeDollars.set(parsed.pokeDollars);
        if (typeof parsed.energy === 'number') this.energy.set(parsed.energy);
        if (Array.isArray(parsed.backpack)) this.backpack.set(parsed.backpack);
        if (parsed.activeTab && ['gym', 'shop', 'center'].includes(parsed.activeTab)) {
          this.activeTab.set(parsed.activeTab);
        }
      }
    } catch (e) {
      console.error('Failed to load saved game state', e);
    }
  }

  private saveState(state: unknown): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save game state', e);
    }
  }
}
