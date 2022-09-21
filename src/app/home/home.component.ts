import { AfterViewInit, Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Exchange } from '../model/exchange.model';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  exchanges: Exchange[] = [];

  constructor(private dataService: DataService) {
    // this.getExchangeRateAndPut();
    this.getExchangeRate();
  }

  ngOnInit(): void {
    setInterval(() => {
      // this.getExchangeRateAndPut();
    }, 10000);
  }

  ngAfterViewInit() {

  }

  getExchangeRateAndPut() {
    this.dataService.getExchange().then(vals => {
      this.exchanges = vals;
      this.exchanges.forEach((exchange) => {
        this.dataService.puttExchange(exchange)
        .subscribe(res => {
          console.log('Update Exchange:', res);
        });
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  getExchangeRate() {
    this.dataService.getExchange().then(vals => {
      this.exchanges = vals;
    })
    .catch(err => {
      console.log(err);
    })
  }
}
