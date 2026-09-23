import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { ShopItem } from '../../models/game.models';

@Component({
  selector: 'app-shop-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop-view.component.html',
})
export class ShopViewComponent {
  readonly gameService = inject(GameService);

  onBuy(item: ShopItem): void {
    this.gameService.buyItem(item);
  }
}
