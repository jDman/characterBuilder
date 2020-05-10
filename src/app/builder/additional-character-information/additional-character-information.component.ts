import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { CharacterBaseService } from 'src/app/services/character-base.service';
import { CharacterAbilitiesService } from 'src/app/services/character-abilities.service';
import { CharacterBase } from '../interfaces/character-base.interface';
import { CharacterEquipmentService } from 'src/app/services/character-equipment.service';
import { CharacterTraitsService } from 'src/app/services/character-traits.service';
import { CharacterAbilitiesPostData } from '../interfaces/character-abilities-post-data.interface';
import { CharacterEquipmentPostData } from '../interfaces/character-equipment-post-data.interface';
import { CharacterTraitsPostData } from '../interfaces/character-traits-post-data.interface';

@Component({
  selector: 'app-additional-character-information',
  templateUrl: './additional-character-information.component.html',
  styleUrls: ['./additional-character-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalCharacterInformationComponent implements OnInit {
  character$: Observable<CharacterBase>;
  abilities$: Observable<any>;
  equipment$: Observable<any>;
  traits$: Observable<any>;

  constructor(
    private characterBaseService: CharacterBaseService,
    private abilitiesService: CharacterAbilitiesService,
    private equipmentService: CharacterEquipmentService,
    private traitsService: CharacterTraitsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.characterBaseService.fetchCharacter(id).pipe(take(1)).subscribe();
    this.abilitiesService.fetchCharacterAbilities(id).pipe(take(1)).subscribe();
    this.equipmentService.fetchCharacterEquipment(id).pipe(take(1)).subscribe();
    this.traitsService.fetchCharacterTraits(id).pipe(take(1)).subscribe();

    this.character$ = this.characterBaseService.character;
    this.abilities$ = this.abilitiesService.abilities;
    this.equipment$ = this.equipmentService.equipment;
    this.traits$ = this.traitsService.traits;
  }

  submitCharacterAbilities(data: CharacterAbilitiesPostData): void {
    this.abilitiesService.createAbilities(data).pipe(take(1)).subscribe();
  }

  submitCharacterEquipment(data: CharacterEquipmentPostData): void {
    this.equipmentService.createEquipment(data).pipe(take(1)).subscribe();
  }

  submitCharacterTraits(data: CharacterTraitsPostData): void {
    this.traitsService.createTraits(data).pipe(take(1)).subscribe();
  }
}
