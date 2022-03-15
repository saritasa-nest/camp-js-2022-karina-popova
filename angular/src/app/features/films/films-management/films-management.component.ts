import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public filmForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    created: [new Date(), [Validators.required]],
    director: ['', [Validators.required]],
    edited: new Date(),
    releaseDate: new Date(),
    openingCrawl: ['', [Validators.required]],
    episodeId: 1,
    planets: [[3, 2], Validators.required],
    characters: [[1, 2], Validators.required],
    producer: '',
  });

  /** Form submit. */
  @Output()
  public sendForm = new EventEmitter();

  /** Form close. */
  @Output()
  public closeForm = new EventEmitter();

  /** Emits an event containing a form. */
  public submitForm(): void {
    if (this.filmForm.valid) {
      this.sendForm.emit(this.filmForm.value);
    }
  }

  /** Generates a form close event. */
  public close(): void {
    this.closeForm.emit();
  }

}
