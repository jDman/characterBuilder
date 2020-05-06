import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuilderRoutingModule } from './builder-routing.module';
import { CharacterBuilderComponent } from './character-builder/character-builder.component';
import { AdditionalCharacterInformationComponent } from './additional-character-information/additional-character-information.component';
import { CharacterListItemDetailComponent } from './character-list-item-detail/character-list-item-detail.component';

@NgModule({
  declarations: [
    CharacterBuilderComponent,
    AdditionalCharacterInformationComponent,
    CharacterListItemDetailComponent,
  ],
  imports: [CommonModule, BuilderRoutingModule],
})
export class BuilderModule {}
