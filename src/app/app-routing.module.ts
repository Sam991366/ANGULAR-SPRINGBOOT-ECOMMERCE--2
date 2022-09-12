import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

const routes: Routes = [

  {path: 'products/:id',component: ProductDetailsComponent},
  {path: 'search/:keyword',component: ProductsListComponent},
  {path: 'category/:id',component: ProductsListComponent},
  {path: 'category',component: ProductsListComponent},
  {path: 'products',component: ProductsListComponent},
  {path: '',redirectTo: '/products', pathMatch:'full'},
  {path: '**',redirectTo: '/products', pathMatch:'full'}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
