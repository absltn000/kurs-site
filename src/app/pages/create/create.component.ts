import {Component, OnInit} from '@angular/core';
import { Article } from '../article/article.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { AngularEditorComponent } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HttpClient } from '@angular/common/http';
import { ArticleService } from '../article/article.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class CreateComponent implements OnInit {
  fileName="";
  fileNameUrl="";
  header = new FormControl();
  context = new FormControl();
  img1="C:\\Users\\peres\\Documents\\web321\\kurs-site\\Warframe0000.jpg";
  img2=document.getElementsByClassName('image-save');
  htmlContent:string;
  x=new Image();
  
  arr:Article[]=[];
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  constructor(private _formBuilder: FormBuilder, private http:ArticleService, 
    private sanitizer:DomSanitizer, private router:Router) {}

  ngOnInit() {
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required],
    // });
    console.log(JSON.parse(localStorage.getItem('user')).id);
  }

  
  onSave()
  {

    let a = new Article(this.htmlContent,this.fileName,this.header.value,this.context.value,JSON.parse(localStorage.getItem('user')).id,new Date,0);
    this.http.addArticle(a).subscribe(
      (user)=>{console.log("Article save:",user)},
      (a)=>{console.log("falled")},
      ()=>{console.log("Save successe")}
    );
    this.router.navigate(['']);
  }


  insertImage(imageUrl:any) {
    this.fileName=imageUrl;
  }
  onFileChanged(event:any) {
    const file = event.target.files[0];
    this.fileNameUrl=file.name;
    if (file.type.includes('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                
                this.insertImage(reader.result.toString());
            };
            reader.readAsDataURL(file);
        
    }
  }
}
