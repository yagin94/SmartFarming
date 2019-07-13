import { Component, OnInit } from '@angular/core';
import {QaService} from './qa.service';
import {AddAnsObj, Answers, Q, Qa, TextSearch} from './qa.model';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-qa-page',
  templateUrl: './qa-page.component.html',
  providers: [QaService],
  styleUrls: ['./qa-page.component.css']
})
export class QaPageComponent implements OnInit {
  qa$: Qa[] ;
  checkAdd$ = 0;
  checkEditAnswer$ = 0;
  checkAddAnswer$ = 0;
  editQuestion$: Qa;
  editAnswer$: Answers;
  answer$: any;
  pageIndex$ = 0;
  numberOfPage$: any;
  textSearch$: TextSearch;

  constructor(private qaService: QaService) { }

  ngOnInit() {
    this.getnumberPages();
    this.getQa(this.pageIndex$);
  }
  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }
  getnumberPages() {
    this.qaService.getNumberOfPages().subscribe(qa => this.numberOfPage$ = qa);
  }
  getQa(pageIndex: number): void {
    this.qaService.getQa(pageIndex).subscribe(qa => this.qa$ = qa);
  }
  abc() {
    console.log('here', this.qa$);
  }
  addQa(title, content: string): void {
    title = title.trim();
    content = content.trim();
    if (!title || !content ) { return; }
    const newQa: Qa = {title, content} as Qa;
    this.qaService.addQa(newQa).subscribe(qa => this.qa$.push(qa));
  }
  deleteQa(qa: Qa): void {
    if (confirm ('are you sure to delete this question')) {
      this.qa$ = this.qa$.filter(h => h !== qa);
      this.qaService.deleteQa(qa.id).subscribe();
    }
  }
  updateQuestion() {
    console.log('title', this.editQuestion$.title);
    if (this.editQuestion$) {
      this.qaService.updateQuestion(this.editQuestion$.id, this.editQuestion$).subscribe(qa => {
        const ix = qa ? this.qa$.findIndex(h => h.id === qa.id) : -1;
        if (ix > -1) {this.qa$[ix] = qa; }
      });
      // this.editArticle$ = undefined;
    }
  }
  searchQa(searchTerm: string) {
    console.log('=========================', searchTerm);
    if (searchTerm) {
      this.qaService.searchQa(searchTerm).subscribe(qa => {
          this.qa$ = qa;
      });
    }
  }
  addAnswers(content: string): void {
    content = content.trim();
    if (!content) { return; }
    // const newAnswer: Answers = {content} as Answers;
    const q = new Q(this.editQuestion$.id);
    const x = new AddAnsObj(content, q);
    this.qaService.addAnswer(x).subscribe(answer => this.answer$.push(answer));
    console.log(this.editQuestion$);
  }
  add() {
    this.checkAdd$ = 1;
  }
  edit(qa: Qa) {
    this.editQuestion$ = qa;
    this.answer$ = qa.answers;
    this.checkAdd$ = 2;
  }
  addAnswer() {
    this.checkEditAnswer$ = 3;
    this.checkAddAnswer$ = 1;
  }
  editAnswers(answer: Answers) {
    this.editAnswer$ = answer;
  }
  editAnswer() {
    this.checkEditAnswer$ = 1;
    this.checkAddAnswer$ = 3;
  }
  updateAnswer() {
    if (this.editAnswer$) {
      this.qaService.updateAnswer(this.editAnswer$.id, this.editAnswer$).subscribe(answer => {
        const ix = answer ? this.answer$.findIndex(h => h.id === answer.id) : -1;
        if (ix > -1) {this.answer$[ix] = answer; }
      });
    }
  }
  deleteAnswer(answer: Answers): void {
    if (confirm ('are you sure to delete this answer')) {
      this.answer$ = this.answer$.filter(h => h !== answer);
      this.qaService.deleteAnswer(answer.id).subscribe();
    }
  }
}
