import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  addToStorage(key, value){
    localStorage.setItem(key, value);
  }


  removeFromStorage(...key) {
    if (arguments.length > 1) {
      for (const arg of arguments) {
        localStorage.removeItem(arg);
        }
      return;
    }
    localStorage.removeItem(key[0]);
  }
}
