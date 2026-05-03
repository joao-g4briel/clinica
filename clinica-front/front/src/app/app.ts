import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav>
      <span class="logo">🏥 Clínica</span>
      <div class="links">
        <a routerLink="/pacientes" routerLinkActive="active">Pacientes</a>
        <a routerLink="/agendamentos" routerLinkActive="active">Agendamentos</a>
      </div>
    </nav>
    <router-outlet />
  `,
  styles: [`
    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      height: 56px;
      background: #1e293b;
      color: #fff;
    }
    .logo { font-weight: 700; font-size: 1rem; }
    .links { display: flex; gap: 8px; }
    .links a {
      color: #94a3b8;
      text-decoration: none;
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 0.9rem;
    }
    .links a:hover { color: #fff; background: #334155; }
    .links a.active { color: #fff; background: #3b82f6; }
  `]
})
export class App {}
