import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { combineLatest, forkJoin, map, Observable, switchMap } from 'rxjs';
import { Exchange } from './../model/exchange.model';
import { CURRENCY } from '../constants/currency.constant'
import { API_KEY } from '../constants/keyApi.constant';
import { Exchange_helperService } from './exchange_helper.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(private httpClient: HttpClient, private exchange_helperService: Exchange_helperService,) { }

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
        'X-RapidAPI-Key': API_KEY.KEY_8,
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

  public getAllExchangeFormDB() {
    return new Promise((resolve, reject) => {
      this.getExchangeFromDB().subscribe(res => {
          let data: any[];
          data = res;
          data.forEach(item => {
            item.name = this.getNameExchangeRate(item.from);
          })
          resolve(data);
      })
    })
  }

  getNameExchangeRate(ob: any): string {
    return this.exchange_helperService.getNameExchangeRate(ob);
  }

  // DB
  public getExchangeFromDB(): Observable<Exchange[]> {
    return this.httpClient.get<Exchange[]>(`https://exchangenodejs.herokuapp.com/exchange`, this.httpOptions);
  }

  public getExchangeByIdFromDB(id: any): Observable<Exchange> {
    return this.httpClient.get<Exchange>(`https://exchangenodejs.herokuapp.com/exchange/${id}`, this.httpOptions);
  }
}
