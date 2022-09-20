import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': 'b56afd1d8bmsh34d18b650616925p1734dfjsn6e3330cf8d6a',
      'X-RapidAPI-Host': 'currency-converter-pro1.p.rapidapi.com'
    }),
    params: {from: 'USD', to: 'VND', amount: '100'},
  };

  constructor(private httpClient: HttpClient) { }

  public getExchangeRate(): Observable<any> {
    return this.httpClient.get<any>('https://currency-converter-pro1.p.rapidapi.com/convert', this.httpOptions);
  }

}
