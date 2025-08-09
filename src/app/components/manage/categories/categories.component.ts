import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-categories',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    // Umjesto HTTP poziva koristimo podatke iz CommonResolver-a
    this.dataSource.data = this.route.snapshot.data['data'];
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
    this.categoryService.deleteCategoryById(id).subscribe(() => {
      alert('Category Deleted!');
      // Ručno refreshamo jer resolver se ne pokreće automatski
      this.categoryService.getCategories().subscribe(result => {
        this.dataSource.data = result;
      });
    });
  }
}
