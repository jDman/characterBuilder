import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject, combineLatest } from 'rxjs';

import { CharacterAbilities } from '../interfaces/character-abilities.interface';
import { CharacterEquipment } from '../interfaces/character-equipment.interface';
import { CharacterTraits } from '../interfaces/character-traits.interface';
import { CharacterAbilitiesService } from 'src/app/services/character-abilities.service';
import { CharacterEquipmentService } from 'src/app/services/character-equipment.service';
import { CharacterTraitsService } from 'src/app/services/character-traits.service';

@Component({
  selector: 'app-character-information-terminal',
  templateUrl: './character-information-terminal.component.html',
  styleUrls: ['./character-information-terminal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterInformationTerminalComponent
  implements OnInit, OnDestroy {
  @Input() characterId: string;

  @Output() submitAbilitiesData = new EventEmitter();
  @Output() submitEquipmentData = new EventEmitter();
  @Output() submitTraitsData = new EventEmitter();

  unsubscribe$ = new Subject<void>();

  abilities: CharacterAbilities;
  equipment: CharacterEquipment;
  traits: CharacterTraits;
  characterInfoOptions = [
    {
      title: 'Abilities',
    },
    {
      title: 'Equipment',
    },
    {
      title: 'Traits',
    },
  ];
  selection = 'abilities';
  isEditingAbilities = false;
  isEditingEquipment = false;
  isEditingTraits = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private abilitiesService: CharacterAbilitiesService,
    private equipmentService: CharacterEquipmentService,
    private traitsService: CharacterTraitsService
  ) {}

  ngOnInit() {
    combineLatest(
      this.abilitiesService.abilities$,
      this.equipmentService.equipment$,
      this.traitsService.traits$
    )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([abilities, equipment, traits]) => {
        this.abilities = abilities;
        this.equipment = equipment;
        this.traits = traits;

        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  editAbilities(): void {
    this.isEditingAbilities = !this.isEditingAbilities;
  }

  editEquipment(): void {
    this.isEditingEquipment = !this.isEditingEquipment;
  }

  editTraits(): void {
    this.isEditingTraits = !this.isEditingTraits;
  }

  submitAbilities(abilities: CharacterAbilities): void {
    this.submitAbilitiesData.emit({ characterId: this.characterId, abilities });
  }

  submitEquipment(equipment: CharacterEquipment): void {
    this.submitEquipmentData.emit({ characterId: this.characterId, equipment });
  }

  submitTraits(traits: CharacterTraits): void {
    this.submitTraitsData.emit({ characterId: this.characterId, traits });
  }

  updateSelection(option: string): void {
    this.selection = option.toLocaleLowerCase();
  }
}
