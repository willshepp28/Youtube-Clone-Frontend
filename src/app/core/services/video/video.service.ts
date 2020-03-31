import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {mergeMap} from 'rxjs/operators';
import {SignedUrl} from '../../interfaces/signed-url/signed-url';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  baseUrl = environment.baseUrl;
  data: any;

  constructor(private http: HttpClient) { }

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
