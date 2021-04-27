import { Injectable } from '@angular/core';

const TOKEN_KEY = "AuthToken";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  setToken(token: string){
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }
  logOut(){
    sessionStorage.clear();
  }
}
