import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Product } from '../../../types/product';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';

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
  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'discount',
    'shortDescription',
    'description',
    'images',
    'category',
    'action'
  ];

  dataSource = new MatTableDataSource<Product>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    // Umjesto HTTP poziva, koristimo resolver
    const products = this.route.snapshot.data['data'] as Product[];
    this.dataSource.data = products;
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
      alert('Product Deleted!');
      // Ponovno dohvaćanje — može ići direktno iz servisa
      this.productService.getProducts().subscribe((result: Product[]) => {
        this.dataSource.data = result;
      });
    });
  }
}
