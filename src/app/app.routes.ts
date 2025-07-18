import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';
import { ProductsComponent } from './components/manage/products/products.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { AdminDashboardComponent } from './components/manage/admin-dashboard/admin-dashboard.component';


export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    children: [
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'categories/create',
        component: CategoryFormComponent,
      },
      {
        path: 'categories/:id',
        component: CategoryFormComponent,
      },
      {
        path: 'brands',
        component: BrandsComponent,
      },
      {
        path: 'brands/create',
        component: BrandFormComponent,
      },
      {
        path: 'brands/:id',
        component: BrandFormComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'products/create',
        component: ProductFormComponent,
      },
      {
        path: 'products/:id',
        component: ProductFormComponent,
      },
      {
        path: '',
        redirectTo: 'categories',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
  }, 
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
];
