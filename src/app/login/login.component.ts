import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {OauthService} from '../services/oauth.service';
import {TokenService} from '../services/token.service';
import {TokenDto} from '../models/token-dto';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  socialUser: SocialUser;
  userLogged: SocialUser;
  isLogged: boolean;

  @Output() event = new EventEmitter<any>();

  constructor(
    private authService: SocialAuthService,
    private oauthService: OauthService,
    private tokenService: TokenService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authService.authState.subscribe(res => {
      this.userLogged = res;
      this.isLogged = (this.userLogged != null && this.tokenService.getToken() != null);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      this.socialUser = data;
      console.log(data);
      const tokenGoogle = new TokenDto(this.socialUser.idToken);
      this.oauthService.google(tokenGoogle).subscribe(
        res=>{
          this.tokenService.setToken(res.data.value);
          console.log(res);
          this.isLogged = true;
        }
      )
    }).catch(
      err => {
        console.log(err);
      }
    );
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(res => {
      this.socialUser = res;
      console.log(res);
      const tokenFacebook = new TokenDto(this.socialUser.authToken);
      this.oauthService.facebook(tokenFacebook).subscribe(
        data=>{
          this.tokenService.setToken(data.data.value);
          console.log(data);
          this.isLogged = true;
        }
      )
    }).catch(
      err => {
        console.log(err);
      }
    );
  }

  logOut() {
    this.authService.signOut();
  }

}
