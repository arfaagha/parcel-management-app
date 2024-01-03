import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Parcel} from './parcel';

@Injectable({
  providedIn: 'root'
})

export class ParcelService {

  baseUrl= 'http://localhost:3000/parcels';
  parcels: Parcel[]=[];
  constructor(private  http: HttpClient) { 

  }

  getAllParcels(){
    return this.http.get(this.baseUrl);
  }
}
