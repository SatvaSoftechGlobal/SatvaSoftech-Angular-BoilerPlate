import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService, StorageKey } from '../storage/storage.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })

export class AuthService {

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  login(data: any): Observable<any> {
    return this.httpClient.post(`${environment.BaseURL}account`, data);
  }
    
  logout() {
    this.storageService.removeValue(StorageKey.authToken);
    this.storageService.removeValue(StorageKey.fullName);
  }

  isLoggedIn(): boolean {
    let token = this.storageService.getValue('authToken'); 
    if (token)
      return true;
    else
      return false;
  }

  getAccessToken(): any {
    let token = this.storageService.getValue(StorageKey.authToken);
    return token ? token : null;
  }
    
}
