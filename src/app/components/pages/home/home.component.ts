
import { CustomerService } from '../../../services/customer.service';
import { Product } from '../../../types/product';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  customerService = inject(CustomerService);
  newProduct: Product[] = [];
  featuredProduct: Product[] = [];

  ngOnInit() {
    this.customerService.getFeaturedProducts().subscribe((result) => {
      this.featuredProduct = result;
      console.log(this.featuredProduct);
    });
    this.customerService.getNewProducts().subscribe((result) => {
      this.newProduct = result;
      console.log(this.newProduct);
    });
  }
  


}
