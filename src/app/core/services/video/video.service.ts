import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {mergeMap, shareReplay, catchError, map, filter, tap, flatMap, subscribeOn} from 'rxjs/operators';
import {SignedUrl} from '../../interfaces/signed-url/signed-url';
import { of, EMPTY, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  baseUrl = environment.baseUrl;
  data: any;
  cache_size: 1
  cache: any;
  video;

  constructor(private http: HttpClient) { }


  getVideos() {

    // if no videos in case make http request to get vidoes
    if(!this.cache) {
      this.cache = this.requestVideos().pipe(
        shareReplay(this.cache_size)
      )
    }
    
    return this.cache;
  }


  getVideoById(id) {
    this.getVideos().subscribe(res => 
      this.video = res.filter(r => r.id === id)[0],
   )
   return this.video;
      
  }


  requestVideos(){
    return this.http.get(this.baseUrl + "/videos/getAllVideos")
  }


  createVideo(data) {
    return this.http.post(this.baseUrl + '/video-upload/', data)
      .pipe(
        mergeMap(results => {
          console.log(results);
          console.log(this.getUrl(results))
          return this.http.put(this.getUrl(results), data.file, {
            headers: {
              'Content-Type': 'video/mp4'
            }
          } );
        })
      )
    // return this.http.post(this.baseUrl + '/video-upload', data);
  }

  getUrl(data) {
    return data.url;
  }
}
