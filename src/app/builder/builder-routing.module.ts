import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterBuilderComponent } from './character-builder/character-builder.component';

const routes: Routes = [{ path: '', component: CharacterBuilderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuilderRoutingModule {}
