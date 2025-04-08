import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';

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
        path: 'admin/category/:id',
        component: CategoryFormComponent,
    },
    
];
