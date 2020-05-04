import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userHasChannel = new BehaviorSubject(JSON.parse(localStorage.getItem('has_channel')) || false);
  private UserProfilePic = new BehaviorSubject(localStorage.getItem('profile_pic') || null)

  constructor(
    private storageService: StorageService
  ) {}


  setUserProfilePic(profile_pic_url){
    this.storageService.addToStorage("profile_pic", profile_pic_url);
    this.UserProfilePic.next(localStorage.getItem("profile_pic"));
  }

  setUserHasChannel(value) {
    this.storageService.addToStorage("has_channel", value);
    this.userHasChannel.next(JSON.parse(localStorage.getItem("has_channel")));
  }

  doesUserHaveChannel() {
    return this.userHasChannel.asObservable();
  }

  resetUserHasChannel() {
    this.userHasChannel.next(false);
  }


}
