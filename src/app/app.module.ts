import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {HttpClientModule} from '@angular/common/http';
import { QaPageComponent } from './qa-page/qa-page.component';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import { ManagerPageComponent } from './manager-page/manager-page.component';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import { ArticleDetailPageComponent } from './article-page/article-detail-page/article-detail-page.component';
import { QaPageDetailComponent } from './qa-page/qa-page-detail/qa-page-detail.component';
import { QaPagePostComponent } from './qa-page/qa-page-post/qa-page-post.component';
import { UserInformationComponent } from './user-information/user-information.component';
import {UserDetailPageComponent} from './user-detail-page/user-detail-page.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { KiThuatTrongComponent } from './article-page/ki-thuat-trong/ki-thuat-trong.component';
import { PhanBonComponent } from './article-page/phan-bon/phan-bon.component';
import { TrangChinhComponent } from './article-page/trang-chinh/trang-chinh.component';
import { ArticlePostPageComponent } from './article-page/article-post-page/article-post-page.component';
import { HeaderComponent } from './common/header/header.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { NgxSocialButtonModule,
  SocialServiceConfig} from 'ngx-social-button';
import {ngxLoadingAnimationTypes, NgxLoadingModule} from 'ngx-loading';
export function getAuthServiceConfigs() {
  let configs = new SocialServiceConfig()
    .addFacebook('760042107748144')
    .addGoogle('37814627490-8elc70ljgrbo34n0tn205o2afhrpef6h.apps.googleusercontent.com');
  return configs;
}
// Configs
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('37814627490-8elc70ljgrbo34n0tn205o2afhrpef6h.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('760042107748144')
  }
]);
export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ArticlePageComponent,
    PageNotFoundComponent,
    QaPageComponent,
    ManagerPageComponent,
    ManagerPageComponent,
    ArticleDetailPageComponent,
    ManagerPageComponent,
    QaPageDetailComponent,
    QaPagePostComponent,
    UserInformationComponent,
    KiThuatTrongComponent,
    PhanBonComponent,
    TrangChinhComponent,
    ArticlePostPageComponent,
    UserDetailPageComponent,
    HeaderComponent
  ],
  imports: [
    CKEditorModule,
    NgxSocialButtonModule,
    AngularFontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
    NgxLoadingModule.forRoot({}),
    ScrollToModule.forRoot()
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,

    },
    {
      provide: SocialServiceConfig,
      useFactory: getAuthServiceConfigs
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {}
}
