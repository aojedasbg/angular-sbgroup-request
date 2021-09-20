import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SatWsService {

  constructor(
    private http: HttpClient
  ) { }

  public route = environment.sysConfig.apiUrl;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  createCredentials(data: any) {
    // return this.http.post(this.route + '', data, this.httpOptions);
    return this.http.post<Response>(this.route + 'solicitud', data, this.httpOptions).pipe(
      map(response => {
        return {success: true, response};
      }), catchError(err => {
        return throwError({success: false, response: err});
      })
    );
  }

}
