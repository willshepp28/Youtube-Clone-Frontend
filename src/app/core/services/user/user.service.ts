import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private doesUserHaveChannel = new BehaviorSubject(false);

  constructor() {}

  resetUserHasChannel() {
    this.doesUserHaveChannel.next(false);
  }

  UserHasChannel() {
    this.doesUserHaveChannel.next(true);
  }


}
