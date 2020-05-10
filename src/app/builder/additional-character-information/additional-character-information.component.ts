import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { CharacterBaseService } from 'src/app/services/character-base.service';
import { CharacterAbilitiesService } from 'src/app/services/character-abilities.service';
import { CharacterBase } from '../interfaces/character-base.interface';
import { CharacterEquipmentService } from 'src/app/services/character-equipment.service';
import { CharacterTraitsService } from 'src/app/services/character-traits.service';
import { CharacterAbilitiesPostData } from '../interfaces/character-abilities-post-data.interface';
import { CharacterEquipmentPostData } from '../interfaces/character-equipment-post-data.interface';
import { CharacterTraitsPostData } from '../interfaces/character-traits-post-data.interface';
import { CharacterAbilities } from '../interfaces/character-abilities.interface';
import { CharacterEquipment } from '../interfaces/character-equipment.interface';
import { CharacterTraits } from '../interfaces/character-traits.interface';

@Component({
  selector: 'app-additional-character-information',
  templateUrl: './additional-character-information.component.html',
  styleUrls: ['./additional-character-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalCharacterInformationComponent implements OnInit {
  character$: Observable<CharacterBase>;
  abilities$: Observable<CharacterAbilities>;
  equipment$: Observable<CharacterEquipment>;
  traits$: Observable<CharacterTraits>;

  private characterId: string;

  constructor(
    private characterBaseService: CharacterBaseService,
    private abilitiesService: CharacterAbilitiesService,
    private equipmentService: CharacterEquipmentService,
    private traitsService: CharacterTraitsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.characterId = this.route.snapshot.paramMap.get('id');

    this.characterBaseService
      .fetchCharacter(this.characterId)
      .pipe(take(1))
      .subscribe((character) =>
        this.characterBaseService.updateCharacter(character)
      );
    this.fetchAbilities(this.characterId);
    this.fetchEquipment(this.characterId);
    this.fetchTraits(this.characterId);

    this.character$ = this.characterBaseService.character;
    this.abilities$ = this.abilitiesService.abilities;
    this.equipment$ = this.equipmentService.equipment;
    this.traits$ = this.traitsService.traits;
  }

  fetchAbilities(id: string): void {
    this.abilitiesService
      .fetchCharacterAbilities(id)
      .pipe(take(1))
      .subscribe((abilities) =>
        this.abilitiesService.updateAbilities(abilities)
      );
  }

  fetchEquipment(id: string): void {
    this.equipmentService
      .fetchCharacterEquipment(id)
      .pipe(take(1))
      .subscribe((equipment) =>
        this.equipmentService.updateEquipment(equipment)
      );
  }

  fetchTraits(id: string): void {
    this.traitsService
      .fetchCharacterTraits(id)
      .pipe(take(1))
      .subscribe((traits) => this.traitsService.updateTraits(traits));
  }

  submitCharacterAbilities(data: CharacterAbilitiesPostData): void {
    this.abilitiesService
      .createAbilities(data)
      .pipe(take(1))
      .subscribe(
        () => this.fetchAbilities(this.characterId),
        (err) => console.error(err)
      );
  }

  submitCharacterEquipment(data: CharacterEquipmentPostData): void {
    this.equipmentService
      .createEquipment(data)
      .pipe(take(1))
      .subscribe(
        () => this.fetchEquipment(this.characterId),
        (err) => console.error(err)
      );
  }

  submitCharacterTraits(data: CharacterTraitsPostData): void {
    this.traitsService
      .createTraits(data)
      .pipe(take(1))
      .subscribe(
        () => this.fetchTraits(this.characterId),
        (err) => console.error(err)
      );
  }
}
