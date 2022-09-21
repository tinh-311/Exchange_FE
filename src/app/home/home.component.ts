import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Exchange } from '../model/exchange.model';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  exchanges: Exchange[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getExchange().then(val => {
      this.exchanges = val;
    })
    console.log('🚀 ~ this.exchanges', this.exchanges);
    this.exchanges.forEach((exchange) => {
      this.dataService.puttExchange(exchange)
      .subscribe(res => {
        console.log('🚀 ~ res', res);
      });
    })
  }

  test() {
    this.exchanges.forEach((exchange) => {
      this.dataService.puttExchange(exchange)
      .subscribe(res => {
        console.log('🚀 ~ res', res);
      });
    })
  }

}
