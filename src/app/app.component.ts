import {Component, TemplateRef, ViewChild} from '@angular/core';
import {HeaderComponent} from './common/header/header.component';
import {NgxLoadingComponent} from 'ngx-loading';
import {Globals} from './common/globalVariables';
@Component({
  providers: [HeaderComponent, Globals],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private globals: Globals) {
    globals.loading = false;
  }
  @ViewChild('ngxLoading') ngxLoadingComponent: NgxLoadingComponent;
  public loadingTemplate: TemplateRef<any>;
  title = 'app';
}
