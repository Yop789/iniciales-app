import { AuthService } from './../../../pages/auth/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  data: any = {};
  constructor(private authSvc: AuthService) {}
  ngOnInit(): void {
    this.authSvc.tokenData$.subscribe((data: any) => {
      this.data = data;
    });
  }
  onLogout() {
    this.authSvc.logout();
    this.data = null;
  }
}
