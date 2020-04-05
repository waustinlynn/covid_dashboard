import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { StateComponent } from './state/state.component';
import { NationalComponent } from './national/national.component';

const routes: Routes = [
  { path: 'states', component: StateComponent },
  { path: 'national', component: NationalComponent },
  { path: '', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
