import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import statesCurrent from '../data/statescurrent.json';
import statesDaily from '../data/statesdaily.json';
import usDaily from '../data/usdaily.json';
import { of } from 'rxjs';

@Injectable()
export class DashService {

  baseUrl = 'https://covidtracking.com/api';
  stateCurrent = '/v1/states/current.json';
  stateHistorical = '/v1/states/daily.json';
  constructor(private http: HttpClient) {
  }

  getStateCurrent() {
    return of(statesCurrent);
  }

  getStateDaily() {
    return of(statesDaily);
  }

  getUsDaily() {
    return of(usDaily);
  }

}
