import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {
  WpApiModule,
  WpApiLoader,
  WpApiStaticLoader
} from 'wp-api-angular';
import { from } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
export function WpApiLoaderFactory(http: Http) {
  return new WpApiStaticLoader(http, 'https://blog.bookonepms.com/wp-json/wp/v2/', '');
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgSelectModule,
    AppRoutingModule,
    WpApiModule.forRoot({ // <---
      provide: WpApiLoader,
      useFactory: (WpApiLoaderFactory),
      deps: [Http]
    })

  ],
  providers: [
    Title,

  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}
