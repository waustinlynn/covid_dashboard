import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'covid-dashboard';

  constructor(private router: Router) {

  }

  itemChanged(event) {
    this.router.navigate(['/dashboard/' + event.value]);
  }
}
