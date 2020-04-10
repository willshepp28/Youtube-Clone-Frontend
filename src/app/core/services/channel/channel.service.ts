import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  createChannel(data) {
    data.has_channel = JSON.parse(localStorage.getItem("has_channel"));
    return this.http.post(this.baseUrl + '/channel/createChannel/', data);
  }
}
