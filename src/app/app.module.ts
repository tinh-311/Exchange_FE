import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ScrollTopModule} from 'primeng/scrolltop';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    TableModule,
    ToolbarModule,
    ProgressSpinnerModule,
    ScrollTopModule,
    TooltipModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
