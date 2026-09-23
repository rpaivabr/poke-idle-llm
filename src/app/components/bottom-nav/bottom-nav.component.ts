import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { TabType } from '../../models/game.models';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bottom-nav.component.html',
})
export class BottomNavComponent {
  readonly gameService = inject(GameService);

  selectTab(tab: TabType): void {
    this.gameService.setTab(tab);
  }
}
