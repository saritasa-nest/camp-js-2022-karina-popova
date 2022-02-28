import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Film } from 'src/app/core/models/Film';

/** Film. */
@Component({
  selector: 'sw-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmComponent {
  /** Film information. */
  @Input()
  public film: Film | null = null;
}
