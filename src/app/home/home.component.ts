import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { combineLatest } from 'rxjs';
import { CURRENCY } from '../constants/currency.constants';
import { Exchange } from '../model/exchange.model';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  exchanges: Exchange[] = [];
  timeUpdate: number = 0;
  isLoading: boolean = false;

  constructor(private dataService: DataService) {
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
        this.dataService.puttExchange(exchange)
        .subscribe(res => {
          this.timeUpdate = vals[0].dateTime;
        });
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
      this.timeUpdate = data[0].dateTime;
      this.exchanges = data.sort((a, b) => {
        if(a.from < b.from) { return -1; }
        if(a.from > b.from) { return 1; }
        return 0;
      });
      this.convertData(this.exchanges);
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

  getNameExchangeRate(ob: any): string {
    switch(ob) {
      case CURRENCY.AudToVND.from: {
        ob = CURRENCY.AudToVND.name;
        break;
      }
      case CURRENCY.CadToVND.from: {
        ob = CURRENCY.CadToVND.name;
        break;
      }
      case CURRENCY.ChfToVND.from: {
        ob = CURRENCY.ChfToVND.name;
        break;
      }
      case CURRENCY.CnyToVND.from: {
        ob = CURRENCY.CnyToVND.name;
        break;
      }
      case CURRENCY.DkkToVND.from: {
        ob = CURRENCY.DkkToVND.name;
        break;
      }
      case CURRENCY.EurToVND.from: {
        ob = CURRENCY.EurToVND.name;
        break;
      }
      case CURRENCY.GbpToVND.from: {
        ob = CURRENCY.GbpToVND.name;
        break;
      }
      case CURRENCY.HkdToVND.from: {
        ob = CURRENCY.HkdToVND.name;
        break;
      }
      case CURRENCY.InrToVND.from: {
        ob = CURRENCY.InrToVND.name;
        break;
      }
      case CURRENCY.JpyToVND.from: {
        ob = CURRENCY.JpyToVND.name;
        break;
      }
      case CURRENCY.KrwToVND.from: {
        ob = CURRENCY.KrwToVND.name;
        break;
      }
      case CURRENCY.KwdToVND.from: {
        ob = CURRENCY.KwdToVND.name;
        break;
      }
      case CURRENCY.MyrToVND.from: {
        ob = CURRENCY.MyrToVND.name;
        break;
      }
      case CURRENCY.NokToVND.from: {
        ob = CURRENCY.NokToVND.name;
        break;
      }
      case CURRENCY.RubToVND.from: {
        ob = CURRENCY.RubToVND.name;
        break;
      }
      case CURRENCY.SarToVND.from: {
        ob = CURRENCY.SarToVND.name;
        break;
      }
      case CURRENCY.SekToVND.from: {
        ob = CURRENCY.SekToVND.name;
        break;
      }
      case CURRENCY.SgdToVND.from: {
        ob = CURRENCY.SgdToVND.name;
        break;
      }
      case CURRENCY.ThbToVND.from: {
        ob = CURRENCY.ThbToVND.name;
        break;
      }
      case CURRENCY.UsdToVND.from: {
        ob = CURRENCY.UsdToVND.name;
        break;
      }
      case CURRENCY.LakToVND.from: {
        ob = CURRENCY.LakToVND.name;
        break;
      }
      case CURRENCY.KhrToVND.from: {
        ob = CURRENCY.KhrToVND.name;
        break;
      }
      case CURRENCY.NzdToVND.from: {
        ob = CURRENCY.NzdToVND.name;
        break;
      }
      case CURRENCY.PhpToVND.from: {
        ob = CURRENCY.PhpToVND.name;
        break;
      }
      case CURRENCY.TwdToVND.from: {
        ob = CURRENCY.TwdToVND.name;
        break;
      }
    }
    return ob;
  }

  getFlagSrc(ob: any) {
    switch(ob) {
      case CURRENCY.AudToVND.from: {
        ob = CURRENCY.AudToVND.flag_src;
        break;
      }
      case CURRENCY.CadToVND.from: {
        ob = CURRENCY.CadToVND.flag_src;
        break;
      }
      case CURRENCY.ChfToVND.from: {
        ob = CURRENCY.ChfToVND.flag_src;
        break;
      }
      case CURRENCY.CnyToVND.from: {
        ob = CURRENCY.CnyToVND.flag_src;
        break;
      }
      case CURRENCY.DkkToVND.from: {
        ob = CURRENCY.DkkToVND.flag_src;
        break;
      }
      case CURRENCY.EurToVND.from: {
        ob = CURRENCY.EurToVND.flag_src;
        break;
      }
      case CURRENCY.GbpToVND.from: {
        ob = CURRENCY.GbpToVND.flag_src;
        break;
      }
      case CURRENCY.HkdToVND.from: {
        ob = CURRENCY.HkdToVND.flag_src;
        break;
      }
      case CURRENCY.InrToVND.from: {
        ob = CURRENCY.InrToVND.flag_src;
        break;
      }
      case CURRENCY.JpyToVND.from: {
        ob = CURRENCY.JpyToVND.flag_src;
        break;
      }
      case CURRENCY.KrwToVND.from: {
        ob = CURRENCY.KrwToVND.flag_src;
        break;
      }
      case CURRENCY.KwdToVND.from: {
        ob = CURRENCY.KwdToVND.flag_src;
        break;
      }
      case CURRENCY.MyrToVND.from: {
        ob = CURRENCY.MyrToVND.flag_src;
        break;
      }
      case CURRENCY.NokToVND.from: {
        ob = CURRENCY.NokToVND.flag_src;
        break;
      }
      case CURRENCY.RubToVND.from: {
        ob = CURRENCY.RubToVND.flag_src;
        break;
      }
      case CURRENCY.SarToVND.from: {
        ob = CURRENCY.SarToVND.flag_src;
        break;
      }
      case CURRENCY.SekToVND.from: {
        ob = CURRENCY.SekToVND.flag_src;
        break;
      }
      case CURRENCY.SgdToVND.from: {
        ob = CURRENCY.SgdToVND.flag_src;
        break;
      }
      case CURRENCY.ThbToVND.from: {
        ob = CURRENCY.ThbToVND.flag_src;
        break;
      }
      case CURRENCY.UsdToVND.from: {
        ob = CURRENCY.UsdToVND.flag_src;
        break;
      }

      case CURRENCY.LakToVND.from: {
        ob = CURRENCY.LakToVND.flag_src;
        break;
      }
      case CURRENCY.KhrToVND.from: {
        ob = CURRENCY.KhrToVND.flag_src;
        break;
      }
      case CURRENCY.NzdToVND.from: {
        ob = CURRENCY.NzdToVND.flag_src;
        break;
      }
      case CURRENCY.PhpToVND.from: {
        ob = CURRENCY.PhpToVND.flag_src;
        break;
      }
      case CURRENCY.TwdToVND.from: {
        ob = CURRENCY.TwdToVND.flag_src;
        break;
      }
    }
    return ob;
  }

  convertDateTime(ob: any) {
    return new Date(ob);
  }

  syncExchange() {
    this.isLoading = true;
    this.getExchangeRateAndPut();
    setTimeout(() => {
      this.isLoading = false;
    }, 3000)
  }

  clear(table: Table) {
    table.clear();
  }
}
