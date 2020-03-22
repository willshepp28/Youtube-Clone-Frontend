import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home/home.component';
import { ChannelComponent } from './channel/channel.component';
import { WatchComponent } from './watch/watch.component';
import { ThumbnailComponent } from './core/components/thumbnails/thumbnail/thumbnail.component';
import { CommentsComponent } from './core/components/comments/comments/comments.component';
import { HeaderComponent } from './core/components/header/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChannelComponent,
    WatchComponent,
    ThumbnailComponent,
    CommentsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
