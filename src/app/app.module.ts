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
import { DetailPageComponent } from './article-page/detail-page/detail-page.component';
import { PostPageComponent } from './article-page/post-page/post-page.component';
import { ManagerPageComponent } from './manager-page/manager-page.component';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ArticlePageComponent,
    PageNotFoundComponent,
    QaPageComponent,
    DetailPageComponent,
    PostPageComponent,
    ManagerPageComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {}
}
