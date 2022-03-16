import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input, TemplateRef, ContentChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FilmsService } from 'src/app/core/services/films.service';

/** Films management. */
@Component({
  selector: 'sw-films-management',
  templateUrl: './films-management.component.html',
  styleUrls: ['./films-management.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsManagementComponent {
  public constructor(
    private readonly fb: FormBuilder,
    private readonly filmsService: FilmsService,
  ) { }

  /** Form name. */
  @Input()
  public title = '';

  /** Planets. */
  public planets$ = this.filmsService.fetchPlanets();

  /** Characters. */
  public characters$ = this.filmsService.fetchPeople();

  /** Form field validator. */
  @Input()
  public filmForm!: FormGroup;

  /** Form submit. */
  @Output()
  public sendForm = new EventEmitter();

  /** Form close. */
  @Output()
  public closeForm = new EventEmitter();

  /** Emits an event containing a form. */
  public submitForm(): void {
    console.log(this.filmForm.value);
    if (this.filmForm.valid) {

      this.sendForm.emit(this.filmForm.value);
    }
  }

  /** Generates a form close event. */
  public close(): void {
    this.closeForm.emit();
  }

}
