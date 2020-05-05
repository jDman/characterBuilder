import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, WelcomeRoutingModule],
})
export class WelcomeModule {}
