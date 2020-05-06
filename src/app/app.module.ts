import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeModule } from './welcome/welcome.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { BuilderModule } from './builder/builder.module';

@NgModule({
  declarations: [AppComponent, NavigationComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, WelcomeModule, BuilderModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
