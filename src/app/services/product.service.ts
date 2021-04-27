import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product';

const header = {headers:new HttpHeaders({'Content-Type' : 'application/json'})};


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = `${environment.baseURL}product/`;
  constructor(
    private http:HttpClient
  ) { }

  public getList():Observable<Product[]> {
    // @ts-ignore
    return this.http.get<Product[]>(`${this.baseUrl}getAll`, header);
  }
}
