import { Component, OnInit } from '@angular/core';
import { VideoService } from 'src/app/core/services/video/video.service';
import { tap } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'youtube-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {
  video: any;
  params: any;
  comments;
  comment_length;
  next_videos;

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
  }  
  }

  ngOnInit() {

    console.clear();
    this.route.paramMap.subscribe(param => {
      this.params = parseInt(param.get('id'))
    })

  
      // this.video = this.videoService.getVideoById(this.params)
      this.videoService.getVideos().subscribe(
        res => {
          this.next_videos = res.filter(r => r.id !== this.params);
          this.video = res.filter(r => r.id === this.params)[0],
          this.comment_length = this.video.Comments.length;
          console.log(this.next_videos)

          // this.comments = this.video.Comments;
        }
      )

     console.log(this.video)
    
  }

}
