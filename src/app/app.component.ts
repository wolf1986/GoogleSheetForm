import { Component } from '@angular/core';
import { OnDestroy, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { GoogleAuthService } from './google-auth.service';
import { Config } from './config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy, AfterViewInit {
  title = 'app';
  subscriptionGoogleUser: Subscription;

  constructor(private googleAuthService: GoogleAuthService) {
    this.subscriptionGoogleUser = this.googleAuthService.googleUser$.subscribe(this.onGoogleUser);
  }

  onGoogleUser(googleUser: gapi.auth2.GoogleUser) {
    console.log(googleUser);
  }

  ngAfterViewInit() {
    this.googleAuthService.clientConfig = {
      client_id: Config.GoogleAuth.ClientId,
      scope: Config.GoogleAuth.Scopes.join(' '),
    };

    this.googleAuthService.initAuth2Flow();
  }

  ngOnDestroy(): void {
    this.subscriptionGoogleUser.unsubscribe();
  }
}
