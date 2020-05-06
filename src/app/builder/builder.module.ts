import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuilderRoutingModule } from './builder-routing.module';
import { CharacterBuilderComponent } from './character-builder/character-builder.component';
import { AdditionalCharacterInformationComponent } from './additional-character-information/additional-character-information.component';
import { CharacterListItemDetailComponent } from './character-list-item-detail/character-list-item-detail.component';
import { CharacterBaseFormComponent } from './forms/character-base-form/character-base-form.component';
import { CharacterAbilitiesFormComponent } from './forms/character-abilities-form/character-abilities-form.component';
import { CharacterEquipmentFormComponent } from './forms/character-equipment-form/character-equipment-form.component';
import { CharacterTraitsFormComponent } from './forms/character-traits-form/character-traits-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CharacterBuilderComponent,
    AdditionalCharacterInformationComponent,
    CharacterListItemDetailComponent,
    CharacterBaseFormComponent,
    CharacterAbilitiesFormComponent,
    CharacterEquipmentFormComponent,
    CharacterTraitsFormComponent,
  ],
  imports: [CommonModule, SharedModule, BuilderRoutingModule],
})
export class BuilderModule {}
