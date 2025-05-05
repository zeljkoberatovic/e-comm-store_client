import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ProductService } from '../../../services/product.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Product } from '../../../types/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'discount', 'shortDescription',
                                             'description', 'images', 'category', 'action'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  productService = inject(ProductService);

  constructor() {
    this.dataSource = new MatTableDataSource<Product>([] as Product[]);
  }

  ngOnInit() {
    this.getServerData();
  }

  private getServerData() {
    this.productService.getProducts().subscribe((result: Product[]) => {
      this.dataSource.data = result; 
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id: string) {
    this.productService.deleteProductById(id).subscribe(() => {
      alert("Product Deleted!");
      this.getServerData(); 
    });
  }
}
