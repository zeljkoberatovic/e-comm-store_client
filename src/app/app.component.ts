import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule,
            RouterModule,
            HeaderComponent,
            FooterComponent],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'webapp';
}
