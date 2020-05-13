import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeModule } from './welcome/welcome.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { BuilderModule } from './builder/builder.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, NavigationComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    WelcomeModule,
    BuilderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
