import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxVcardModule } from 'ngx-vcard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SolicitudComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxVcardModule,
    RecaptchaModule,
    NgxGoogleAnalyticsModule.forRoot('G-J1NXSSFVQW'),
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyAm6ePcRpA8G1MRIg8MYkZYMgH5dPiKVZY'
      apiKey: 'AIzaSyBYRWc8A6_P210q8HDD17bEA0NfPyg03dU'
    }),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
