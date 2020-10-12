import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'k-obw-maintenance-page',
  templateUrl: './obw-maintenance-page.component.html',
  styleUrls: ['./obw-maintenance-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObwMaintenancePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('Maintain page');
  }

}
