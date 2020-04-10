import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {mergeMap, shareReplay, catchError, map} from 'rxjs/operators';
import {SignedUrl} from '../../interfaces/signed-url/signed-url';
import { of, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  baseUrl = environment.baseUrl;
  data: any;
  cache_size: 1
  cache: any;

  constructor(private http: HttpClient) { }


  getVideos() {
    if(!this.cache) {
      this.cache = this.requestVideos().pipe(
        shareReplay(this.cache_size)
      )
    }

    return this.cache;
  }


  requestVideos(){
    return this.http.get(this.baseUrl + "/videos/getAllVideos").pipe(
      map(response => response)
    )
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
