import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterBuilderComponent } from './character-builder/character-builder.component';
import { AdditionalCharacterInformationComponent } from './additional-character-information/additional-character-information.component';

const routes: Routes = [
  { path: '', component: CharacterBuilderComponent },
  { path: ':id', component: AdditionalCharacterInformationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuilderRoutingModule {}
