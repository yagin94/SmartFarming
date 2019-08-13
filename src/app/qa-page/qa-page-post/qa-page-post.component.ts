import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../../common/header/header.component';
import {QaService} from '../qa.service';
import {Answers, AppUser, GetObject, GetObjectTopQa, GetObjectTopTag, GetObjectTopUser, Qa, Tag} from '../qa.model';
import {forEach} from '@angular/router/src/utils/collection';
import {CKEditor4} from 'ckeditor4-angular';
import {ActivatedRoute, Router} from '@angular/router';
import {DataShareService} from '../../share-data-service/date-share-service';

@Component({
  providers: [HeaderComponent, QaService, DataShareService],
  selector: 'app-qa-page-post',
  templateUrl: './qa-page-post.component.html',
  styleUrls: ['./qa-page-post.component.css']
})
export class QaPagePostComponent implements OnInit {
  getObject$: GetObject;
  getObjectTopTag$: GetObjectTopTag;
  getObjectTopUser$: GetObjectTopUser;
  getObjectTopQa$: GetObjectTopQa;
  qa$: Qa[];
  qa: Qa;
  appUser$: AppUser;
  tags: Tag[];
  tag: Tag;
  subString: string[];
  fileDownloadUris$: string[];
  userName$: string;
  editorData: string;
  data: any;
  topQa$: Qa[];
  topTag$: Tag[];
  editQuestion$: Qa;
  answer$: any;
  ckeConfig: any;
  public model = {
    editorData: '',
    default: ''
  };
  loadingPostQa = false;
  constructor(private qaService: QaService,
              private route: ActivatedRoute,
              private router: Router,
              private dataShareService: DataShareService) {
  }

  ngOnInit() {
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true,
      cloudServices_tokenUrl: 'https://41367.cke-cs.com/token/dev/ZSxEmpAFgnVMSwitJpPICegFIkakUBW0nh9VuyNvFw13DUbpQNLJAQqhyyh2',
      cloudServices_uploadUrl: 'https://41367.cke-cs.com/easyimage/upload/',
      removeButtons: 'Save,NewPage,Preview,Print,Templates,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Find,Select,Button,ImageButton,HiddenField,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,PageBreak,Iframe,TextColor,BGColor,ShowBlocks,Cut,Copy,Paste,Table,Source,Maximize,Styles,Anchor,SpecialChar,PasteFromWord,PasteText,Scayt,Undo,Redo,Strike,RemoveFormat,Indent,Outdent,Blockquote,Subscript,Superscript,About,Link,Unlink'
    };
    this.route.queryParams.subscribe(params => this.data = params.id);
    this.getQaDetail(this.data);
    this.getTopQa();
    this.getTopTag();
    this.getTopUser();

  }

  public onChange(event: CKEditor4.EventInfo) {
    console.log(event.editor.getData());
  }

  abcd() {
    console.log('=====', this.data);
  }

  getQaDetail(questionId: number): void {
    this.qaService.getQaDetail(questionId).subscribe(qa => {
      this.qa = qa;
      this.model.default = this.qa.content;
    });
  }

  getTopQa(): void {
    this.qaService.getTopQa().subscribe(getObjectTopQa => this.getObjectTopQa$ = getObjectTopQa);
  }

  getTopTag(): void {
    this.qaService.getTopTag().subscribe(getObjectTopTag => this.getObjectTopTag$ = getObjectTopTag);
  }

  getTopUser(): void {
    this.qaService.getTopUser().subscribe(getObjectTopUser => this.getObjectTopUser$ = getObjectTopUser);
  }

  addQa(title: string, array: string): void {
    this.loadingPostQa = true;
    this.userName$ = '';
    this.subString = [];
    this.qa$ = [];
    this.tags = [];
    this.appUser$ = new AppUser();
    this.fileDownloadUris$ = [];
    this.subString = array.split(',');
    for (let i = 0; i < this.subString.length; i++) {
      this.tag = new Tag(this.subString[i], 'dfasdfasdfasdf');
      if (this.tags.length < 5) {
        this.tags.push(this.tag);
      }
    }
    if (this.isLoggedIn()) {
      this.appUser$.userId = JSON.parse(localStorage.getItem('currentAppUser')).userId;
      this.userName$ = JSON.parse(localStorage.getItem('currentUser')).name;
    } else {
      this.userName$ = 'anonymous';
      this.appUser$.anonymous = true;
    }
    this.fileDownloadUris$ = ['abc'];
    title = title.trim();
    if (!title) {
      return;
    }
    const t: Tag[] = this.tags;
    const a: AppUser = this.appUser$;
    const f = this.fileDownloadUris$;
    const n = this.userName$;
    console.log(this.appUser$);
    const newQa: Qa = new Qa(title, this.model.editorData, a, t, f, n);
    console.log(newQa);
    console.log(this.model.editorData);
    this.qaService.addQa(newQa).subscribe(
      onSuccess => {
        alert('added');
        this.qa$.push(newQa);
        this.loadingPostQa = false;
         location.replace(`/qa-page`);
      },
      onFail => {
        alert('can not add question');
      }
    );
  }

  updateQuestion(title: string, array: string) {
    this.userName$ = '';
    this.subString = [];
    this.qa$ = [];
    this.tags = [];
    this.appUser$ = new AppUser();
    this.fileDownloadUris$ = [];
    this.subString = array.split(',');
    for (let i = 0; i < this.subString.length; i++) {
      this.tag = new Tag(this.subString[i], 'dfasdfasdfasdf');
      if (this.tags.length < 5) {
        this.tags.push(this.tag);
      }
    }
    if (this.isLoggedIn()) {
      this.appUser$.userId = JSON.parse(localStorage.getItem('currentAppUser')).userId;
      this.userName$ = JSON.parse(localStorage.getItem('currentUser')).name;
    } else {
      this.userName$ = 'anonymous';
      this.appUser$.anonymous = true;
    }
    this.fileDownloadUris$ = ['abc'];
    title = title.trim();
    if (!title) {
      return;
    }
    const t: Tag[] = this.tags;
    const a: AppUser = this.appUser$;
    const f = this.fileDownloadUris$;
    const n = this.userName$;
    console.log(this.appUser$);
    const newQa: Qa = new Qa(title, this.model.default, a, t, f, n);
    console.log(newQa);
    this.qaService.updateQuestion(this.data, newQa).subscribe(
      onSuccess => {
        window.location.replace(`/qa-page-detail?id=${this.data}`);
        alert('cập nhật thành công!!!');
      },
      onFail => {
        alert('cập nhật thất bại');
      }
    );
  }

  isLoggedIn() {
    if (localStorage.getItem('currentAppUser')) {
      return true;
    }
    return false;
  }

  getNumber(object: Answers) {
    return Object.keys(object).length;
  }

  edit(qa: Qa) {
    this.editQuestion$ = qa;
    this.answer$ = qa.answers;

    this.dataShareService.setShareData(qa);
    console.log(qa);
    this.router.navigate(['./qa-page-detail'], {queryParams: {id: qa.questionId}});
    // console.log(this.dataShareService.getShareData());
  }

  getQaByTag(tagId: number) {
    this.router.navigate(['./qa-page'], {queryParams: {id: tagId}});
  }
}
