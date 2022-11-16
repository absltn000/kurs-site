import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatStepperModule} from '@angular/material/stepper';
import { UserService } from '../user.service';
import { ArticleService } from '../article/article.service';
import { DialogModule } from '../dialog/dialog.module';
import { HomeComponent } from '../home/home.component';
import { CreateComponent } from '../create/create.component';
import { AuthService } from '../auth.service';
import { SearchService } from '../search.service';




@NgModule({
  declarations: [
    HomeComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    DialogModule
  ],
  exports:[
    MatStepperModule
  ],
  providers:[UserService,ArticleService,AuthService,SearchService]
})
export class PagesModule { }
