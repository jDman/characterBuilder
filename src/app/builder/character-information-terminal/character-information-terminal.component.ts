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
import { Subject, combineLatest, zip, forkJoin } from 'rxjs';

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

  @Output() editAbilitiesData = new EventEmitter();
  @Output() editEquipmentData = new EventEmitter();
  @Output() editTraitsData = new EventEmitter();

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
    this.abilitiesService.abilities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((abilities) => {
        this.abilities = abilities;

        this.cdr.detectChanges();
      });
    this.equipmentService.equipment$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((equipment) => {
        this.equipment = equipment;

        this.cdr.detectChanges();
      });
    this.traitsService.traits$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((traits) => {
        this.traits = traits;

        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  startEditAbilities(): void {
    this.isEditingAbilities = !this.isEditingAbilities;
  }

  startEditEquipment(): void {
    this.isEditingEquipment = !this.isEditingEquipment;
  }

  startEditTraits(): void {
    this.isEditingTraits = !this.isEditingTraits;
  }

  editAbilities(abilities: CharacterAbilities): void {
    this.editAbilitiesData.emit({ characterId: this.characterId, abilities });
  }

  editEquipment(equipment: CharacterEquipment): void {
    this.editEquipmentData.emit({ characterId: this.characterId, equipment });
  }

  editTraits(traits: CharacterTraits): void {
    this.editTraitsData.emit({ characterId: this.characterId, traits });
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
