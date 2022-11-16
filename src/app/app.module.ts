import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule }   from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {MatCardModule} from '@angular/material/card';

import { DialogModule } from './pages/dialog/dialog.module';
import { CreateComponent } from './pages/create/create.component';
import { PagesModule } from './pages/pages/pages.module';
import { HomeComponent } from './pages/home/home.component';
import { UserService } from './pages/user.service';
import { ArticlepageComponent } from './pages/articlepage/articlepage.component';
import { AuthGuard } from './guard.guard';
import { UserpageComponent } from './pages/userpage/userpage.component';
import { AnyuserpageComponent } from './pages/anyuserpage/anyuserpage.component';


@NgModule({
  declarations: [
    AppComponent,
    ArticlepageComponent,
    UserpageComponent,
    AnyuserpageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DialogModule,
    HttpClientModule,
    PagesModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
