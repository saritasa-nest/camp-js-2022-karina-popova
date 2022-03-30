import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CharacterService } from 'src/app/core/services/characters.service';
import { PlanetService } from 'src/app/core/services/planets.service';

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
    private readonly planetService: PlanetService,
    private readonly characterService: CharacterService,
  ) { }

  /** Planets. */
  public planets$ = this.planetService.fetchPlanets();

  /** Characters. */
  public characters$ = this.characterService.fetchPeople();

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
