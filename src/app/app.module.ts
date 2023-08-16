import { BrowserModule, Title } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { WpApiLoader, WpApiModule, WpApiStaticLoader } from 'wp-api-angular';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Http } from '@angular/http';
import { RouterModule } from '@angular/router';

export function WpApiLoaderFactory(http: Http) {
  return new WpApiStaticLoader(http, 'https://blog.bookonepms.com/wp-json/wp/v2/', '');
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    NgSelectModule,
    AppRoutingModule,

    WpApiModule.forRoot({ // <---
      provide: WpApiLoader,
      useFactory: (WpApiLoaderFactory),
      deps: [ Http ]
    }),
    // CookieLawModule
  ],

  providers: [Title,

    {provide: LocationStrategy, useClass: HashLocationStrategy},],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
