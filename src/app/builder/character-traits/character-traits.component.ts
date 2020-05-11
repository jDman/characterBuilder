import {
  Component,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-character-traits',
  templateUrl: './character-traits.component.html',
  styleUrls: ['./character-traits.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterTraitsComponent {
  @Output() editTraitsData = new EventEmitter();

  @Input() abilityScoreIncrease: number;
  @Input() age: number;
  @Input() alignment: string;
  @Input() morality: string;
  @Input() size: string;
  @Input() speed: number;
  @Input() languages: string;
  @Input() isEditing = false;

  editTraits() {
    this.editTraitsData.emit();
  }
}
