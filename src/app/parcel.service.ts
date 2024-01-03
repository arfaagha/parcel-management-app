import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Parcel} from './parcel';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})

export class ParcelService {

  baseUrl= environment.apiUrl;
  parcels: Parcel[]=[];
  constructor(private  http: HttpClient) { 

  }

  getAllParcels(): Observable<Object | Parcel[]>{
    return this.http.get(this.baseUrl+ '/parcels').pipe(
      catchError(this.handleError<Parcel[]>('getAllParcels', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
