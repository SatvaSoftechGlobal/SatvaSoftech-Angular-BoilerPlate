import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {

  constructor() { }

  getValue(key: string): any {
    return localStorage.getItem(key);
  }

  setValue(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeValue(key: string): void {
    localStorage.removeItem(key);
  }

}

export class StorageKey {
  public static authToken = 'authToken'; 
  public static fullName = 'fullName';
}
