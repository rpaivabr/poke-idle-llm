import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-gym-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gym-view.component.html',
})
export class GymViewComponent {
  readonly gameService = inject(GameService);
  readonly isAttacking = signal(false);

  // Bulbasaur sprite (Gen 3 / Emerald style matching the screenshot)
  readonly pokemonSprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';

  onBattle(): void {
    if (!this.gameService.canBattle()) return;

    this.isAttacking.set(true);
    this.gameService.battle();

    setTimeout(() => {
      this.isAttacking.set(false);
    }, 300);
  }
}
