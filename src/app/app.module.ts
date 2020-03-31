import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

import {ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home/home.component';
import { ChannelComponent } from './routes/channel/channel.component';
import { WatchComponent } from './routes/watch/watch/watch.component';
import { ThumbnailComponent } from './core/components/thumbnails/thumbnail/thumbnail.component';
import { CommentsComponent } from './core/components/comments/comments/comments.component';
import { HeaderComponent } from './core/components/header/header/header.component';
import { LogoComponent } from './core/components/icons/logo/logo/logo.component';
import { VideoCameraComponent } from './core/components/icons/video-camera/video-camera/video-camera.component';
import { VideoComponent } from './core/components/video/video/video.component';
import { VideoService } from './core/services/video/video.service';
import { LoginComponent } from './routes/login/login/login.component';
import { SignupComponent } from './routes/signup/signup/signup.component';


import { JwtInterceptor } from './core/interceptors/jwt-interceptor';
import { AuthenticationService } from './core/services/authentication/authentication.service';
import { SignInComponent } from './core/components/icons/sign-in/sign-in/sign-in.component';
import { GoogleLogoComponent } from './core/components/icons/google-logo/google-logo/google-logo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChannelComponent,
    WatchComponent,
    ThumbnailComponent,
    CommentsComponent,
    HeaderComponent,
    LogoComponent,
    VideoCameraComponent,
    VideoComponent,
    LoginComponent,
    SignupComponent,
    SignInComponent,
    GoogleLogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    VideoService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
