import { Component, OnInit } from '@angular/core';
import { DashService } from '../dash.service';
import { MatDialog } from '@angular/material/dialog';
import { StateSelectorComponent } from '../state-selector/state-selector.component';
import { first } from 'rxjs/operators';

@Component({
  templateUrl: './national.component.html',
  styleUrls: ['./national.component.scss']
})
export class NationalComponent implements OnInit {

  usDataOrig: any[];
  usData: any;
  filterValues: string[] = ['positiveIncrease'];

  recordProperties: any[];
  constructor(private dashService: DashService, public modal: MatDialog) { }

  ngOnInit(): void {
    this.dashService.getUsDaily().subscribe(r => {
      this.usDataOrig = r;
      this.setUsData();
      this.setRecordProperties(r);
    });
  }

  setRecordProperties(dataSet) {
    this.recordProperties = Object.keys(dataSet[0])
      .filter(key => !isNaN(dataSet[0][key]));
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

  selectProperties() {
    let ref = this.modal.open(StateSelectorComponent, {
      maxHeight: '90vh',
      width: '400px'
    });
    ref.componentInstance.states = this.recordProperties;
    ref.componentInstance.title = 'Select Properties';
    ref.componentInstance.statesSelected.pipe(first()).subscribe(r => {
      this.filterValues = r;
      this.setUsData();
      ref.close();
    });
  }

}
