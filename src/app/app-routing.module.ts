import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import { ProductBrowseComponent } from './product-browse/product-browse.component';

const routes: Routes = [
  { path : '', component : HomeComponent },
  { path : 'productDetail/:id', component : ProductDetailComponent },
  { path : 'productBrowse/:type/:subMenu', component : ProductBrowseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
