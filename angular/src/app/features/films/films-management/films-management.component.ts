import { Component, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/** Films management. */
@Component({
  selector: 'sw-films-management',
  templateUrl: './films-management.component.html',
  styleUrls: ['./films-management.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmsManagementComponent {

  public constructor(private readonly fb: FormBuilder) { }

  /** Form name. */
  @Input()
  public title = '';

  /** Form field validator. */
  @Input()
  public filmForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    created: ['', [Validators.required]],
    director: [''],
    edited: ['', [Validators.required]],
    openingCrawl: [''],
    producer: [[]],
    releaseDate: ['', [Validators.required]],
    episodeId: 1,
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
