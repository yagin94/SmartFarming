import {Component, OnInit} from '@angular/core';
import {AuthService} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';
import {GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider} from 'angularx-social-login';
import {HttpClient} from '@angular/common/http';
import {LoginService} from '../login/login.service';
import {HeaderComponent} from '../common/header/header.component';
import {GetTopArticle, GetTopQuestion} from './home-page.model';
import {HomePageService} from './home-page.service';
import {SearchText} from './home-page.model';
import {Qa} from '../qa-page/qa.model';
import {Router} from '@angular/router';
import {Article} from '../article-page/article.model';

@Component({
  providers: [LoginService, HeaderComponent, HomePageService],
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  user: SocialUser;
  showTopSearch$ = false;
  getTopArticle$: GetTopArticle;
  getTopQuestion$: GetTopQuestion;
  searchText: string;

  constructor(private authService: AuthService, private http: HttpClient, private homePageService: HomePageService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((x) => {
        this.user = x;
        this.sendToRestApiMethod(this.user.idToken);
        console.log(this.user);
      }).catch((x) => {
      console.log('here!!!!:');
    });
  }

  sendToRestApiMethod(token: string): void {
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
          localStorage.setItem('currentUser', JSON.stringify(this.user));
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
    this.authService.signOut();
  }

  getTop(search: string): void {
    this.searchText = search;
    this.getTopArticle(search);
    this.getTopQuestion(search);
  }

  getTopArticle(search: string): void {
    this.homePageService.getTopArticle(search).subscribe(getTopArticle => {
      this.getTopArticle$ = getTopArticle;
      this.showTopSearch$ = true;
    });
  }


  getTopQuestion(search: string): void {
    this.homePageService.getTopQestion(search).subscribe(getTopQuestion => {
      this.getTopQuestion$ = getTopQuestion;
      this.showTopSearch$ = true;
    });
  }

  goToQuestionDetail(qa: Qa) {
    this.router.navigate(['./qa-page-detail'], {queryParams: {id: qa.questionId}});
  }

  goToArticleDetail(qa: Article) {
    this.router.navigate(['./article-detail-page'], {queryParams: {id: qa.articleId}});
  }
}
