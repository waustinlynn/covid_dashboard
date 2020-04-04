import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashhomeComponent } from './dashhome/dashhome.component';
import { DashService } from './dash.service';
import { HttpClientModule } from '@angular/common/http';

import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [DashboardComponent, DashhomeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ChartModule,
    DropdownModule,
    DashboardRoutingModule
  ],
  providers: [DashService]
})
export class DashboardModule { }
