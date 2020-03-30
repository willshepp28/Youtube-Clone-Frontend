import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home/home.component';
import { ChannelComponent } from './routes/channel/channel.component';
import { WatchComponent } from './watch/watch.component';
import { ThumbnailComponent } from './core/components/thumbnails/thumbnail/thumbnail.component';
import { CommentsComponent } from './core/components/comments/comments/comments.component';
import { HeaderComponent } from './core/components/header/header/header.component';
import { LogoComponent } from './core/components/icons/logo/logo/logo.component';
import { VideoCameraComponent } from './core/components/icons/video-camera/video-camera/video-camera.component';
import { VideoComponent } from './core/components/video/video/video.component';

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
    VideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
