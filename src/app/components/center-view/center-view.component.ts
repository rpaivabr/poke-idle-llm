import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-center-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './center-view.component.html',
})
export class CenterViewComponent {
  readonly gameService = inject(GameService);
  readonly isHealing = signal(false);

  // Chansey sprite (Gen 3 / Emerald style matching the screenshot)
  readonly chanseySprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/113.png';

  onHeal(): void {
    if (this.gameService.isFullEnergy()) return;

    this.isHealing.set(true);
    this.gameService.heal();

    setTimeout(() => {
      this.isHealing.set(false);
    }, 600);
  }
}
