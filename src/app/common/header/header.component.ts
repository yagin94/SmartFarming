import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../login/login.service';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider, SocialUser} from 'angularx-social-login';
import {HttpClient} from '@angular/common/http';
import {AppUser} from '../../qa-page/qa.model';
import {Globals} from '../globalVariables';
import {Router} from '@angular/router';
import {Local} from 'protractor/built/driverProviders';
import {HeaderService} from './header.service';
import {GetNotif, Notifications} from './header.model';
import {Observable} from 'rxjs';


@Component({
  providers: [LoginService, Globals, HeaderService],
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  appUser$: AppUser;
  user: SocialUser;
  checkAdmin = '';
  id: number;
  appUserByIp$: AppUser;
  getNotif$: GetNotif = new GetNotif();
  pageIndex = 0;
  loadingC: boolean;
  checkNotif = true;
  notiUnseen = 0;

  constructor(private authService: AuthService,
              private headerService: HeaderService,
              private http: HttpClient, private globals: Globals, private router: Router) {
  }

  ngOnInit() {
    this.getUserByIpAddress();
    if (localStorage.getItem('currentAppUser')) {
      this.id = JSON.parse(localStorage.getItem('currentAppUser')).userId;
    }

    this.checkRole();
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
    this.getUnseenNoti();
    this.getNotif();
  }

  checkRole() {
    if (!JSON.parse(localStorage.getItem('currentAppUser'))) {
      return false;
    } else {
      this.checkAdmin = JSON.parse(localStorage.getItem('currentAppUser')).role;

    }
  }

  getResponse(token: string): void {
    this.appUser$ = new AppUser();
    this.http.post<AppUser>('http://localhost:8080/login',
      {
        provider: this.user.provider,
        id: this.user.id,
        email: this.user.email,
        name: this.user.name,
        photoUrl: this.user.photoUrl,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        authToken: this.user.authToken,
        idToken: this.user.idToken,
        authorizationCode: this.user.authorizationCode
      }).subscribe(app => {
        localStorage.setItem('currentAppUser', JSON.stringify(app));
        this.checkAdmin = app.role;

      }
    );
    window.location.replace(window.location.href);
  }

  signInWithGoogle(): void {
    this.loadingC = true;
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((x) => {
        this.user = x;
        this.sendToRestApiMethod(this.user.idToken);
        this.loadingC = false;
      }).catch((x) => {
      this.loadingC = false;
    });
  }

  getAuthorizationToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.token;
  }

  sendToRestApiMethod(token: string): void {
    this.globals.loading = true;
    try {
      this.http.post('http://localhost:8080/login',
        {
          provider: this.user.provider,
          id: this.user.id,
          email: this.user.email,
          name: this.user.name,
          photoUrl: this.user.photoUrl,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          authToken: this.user.authToken,
          idToken: this.user.idToken,
          authorizationCode: this.user.authorizationCode
        }).subscribe(
        onSuccess => {
          this.getResponse(this.user.idToken);
          this.globals.loading = false;

          localStorage.setItem('currentUser', JSON.stringify(this.user));
          // console.log('DuyNk', localStorage.getItem('currentUser'));
        }, onFail => {
          console.log(onFail);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signInWithLinkedIn(): void {
    this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.loadingC = true;
    this.authService.signOut();
    localStorage.removeItem('currentAppUser');
    // localStorage.removeItem('currentUser');
    // console.log(localStorage.getItem('currentAppUser'));
    location.replace(window.location.href);

  }

  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  userDetail(userId: number) {
    console.log(userId);
    window.location.replace(`/user-detail-page?id=${userId}`);
  }

  getUserByIpAddress() {
    this.headerService.getUserByIpAddres().subscribe(res => {
      this.appUserByIp$ = res;
      localStorage.setItem('anonymousUser', JSON.stringify(this.appUserByIp$));
    });
  }

  getNotif() {
    if (localStorage.getItem('currentAppUser')) {
      const userId = JSON.parse(localStorage.getItem('currentAppUser')).userId;
      this.headerService.getNotification(userId, this.pageIndex).subscribe(res => {
        this.getNotif$ = res;
        console.log(`================================================`, this.getNotif$);
      });
    } else if (localStorage.getItem('anonumousUser')) {
      const userId = JSON.parse(localStorage.getItem('anonumousUser')).userId;
      this.headerService.getNotification(userId, this.pageIndex).subscribe(res => {
        this.getNotif$ = res;
      });
    } else {
      this.checkNotif = false;
    }
  }

  seeNotif(notif: Notifications) {
    console.log('noti', notif.notificationId);
    if (notif.deleteQuestion) {
      window.location.replace(`/**`);
    }
    else if (notif.question) {
        this.headerService.seenNoti(notif.notificationId).subscribe(onsuccess => {
        });
        window.location.replace(`http://localhost:4200/qa-page-detail?id=${notif.question.questionId}&&userId=${notif.question.appUser.userId}`);
    } else {
      this.headerService.seenNoti(notif.notificationId);
      window.location.replace(`http://localhost:4200/article-detail-page?id=${notif.article.articleId}&&userId=${notif.article.appUser.userId}`);
    }
  }

  unsubscribeNotif(notif: Notifications) {
    if (notif.question) {
      const noti: Notifications = new Notifications();
      noti.notificationId = notif.notificationId;
      noti.appUserReceiver.userId = notif.appUserReceiver.userId;
      noti.question.questionId = notif.question.questionId;
      this.headerService.unsubscribeNotif(noti).subscribe();
    } else {
      const noti: Notifications = new Notifications();
      noti.notificationId = notif.notificationId;
      noti.appUserReceiver.userId = notif.appUserReceiver.userId;
      noti.article.articleId = notif.article.articleId;
      this.headerService.unsubscribeNotif(noti).subscribe();
    }
  }

  deleteNotif(id: number) {
    this.headerService.deleteNotif(id).subscribe();
    this.getNotif();
  }

  abc() {
    this.globals.changeLoading();
    console.log(this.globals.loading);
    console.log(this.globals.lo);
    console.log(this.globals.load);
  }


  // noinspection JSAnnotator
  getUnseenNoti() {
    this.headerService.getUnseenNoti(JSON.parse(localStorage.getItem('currentAppUser')).userId).subscribe(noti => {
      this.notiUnseen = noti;
      console.log('noti', this.notiUnseen);
    });
  }

}
