import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard.guard';
import { AnyuserpageComponent } from './pages/anyuserpage/anyuserpage.component';
import { ArticlepageComponent } from './pages/articlepage/articlepage.component';
import { CreateComponent } from './pages/create/create.component';
import { HomeComponent } from './pages/home/home.component';
import { UserpageComponent } from './pages/userpage/userpage.component';

const routes: Routes = [
   {
     path:'',
     component:HomeComponent,
   },
   {
    path:'create',
    component:CreateComponent,
    canActivate:[AuthGuard]
   },
   {
    path:'articlepage',
    component:ArticlepageComponent
   },
   {
     path:'options',
     component:UserpageComponent,
     canActivate:[AuthGuard]
   },
   {
     path:'anyuser',
     component:AnyuserpageComponent,
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
