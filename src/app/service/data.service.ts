import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { combineLatest, forkJoin, map, Observable, switchMap } from 'rxjs';
import { Exchange } from './../model/exchange.model';
import { CURRENCY } from '../constants/currency.constants'


@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': 'b56afd1d8bmsh34d18b650616925p1734dfjsn6e3330cf8d6a',
      'X-RapidAPI-Host': 'currency-converter-pro1.p.rapidapi.com'
    }),
  }

  // Ex params // {from: 'USD', to: 'VND', amount: '100'}
  public getExchangeFromApi(params: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': 'a3fa9372ffmshb5af8e60656a483p1866e2jsncb80e7e2cab4',
        'X-RapidAPI-Host': 'currency-converter-pro1.p.rapidapi.com'
      }),
      params: params,
    };
    return this.httpClient.get<any>('https://currency-converter-pro1.p.rapidapi.com/convert', httpOptions);
  }

  public postExchange(payLoad: Exchange): Observable<Exchange> {
    return this.httpClient.post<Exchange>('https://exchangenodejs.herokuapp.com/exchange', payLoad, this.httpOptions);
  }

  public puttExchange(payLoad: Exchange): Observable<Exchange> {
    return this.httpClient.put<Exchange>(`https://exchangenodejs.herokuapp.com/exchange/:id`, payLoad, this.httpOptions);
  }

  public mappingData(ob: any): Exchange {
    const meta = ob?.meta;
    const request = ob?.request;
    const result = meta?.rates?.from;
    let res: Exchange = {
      from: request?.from,
      to: request?.to,
      result: result,
      dateTime: meta?.timestamp,
    }

    return res;
  }

  public async getExchange(): Promise<Exchange[]> {
    let data: Exchange[] = [];
    return new Promise((resolve, reject) => {
      let currencys = Object.values(CURRENCY);

      currencys.forEach(currency => {
        combineLatest(
          this.getExchangeFromApi(currency)
        ).subscribe(([res]) => {
          data.push(this.mappingData(res));
          let length = Object.entries(CURRENCY).length;
          if (data.length === length){
            resolve(data);
          }
        })
      })
    })
  }

  // DB
  public getExchangeFromDB() {
    return this.httpClient.get<Exchange>(`https://exchangenodejs.herokuapp.com/exchange`, this.httpOptions);
  }

  public getExchangeByIdFromDB(id: any) {
    return this.httpClient.get<Exchange>(`https://exchangenodejs.herokuapp.com/exchange/${id}`, this.httpOptions);
  }
}
