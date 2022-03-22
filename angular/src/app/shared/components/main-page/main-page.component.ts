import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';

/** Page header.*/
@Component({
  selector: 'sw-main-page',
  templateUrl: './main-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent { }
