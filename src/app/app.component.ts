import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [MatButtonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'webapp';
}
