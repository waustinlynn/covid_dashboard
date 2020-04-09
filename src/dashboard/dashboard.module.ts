import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashhomeComponent } from './dashhome/dashhome.component';
import { DashService } from './dash.service';
import { HttpClientModule } from '@angular/common/http';

import { ChartModule } from 'primeng/chart';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

import { StateComponent } from './state/state.component';
import { NationalComponent } from './national/national.component';
import { StateSelectorComponent } from './state-selector/state-selector.component';


@NgModule({
  declarations: [DashboardComponent, DashhomeComponent, StateComponent, NationalComponent, StateSelectorComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ChartModule,
    MatSelectModule,
    DashboardRoutingModule,
    MatExpansionModule,
    MatDividerModule,
    MatCheckboxModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    MatCardModule
  ],
  providers: [DashService],
  entryComponents: [StateSelectorComponent]
})
export class DashboardModule { }
