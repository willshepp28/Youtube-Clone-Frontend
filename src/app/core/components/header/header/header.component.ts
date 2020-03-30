import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  createVideo: FormGroup;
  format: string;
  url: any;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.createVideo = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      video: ['']
    })
  }


  onSelectFile(event) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      if (file.type.indexOf('video') > -1) {
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;

      };
    }
  }

  onClose() {
    this.url = null;
  };

}
