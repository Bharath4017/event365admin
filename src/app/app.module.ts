import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
import { DragulaModule } from 'ng2-dragula';
import { AppComponent } from './app.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './shared/services/auth.service';
import { LocalStorageService } from 'angular-web-storage';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TokenInterceptorService } from './shared/services/token-interceptor.service';
import * as $ from 'jquery';
//import { LandingLayoutComponent } from './layouts/landing/landing-layout.component';
//import { LandingLayoutComponent } from './layouts/content/content-layout.component';
import { MessagingService } from './shared/messaging.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'environments/environment';
import { AuthModule } from './auth/auth.module';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// import { RouteGuardService } from './core/guards/route-guard.service';
// import { HomeGuardService } from './core/guards/home-guard.service';
import { NotificationReadEventService } from './shared/services/notification-read-event.service';
//import { ErrorPageComponent } from './error-page/error-page.component';






export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function tokenGetter() {
    return localStorage.getItem('token');
}

// import { CustomFormsModule } from 'ng5-validation';
@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        ContentLayoutComponent,
      //  LandingLayoutComponent,
       // PageNotFoundComponent,
       // ErrorPageComponent

    ],
    imports: [
        BrowserAnimationsModule,
        AngularFontAwesomeModule,
        StoreModule.forRoot({}),
        AppRoutingModule,
        SharedModule.forRoot(),
        DragulaModule.forRoot(),
        HttpClientModule,
        ToastrModule.forRoot(),
        NgbModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDeUVUdAo43iQh-d9WQuyujs26g55iiALQ'
        }),
        FormsModule, ReactiveFormsModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireMessagingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AuthModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['http://localhost:4200/']
            }
        }),
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
    },
        AuthService,
        TokenInterceptorService,
        JwtHelperService,
        MessagingService,
        // RouteGuardService,
        // HomeGuardService,
        NotificationReadEventService
    ],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
    
})
export class AppModule { }
