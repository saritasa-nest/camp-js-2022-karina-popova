import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sw-film-create',
  templateUrl: './film-create.component.html',
  styleUrls: ['./film-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmCreateComponent {
  /** Form field validator. */
  @Input()
  public filmForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
  });

  public constructor(private readonly fb: FormBuilder) {}
}
