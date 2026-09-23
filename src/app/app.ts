import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from './services/game.service';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { GymViewComponent } from './components/gym-view/gym-view.component';
import { ShopViewComponent } from './components/shop-view/shop-view.component';
import { CenterViewComponent } from './components/center-view/center-view.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TopBarComponent,
    GymViewComponent,
    ShopViewComponent,
    CenterViewComponent,
    BottomNavComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly gameService = inject(GameService);
}
