import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';
import { ProductsComponent } from './components/manage/products/products.component';


export const routes: Routes = [
    {
        path: "",
        component: HomeComponent,
    },
    {
        path: 'admin/categories',
        component: CategoriesComponent,
    },
    {
        path: 'admin/categories/create',
        component: CategoryFormComponent,
    },
    {
        path: 'admin/categories/:id',
        component: CategoryFormComponent,
    },

    // Dodavanje ruta za brendove
    {
        path: 'admin/brands',
        component: BrandsComponent,
    },
    {
        path: 'admin/brands/create',
        component: BrandFormComponent,
    },
    {
        path: 'admin/brands/:id',
        component: BrandFormComponent,
    },
    
    // Dodavanje ruta za proizvode
    {
        path: 'admin/products',
        component: ProductsComponent,
    },
    
];
