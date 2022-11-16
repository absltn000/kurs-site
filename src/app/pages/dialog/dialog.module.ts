import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

import { Dialogreg } from './dilalogreg/dialogreg.component';
import { DilaloglogComponent } from './dilaloglog/dilaloglog.component';
import { UserService } from '../user.service';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {MatTabsModule} from '@angular/material/tabs';

const MatModules=[MatSliderModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  FormsModule, 
  ReactiveFormsModule,
  MatSelectModule,
  MatProgressBarModule,
  MatCardModule,
  AngularEditorModule,
  MatTabsModule
]

@NgModule({
  declarations: [
    Dialogreg,
    DilaloglogComponent
  ],
  imports: [
    CommonModule,
    MatModules
  ],
  exports:[
    MatModules
  ],
  providers:[UserService]
})
export class DialogModule { }
