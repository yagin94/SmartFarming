import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {ArticlePageComponent} from './article-page/article-page.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {QaPageComponent} from './qa-page/qa-page.component';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {ArticleDetailPageComponent} from './article-page/article-detail-page/article-detail-page.component';
import {QaPageDetailComponent} from './qa-page/qa-page-detail/qa-page-detail.component';
import {QaPagePostComponent} from './qa-page/qa-page-post/qa-page-post.component';
import {ManagerPageComponent} from './manager-page/manager-page.component';
import {UserInformationComponent} from './user-information/user-information.component';
import {KiThuatTrongComponent} from './article-page/ki-thuat-trong/ki-thuat-trong.component';
import {PhanBonComponent} from './article-page/phan-bon/phan-bon.component';
import {TrangChinhComponent} from './article-page/trang-chinh/trang-chinh.component';



const routes: Routes = [
  {
    path: 'home-page',
    component: HomePageComponent,
  },
  {
    path: 'article-page',
    component: ArticlePageComponent,
    children: [
      { path: 'app-ki-thuat-trong', component:  KiThuatTrongComponent },
      { path: 'app-phan-bon', component:  PhanBonComponent },
      { path: 'app-trang-chinh', component:  TrangChinhComponent },
      { path: '', component:  TrangChinhComponent },
    ]
  },
  {
    path: 'qa-page',
    component: QaPageComponent
  },
  {
    path: 'user-information',
    component: UserInformationComponent
  },
  {
    path: 'qa-page-detail',
    component: QaPageDetailComponent
  },
  {
    path: 'qa-page-post',
    component: QaPagePostComponent
  },
  {
    path: 'manage-page',
    component: ManagerPageComponent
  },
  // { path: '',   redirectTo: '/home-page', pathMatch: 'full' },
  {
  path: 'article-detail-page',
  component: ArticleDetailPageComponent
  },
  {
    path: 'qa-page',
    component: QaPageComponent,
  },
  // {
  //   path: 'qa-detail-page',
  //   component: QaDetailPageComponent,
  // },
  { path: '',   redirectTo: '/home-page', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
  @NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled'}),
    ScrollToModule.forRoot()
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
