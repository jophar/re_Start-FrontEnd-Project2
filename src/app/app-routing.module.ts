import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import { ProductBrowseComponent } from './product-browse/product-browse.component';
import { ErrorComponentComponent } from './error-component/error-component.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { RegisterComponent } from './register/register.component';
import { AuthorizationGuard } from './authorization/authorization.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path : '', component : HomeComponent },
  { path : 'productDetail/:id', component : ProductDetailComponent },
  { path : 'productBrowse/:type/:subMenu', component : ProductBrowseComponent },
  { path : 'register', component : RegisterComponent},
  { path : 'login', component : LoginComponent},
  { path : 'admin', component : AdminPageComponent/*, canActivate:[AuthorizationGuard] */},
  { path :  '**', component : ErrorComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthorizationGuard]
})
export class AppRoutingModule { }
