import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {TokenDto} from '../models/token-dto';
import {Observable} from 'rxjs';
import {ResObj} from '../models/res-obj';

const header = {headers:new HttpHeaders({'Content-Type' : 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class OauthService {
  baseUrl = `${environment.baseURL}oauth/`;
  constructor(
    private http: HttpClient,
  ) { }

  public google(tokenDto: TokenDto):Observable<ResObj> {
    // @ts-ignore
    return this.http.post<any>(`${this.baseUrl}google`,tokenDto,header);
  }

  public facebook(tokenDto: TokenDto):Observable<ResObj> {
    // @ts-ignore
    return this.http.post<TokenDto>(`${this.baseUrl}facebook`,tokenDto,header);
  }
}
