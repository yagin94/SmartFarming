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
import {UserDetailPageComponent} from './user-detail-page/user-detail-page.component';
import {ThuocBaoVeThucVatComponent} from './article-page/thuoc-bao-ve-thuc-vat/thuoc-bao-ve-thuc-vat.component';
import {ThuHoachVaBaoQuanComponent} from './article-page/thu-hoach-va-bao-quan/thu-hoach-va-bao-quan.component';
import {ArticlePostPageComponent} from './article-page/article-post-page/article-post-page.component';
import {SauBenhComponent} from './article-page/sau-benh/sau-benh.component';
import {GiongCayComponent} from './article-page/giong-cay/giong-cay.component';
import {AllTagUserPageComponent} from './user-detail-page/all-tag-user-page/all-tag-user-page.component';
import {AllQuestionUserPageComponent} from './user-detail-page/all-question-user-page/all-question-user-page.component';
import {KyThuatNhanGiongComponent} from './article-page/ky-thuat-nhan-giong/ky-thuat-nhan-giong.component';



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
      { path: 'app-thuoc-bao-ve-thuc-vat', component:  ThuocBaoVeThucVatComponent },
      { path: 'app-sau-benh', component:  SauBenhComponent },
      { path: 'app-giong-cay', component: GiongCayComponent },
      { path: 'app-thu-hoach-va-bao-quan', component: ThuHoachVaBaoQuanComponent},
      { path: 'app-ky-thuat-nhan-giong', component: KyThuatNhanGiongComponent}
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
  {
    path: 'user-detail-page',
    component: UserDetailPageComponent
  },
  // { path: '',   redirectTo: '/home-page', pathMatch: 'full' },
  {
  path: 'article-detail-page',
  component: ArticleDetailPageComponent
  },
  {
    path: 'article-post-page',
    component: ArticlePostPageComponent
  },
  {
    path: 'qa-page',
    component: QaPageComponent,
  },
  {
    path: 'all-tag-user',
    component: AllTagUserPageComponent,
  },
  {
    path: 'all-question-user',
    component: AllQuestionUserPageComponent,
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
