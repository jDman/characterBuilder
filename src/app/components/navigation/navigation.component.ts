import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout(sessionStorage);
    this.router.navigate(['/auth/login']);
  }
}
