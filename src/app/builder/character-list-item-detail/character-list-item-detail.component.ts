import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-character-list-item-detail',
  templateUrl: './character-list-item-detail.component.html',
  styleUrls: ['./character-list-item-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterListItemDetailComponent {
  @Input() id: number;
  @Input() name: string;
  @Input() background: string;
  @Input() classType: string;
  @Input() raceType: string;
  @Input() lastUpdated: string;
}
