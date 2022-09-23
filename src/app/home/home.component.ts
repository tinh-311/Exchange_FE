import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { combineLatest } from 'rxjs';
import { CURRENCY } from '../constants/currency.constant';
import { Exchange } from '../model/exchange.model';
import { DataService } from '../service/data.service';
import { Exchange_helperService } from '../service/exchange_helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  exchanges: Exchange[] = [];
  timeUpdate: number = 0;
  isLoading: boolean = true;
  isSync: boolean = false;

  constructor
  ( private dataService: DataService,
    private exchange_helperService: Exchange_helperService,
    private messageService: MessageService
  ) {
    this.getExchangeRate();
    // this.getExchangeRateAndPut(); // Sync Exchange from API
  }

  ngOnInit(): void {
    // setInterval(() => {
    //   this.getExchangeRateAndPut();
    //   console.log('Updated');
    // }, 3600000);
  }

  getExchangeRateAndPut() {
    this.dataService.getExchange().then(vals => {
      vals.forEach((exchange) => {
        this.dataService.puttExchange(exchange).subscribe();
      })
      this.getExchangeRate();
    })
    .catch(err => {
      console.log(err);
    })
  }

  // Get from DB
  getExchangeRate() {
    this.dataService.getAllExchangeFormDB().then(vals => {
      let data = vals as Exchange[];
      this.exchanges = this.exchange_helperService.sort(data);
      this.timeUpdate = this.exchanges[0].dateTime;
      if(this.isLoading && this.isSync) {
        this.syncComplete();
      }
      this.isLoading = false;
    })
    .catch(err => {
      console.log(err);
    })
  }

  convertData(exchanges: Exchange[]) {
    let dataGrid: any[] = [];
    dataGrid = exchanges;
    dataGrid.forEach(item => {
      item.name = this.getNameExchangeRate(item.from);
    })
  }

  syncComplete() {
    this.messageService.add({severity:'success', summary:'Notify', detail:'All exchange rate was sync'});
  }

  getNameExchangeRate(ob: any): string {
    return this.exchange_helperService.getNameExchangeRate(ob);
  }

  getFlagSrc(ob: any) {
    return this.exchange_helperService.getFlagSrc(ob);
  }

  convertDateTime(ob: any) {
    return new Date(ob);
  }

  syncExchange() {
    this.isLoading = true;
    this.isSync = true;
    this.getExchangeRateAndPut();
  }

  clear(table: Table) {
    table.clear();
  }
}
