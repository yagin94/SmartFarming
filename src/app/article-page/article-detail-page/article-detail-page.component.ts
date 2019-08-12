import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Article, Comments} from '../article.model';
import {ArticleDetailService} from './detail.service';
import {DataShareService} from '../../share-data-service/date-share-service';
import {AddAnsObj, Answers, AppUser, Q} from '../../qa-page/qa.model';
import {A, AddCommentObj} from './detail.model';
import {Observable} from 'rxjs';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';

@Component({
  providers: [ArticleDetailService, DataShareService],
  selector: 'app-article-detail-page',
  templateUrl: './article-detail-page.component.html',
  styleUrls: ['./article-detail-page.component.css']
})
export class ArticleDetailPageComponent implements OnInit {
  data: any;
  article$: Article = new Article();
  distinct$: any;
  checkAdmin = '';
  articleDelete$: Article[];
  editArticle$: Article;
  ansContent: string;
  userName$: string;
  appUser$: AppUser = new AppUser();
  getAllArticle$: GetAllArticle = new GetAllArticle();
  checkEditComment$ = false;
  editComment$: Comments;
  compare$: number;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataShareService: DataShareService,
              private articleDetailService: ArticleDetailService) {
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.checkRole();
    this.route.queryParams.subscribe(params => this.data = params.id);
    this.getArticleDetail(this.data);
    this.getTopArticle();
    this.getDistinct();
  }

  checkRole() {
    if (!JSON.parse(localStorage.getItem('currentAppUser'))) {
      return false;
    } else {
      this.checkAdmin = JSON.parse(localStorage.getItem('currentAppUser')).role;

    }
  }

  getArticleDetail(articleId: number) {
    this.articleDetailService.getDetail(articleId).subscribe(result => {
      this.article$ = result;
      console.log(this.article$);
    });
  }

  getDistinct() {
    this.articleDetailService.getDistinct().subscribe(distinct => {
      this.distinct$ = distinct;
      console.log(this.distinct$);
    });
  }

  deleteArticle(id: any): void {
    // console.log(id);
    this.articleDelete$ = [];
    if (confirm('are you sure to delete this article')) {
      this.articleDelete$ = this.articleDelete$.filter(h => h !== id);
      this.articleDetailService.deleteArticle(id).subscribe(
        onSuccess => {
          alert('Xóa câu hỏi thành công!!!');
          window.history.back();
        },
        onFail => {
          alert('Bạn không thể xóa câu hỏi này !!!');
        }
      );
    }
  }

  editArticle(article: Article) {
    this.editArticle$ = article;
    this.dataShareService.setShareData(article);
    // this.router.navigate(['./article-post-page'], {queryParams: {id: article.articleId}});
    window.location.replace(`/article-detail-page?id=${article.articleId}`);
  }

  addComment(ansewerContent: string): void {
    this.ansContent = ansewerContent.trim();
    if (!this.ansContent) {
      return;
    }
    this.appUser$ = new AppUser();
    // const newAnswer: Answers = {content} as Answers;
    if (this.isLoggedIn()) {
      this.appUser$.userId = JSON.parse(localStorage.getItem('currentAppUser')).userId;
      this.userName$ = JSON.parse(localStorage.getItem('currentUser')).name;
    } else {
      this.userName$ = 'anonymous';
      this.appUser$.anonymous = true;
    }
    const a = this.appUser$;
    const ar = new A(this.article$.articleId);
    const x = new AddCommentObj(this.ansContent, a, ar);
    console.log(x);
    this.articleDetailService.addComment(x).subscribe(answer => {
      // this.answer$.push(answer)
      this.getArticleDetail(this.data);
      this.ansContent = '';
    });
    // console.log(x);
  }
  editComment(comment: Comments) {
    this.checkEditComment$ = true;
    this.editComment$ = comment;
    this.ansContent = comment.content;
  }
  deleteComment(commentId: number): void {
    if (confirm('are you sure to delete this answer')) {
      // this.answer$ = this.answer$.filter(h => h !== answerId);
      this.articleDetailService.deleteAnswer(commentId).subscribe(onSuccess => {
          alert('Xóa câu thành công!!!');
          this.getArticleDetail(this.data);
        },
        onFail => {
          alert('Bạn không thể xóa câu trả lời này !!!');
        });
    }
  }
  updateComment(content: string) {
    const u: AppUser = new AppUser();
    u.userId = this.editComment$.appUser.userId;
    const ar: Article = new Article();
    ar.articleId = this.article$.articleId;
    const a: AddCommentObj = new AddCommentObj(content, u, ar);
    this.articleDetailService.updateComment(this.editComment$.commentId, a).subscribe(
      onSuccess => {
        this.getArticleDetail(this.data);
        this.checkEditComment$ = false;
        this.ansContent = '';
      }
    );
  }
  getTopArticle(): void {
    this.articleDetailService.getTopArticle().subscribe(top => this.getAllArticle$ = top);
  }
  isLoggedIn() {
    if (localStorage.getItem('currentAppUser')) {
      return true;
    }
    return false;
  }
  checkAuthenAnswer(comment: Answers) {
    if (JSON.parse(localStorage.getItem('currentAppUser')) == null) {
      this.compare$ = JSON.parse(localStorage.getItem('anonymousUser')).userId;
      if (comment.appUser != null) {
        if (this.compare$ == comment.appUser.userId) {
          // console.log((localStorage.getItem('currentAppUser')).userId);
          // console.log(this.qa$.appUser.userId);
          // console.log(this.compare$);
          return true;
        } else {
          return false;
        }
      }
    } else if (JSON.parse(localStorage.getItem('currentAppUser')) != null) {
      this.compare$ = JSON.parse(localStorage.getItem('currentAppUser')).userId;
      if (comment.appUser != null) {
        if (this.compare$ == comment.appUser.userId) {
          // console.log((localStorage.getItem('currentAppUser')).userId);
          // console.log(this.qa$.appUser.userId);
          // console.log(this.compare$);
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }
}
