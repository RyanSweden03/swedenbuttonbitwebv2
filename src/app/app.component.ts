import { Component } from '@angular/core';
import {DashboardComponent} from './Components/dashboard/dashboard.component';
import {FooterComponent} from './Components/footer/footer.component';
import {HeaderComponent} from './Components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SwedenButtonPayrollDev';
}
