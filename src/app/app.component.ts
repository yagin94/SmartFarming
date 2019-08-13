import {Component, Injectable, TemplateRef, ViewChild} from '@angular/core';
import {HeaderComponent} from './common/header/header.component';
import {NgxLoadingComponent} from 'ngx-loading';
import {Globals} from './common/globalVariables';
import {load} from '@angular/core/src/render3/instructions';
import {QaPagePostComponent} from './qa-page/qa-page-post/qa-page-post.component';

@Component({
  providers: [HeaderComponent, Globals, QaPagePostComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private globals: Globals) {
  }

  @ViewChild('ngxLoading') ngxLoadingComponent: NgxLoadingComponent;
  public loadingTemplate: TemplateRef<any>;
  title = 'app';
  @ViewChild(HeaderComponent) header;
  abc() {
    // console.log(this.globals.lo);
    // console.log(this.globals.load);
    console.log(this.globals.load.value)
    // this.globals.load.subscribe(data => {
    //   console.log(data);
    // });
    // console.log(this.globals.loading);
  }
}

