import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterBaseService } from 'src/app/services/character-base.service';
import { Observable } from 'rxjs';
import { CharacterBase } from '../interfaces/character-base.interface';
import { CharacterAbilitiesService } from 'src/app/services/character-abilities.service';
import { take } from 'rxjs/operators';
import { CharacterEquipmentService } from 'src/app/services/character-equipment.service';
import { CharacterTraitsService } from 'src/app/services/character-traits.service';

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
}
