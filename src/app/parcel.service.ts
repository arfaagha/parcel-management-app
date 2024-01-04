import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Parcel } from "./parcel";
import { Observable, catchError, of } from "rxjs";
import { environment } from "../environment/environment";

@Injectable({
  providedIn: "root",
})
export class ParcelService {
  baseUrl = environment.apiUrl;
  parcels: Parcel[] = [];
  constructor(private http: HttpClient) {}

  getAllParcels(): Observable<Object | Parcel[]> {
    // TODO: Searching and filtering can be done using the same call

    return this.http
      .get(this.baseUrl + "/parcels")
      .pipe(catchError(this.handleError<Parcel[]>("getAllParcels", [])));
  }

  createParcel(parcel: Parcel) {
    return this.http.post(this.baseUrl + "/parcels", { parcel });
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  checkSkuValidity(sku: string): Observable<Object | boolean> {
    return this.http
      .get(this.baseUrl + "/parcels/" + sku.trim())
      .pipe(catchError(this.handleError<boolean>("checkSkuValidity", false)));
  }
}
