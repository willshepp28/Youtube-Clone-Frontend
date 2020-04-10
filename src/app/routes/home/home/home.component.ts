import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/core/services/video/video.service';


@Component({
  selector: 'youtube-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  videos: any;

  constructor(
    private videoService: VideoService
  ) { }

  ngOnInit() {
    this.videos = this.videoService.getVideos(); 
    console.log(this.videos)
  }

}
