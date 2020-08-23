import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsGalleryComponent } from './items-gallery/items-gallery.component';
import { LoginComponent } from './login/login.component';
import { LoggedInGuard } from './logged-in.guard';
import { NotLoggedInGuard } from './not-logged-in.guard';

const routes: Routes = [
  {path:"", component: LoginComponent, canActivate: [NotLoggedInGuard]},
  {path:"home", component: ItemsGalleryComponent, canActivate: [LoggedInGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
