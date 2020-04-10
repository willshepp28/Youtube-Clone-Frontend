import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userHasChannel = new BehaviorSubject(JSON.parse(localStorage.getItem('has_channel')) || false);

  constructor(
    private storageService: StorageService
  ) {}

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
