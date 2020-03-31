import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { VideoService } from 'src/app/core/services/video/video.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() isLoggedIn;
  createVideo: FormGroup;
  format: string;
  url: any;
  file: any;


  constructor(
    private formBuilder: FormBuilder,
    private videoService: VideoService
  ) { }

  ngOnInit() {
    this.createVideo = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      video: ['', [Validators.required]]
    })
  }


  onSelectFile(event) {
    this.file = event.target.files[0];
    console.log(this.file);
    if (this.file) {
      const reader = new FileReader();
      reader.readAsDataURL(this.file);

      if (this.file.type.indexOf('video') > -1) {
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;

      };
    }
  }

  onClose() {
    this.url = null;
    this.createVideo.reset();
  }

  addNewVideo() {

    if (this.createVideo.invalid) {
      return;
  }

    return this.videoService.createVideo({value: this.createVideo.value, file: this.file }).subscribe(
        results => {
          console.log(results);
          this.createVideo.reset();
        },
        error => {
          console.log(error);
        }
    );

  }

}
