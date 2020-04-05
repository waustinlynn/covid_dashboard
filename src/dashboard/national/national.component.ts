import { Component, OnInit } from '@angular/core';
import { DashService } from '../dash.service';

@Component({
  templateUrl: './national.component.html',
  styleUrls: ['./national.component.scss']
})
export class NationalComponent implements OnInit {

  usDataOrig: any[];
  usData: any;
  filterValues: string[] = ['hospitalizedCurrently', 'inIcuCurrently', 'onVentilatorCurrently'];

  recordProperties: any[];
  constructor(private dashService: DashService) { }

  ngOnInit(): void {
    this.dashService.getUsDaily().subscribe(r => {
      this.usDataOrig = r;
      this.setUsData();
      this.setRecordProperties(r);
    });
  }

  setRecordProperties(dataSet) {
    this.recordProperties = Object.keys(dataSet[0])
      .filter(key => !isNaN(dataSet[0][key]))
      .map(el => {
        return { label: el, value: el };
      });
  }

  setUsData() {
    this.usData = this.usDataOrig.reduce((acc, val, currIdx, origArr) => {
      this.filterValues.forEach(filterVal => {
        acc[filterVal].data.push(val[filterVal]);
      });
      acc.labels.push(val.date);
      if (currIdx == origArr.length - 1) {
        this.filterValues.forEach(filterVal => {
          acc[filterVal].data = acc[filterVal].data.reverse();
          acc.datasets.push(acc[filterVal]);
        });
        acc.labels = acc.labels.reverse();
      }
      return acc;
    }, this._initObject());
  }

  // {
  //   labels: [],
  //   datasets: [],
  //   us: {
  //     label: filterValue,
  //     data: [],
  //     fill: false,
  //     borderColor: '#4bc0c0'
  //   }
  // }

  private _initObject() {
    let obj = {
      labels: [],
      datasets: []
    };
    this.filterValues.forEach(val => {
      obj[val] = {
        label: val,
        data: [],
        fill: false,
        borderColor: this.randoColor()
      }
    });
    return obj;
  }


  randoColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);

  }

  usRecordSelected(event) {
    this.setUsData();
  }

}
