import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { VideoService } from 'src/app/core/services/video/video.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ChannelService } from 'src/app/core/services/channel/channel.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: any;
  userHasChannel: any;
  createVideo: FormGroup;
  createChannel: FormGroup;
  format: string;
  url: any;
  file: any;



  constructor(
    private formBuilder: FormBuilder,
    private videoService: VideoService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private channelService: ChannelService
  ) {
   authenticationService.isLoggedIn().subscribe(loggedIn => {
     this.isLoggedIn = loggedIn;
   });

   userService.doesUserHaveChannel().subscribe(hasChannel => {
     this.userHasChannel = hasChannel;
   });
   }

  ngOnInit() {
    console.log(`Is user logged in: ${this.isLoggedIn}`);
    console.log(`Does user have channel: ${this.userHasChannel}`)
    this.createVideo = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      video: ['', [Validators.required]]
    });

    this.createChannel = this.formBuilder.group({
      channel_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
    });
  }


  onSelectFile(event) {
    this.file = event.target.files[0];
    console.log(this.file);
    if (this.file) {
      const reader = new FileReader();
      reader.readAsDataURL(this.file);

      if (this.file.type.indexOf('video') > -1) {
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;

      };
    }
  }

  onClose() {
    this.url = null;
    this.createVideo.reset();
  }

  onCreateChannelClose(){
    this.createChannel.reset();
  }

  addNewVideo() {

    if (this.createVideo.invalid) {
      return;
  }

    return this.videoService.createVideo({value: this.createVideo.value, file: this.file }).subscribe(
        results => {
          console.log(results);
          this.createVideo.reset();
        },
        error => {
          console.log(error);
        }
    );

  }


  addNewChannel() {
    if (this.createChannel.invalid) {
      return;
  }

    return this.channelService.createChannel({value: this.createChannel.value}).subscribe(
        results => {
          this.userService.setUserHasChannel(true);
          this.createChannel.reset();
        },
        error => {
          console.log(error);
        }
    );
  }

}
