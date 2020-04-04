import { Component, OnInit } from '@angular/core';
import { DashService } from './dash.service';
import { SelectItem } from 'primeng';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  usDataOrig: any[];
  gaData: any;
  usData: any;
  gaHistoricalData: any[];
  data: any;
  applicableStates = ['GA', 'LA', 'WA', 'CA', 'NY', 'NJ', 'MI', 'OH', 'FL'];
  dateLabels: string[] = [];

  recordProperties: SelectItem[];
  constructor(private dashService: DashService) { }

  ngOnInit(): void {
    this.dashService.getStateCurrent().subscribe(r => {
      this.gaData = r.find(r => r.state == 'GA');
    });

    this.dashService.getStateDaily().subscribe(r => {
      this.gaHistoricalData = r.filter(r => r.state == 'GA');
      console.log('historical', {
        data: this.gaHistoricalData
      });
      this.dateLabels = this.gaHistoricalData.map(el => el.date).reverse();

      // this.data = this.getGaData();
      let that = this;
      this.data = r.reduce(this.historicalReduction(this.applicableStates), this._seedDataObj());
      this.data.labels = this.dateLabels;
      console.log(this.data);
    });
    this.dashService.getUsDaily().subscribe(r => {
      console.log('usdaily', r);
      this.usDataOrig = r;
      this.setUsData('positiveIncrease');
      this.setRecordProperties(r);
    });
  }

  setRecordProperties(dataSet) {
    this.recordProperties = Object.keys(dataSet[0])
      .filter(key => !isNaN(dataSet[0][key]))
      .map(el => {
        return { label: el, value: el };
      });
    console.log(this.recordProperties);
  }

  setUsData(filterValue) {
    this.usData = this.usDataOrig.reduce((acc, val, currIdx, origArr) => {
      acc.us.data.push(val[filterValue]);
      acc.labels.push(val.date);
      if (currIdx == origArr.length - 1) {
        acc.us.data = acc.us.data.reverse();
        acc.labels = acc.labels.reverse();
        acc.datasets.push(acc.us);
      }
      return acc;
    }, {
      labels: [],
      datasets: [],
      us: {
        label: 'US Positive Increase',
        data: [],
        fill: false,
        borderColor: '#4bc0c0'
      }
    });
  }

  selectData(event) {
    console.log(event);
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
          label: 'Positive Increase',
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
        acc[state].data.push(val.positiveIncrease)
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

  private _seedDataObj() {
    let obj = {
      labels: [],
      datasets: []
    };
    this.applicableStates.forEach(el => {
      obj[el] = {
        label: el,
        data: [],
        fill: false,
        borderColor: this.randoColor()
      }
    });
    return obj;
  }

  usRecordSelected(event) {
    this.setUsData(event.value);
  }
}
