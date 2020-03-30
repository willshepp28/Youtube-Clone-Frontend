import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  createVideo(data) {
    return this.http.post(this.baseUrl + '/video-upload', data);
  }
}
