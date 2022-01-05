import { Component } from '@angular/core';
import * as moment from 'moment/moment';

@Component({
  selector: 'pref-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    moment.locale('ru');
  }

}
