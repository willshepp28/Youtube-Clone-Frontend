import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { VideoService } from 'src/app/core/services/video/video.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ChannelService } from 'src/app/core/services/channel/channel.service';
import { faVideo, faUserPlus, faUserCircle, faUser } from '@fortawesome/free-solid-svg-icons';

// Add icons to the library for convenient access in other components
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
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
  userProfilePic: any;
  format: string;
  url: any;
  file: any;
  uploadStarted = false;
  errorHasOccurred = false;
  authenticated = false;
  message: string;



  constructor(
    private formBuilder: FormBuilder,
    private videoService: VideoService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private channelService: ChannelService,
    library: FaIconLibrary
  ) {
    library.addIcons(faVideo, faUserPlus, faUserCircle);
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
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
      video: ['', [Validators.required]]
    });

    this.createChannel = this.formBuilder.group({
      channel_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
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
      console.log('invalid')

      return;
  }
    this.uploadStarted = true;
    this.message = "Upload started"
    return this.videoService.createVideo({value: this.createVideo.value, file: this.file }).subscribe(
        results => {
          this.message = "Video successfully uploaded"
          console.log(results);
          this.createVideo.reset();
        },
        error => {
          this.uploadStarted = false;
          this.message = error.error.message || 'A error has occurred. Try again.'
          console.log(error);
          this.errorHasOccurred = true;

          setTimeout(() => {
            this.message;
            this.errorHasOccurred = false;
          }, 2000)
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
          this.message = error.error.message;
          console.log(error);
          this.errorHasOccurred = true;
        }
    );
  }

}
