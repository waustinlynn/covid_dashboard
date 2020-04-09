import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-state-selector',
  templateUrl: './state-selector.component.html',
  styleUrls: ['./state-selector.component.scss']
})
export class StateSelectorComponent implements OnInit, OnChanges {

  @Input() states: string[] = [];
  @Input() title: string = 'Select States';
  @Output() statesSelected: EventEmitter<string[]> = new EventEmitter();
  @ViewChild('expPanel') expPanel: MatExpansionPanel;
  stateMap: any;
  constructor() { }

  ngOnInit(): void {
    this.mapStates();
  }

  ngOnChanges(changes) {
    this.mapStates();
  }

  mapStates() {
    this.stateMap = this.states.reduce((acc, val) => {
      acc[val] = { label: val, checked: false };
      return acc;
    }, {});
  }

  stateChecked(state, event) {
    this.stateMap[state].checked = event.checked;
  }

  apply() {
    this.statesSelected.emit(
      Object.keys(this.stateMap).reduce((acc, val) => {
        if (this.stateMap[val].checked) {
          acc.push(val);
        }
        return acc;
      }, [])
    );
  }
}
