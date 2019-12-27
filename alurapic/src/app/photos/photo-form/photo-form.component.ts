import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from '../photo/photo.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'ap-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;

  constructor(
    private photoService: PhotoService, 
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: [
        '',
        Validators.required
      ],
      description: [
        '',
        Validators.maxLength(300)
      ],
      allowComments: [true]
    })
  }

  upload(){
    const description = this.photoForm.get('description').value;
    const allowComments = this.photoForm.get('allowComments').value;
    
    this.photoService
      .upload(description, allowComments, this.file)
      .subscribe(() => this.router.navigate(['']));
  }

  handleFile(file: File){
    this.file = file;
    
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }
  
}
