import { Component, OnInit } from '@angular/core';
import { DashService } from '../dash.service';

@Component({
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

  stateOrigData: any[];
  gaData: any;
  gaHistoricalData: any[];
  data: any;
  applicableStates = ['GA', 'SC', 'NC', 'TN', 'AL', 'MS', 'OH'];
  dateLabels: string[] = [];
  states: string[] = [];
  properties: string[] = [];
  filterProperty: string = 'positiveIncrease';

  constructor(private dashService: DashService) { }

  ngOnInit(): void {
    this.dashService.getStateCurrent().subscribe(r => {
      this.gaData = r.find(r => r.state == 'GA');
      this.states = r.map(r => r.state);
    });

    this.dashService.getStateDaily().subscribe(r => {
      this.gaHistoricalData = r.filter(r => r.state == 'GA');
      this.dateLabels = this.gaHistoricalData.map(el => el.date).reverse();
      // this.data = this.getGaData();
      this.stateOrigData = r;
      this.properties = Object.keys(this.stateOrigData[0]).filter(key => !isNaN(this.stateOrigData[0][key]));
      this.reloadStates(this.applicableStates);
    });
  }

  reloadStates(states: string[]) {
    this.data = this.stateOrigData.reduce(this.historicalReduction(states), this._seedDataObj(states));
    this.data.labels = this.dateLabels;
  }

  statesSelected(event) {
    console.log(event);
    this.applicableStates = event;
    this.reloadStates(event);
  }

  propertiesSelected(event) {
    console.log(event);
    this.filterProperty = event[0];
    this.reloadStates(this.applicableStates);
  }

  getGaData() {
    return this.gaHistoricalData.reduce((acc, val, currIdx, origArr) => {
      acc.labels.push(val.date);
      acc.posIncrease.data.push(val.positiveIncrease);
      if (currIdx == origArr.length - 1) {
        acc.posIncrease.data = acc.posIncrease.data.reverse();
        acc.labels = acc.labels.reverse();
        acc.datasets.push(acc.posIncrease);
      }
      return acc;
    },
      {
        labels: [],
        datasets: [],
        posIncrease: {
          label: this.filterProperty,
          data: [],
          fill: false,
          borderColor: '#4bc0c0'
        }
      });
  }

  randoColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);

  }

  historicalReduction(states) {
    return (acc, val, currIdx, origArr) => {
      let state = val.state;
      if (states.includes(state)) {
        acc[state].data.push(val[this.filterProperty]);
      }
      if (currIdx == origArr.length - 1) {
        states.forEach(st => {
          acc[st].data = acc[st].data.reverse();
          acc.datasets.push({ ...acc[st] });
          delete acc[st];
        });
      }
      return acc;
    }
  }

  private _seedDataObj(states) {
    let obj = {
      labels: [],
      datasets: []
    };
    states.forEach(el => {
      obj[el] = {
        label: el,
        data: [],
        fill: false,
        borderColor: this.randoColor()
      }
    });
    return obj;
  }

}
