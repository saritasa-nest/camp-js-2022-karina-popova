import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FilmsService } from 'src/app/core/services/films.service';

/** Films management. */
@Component({
  selector: 'sw-films-management',
  templateUrl: './films-management.component.html',
  styleUrls: ['./films-management.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsManagementComponent {

  /** Form name. */
  @Input()
  public title = '';

  public constructor(
    private readonly filmsService: FilmsService,
  ) { }

  /** Planets. */
  public planets$ = this.filmsService.fetchPlanets();

  /** Characters. */
  public characters$ = this.filmsService.fetchPeople();

  /** Form field controls. */
  @Input()
  public filmForm!: FormGroup;

  /** Form submit. */
  @Output()
  public sendForm = new EventEmitter();

  /** Emits an event containing a form. */
  public submitForm(): void {
    if (this.filmForm.valid) {
      this.sendForm.emit(this.filmForm.value);
    }
  }
}
