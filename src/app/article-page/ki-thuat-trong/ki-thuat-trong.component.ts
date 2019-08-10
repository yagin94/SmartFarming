import {Component, OnInit} from '@angular/core';
import {GrowService} from './Grow.service';
import {GetAllArticle} from '../trang-chinh/trang-chinh.model';

@Component({
  providers: [GrowService],
  selector: 'app-ki-thuat-trong',
  templateUrl: './ki-thuat-trong.component.html',
  styleUrls: ['./ki-thuat-trong.component.css']
})
export class KiThuatTrongComponent implements OnInit {
  getGrowArticle$ = new GetAllArticle();
  pageIndex$ = 0;
  constructor(private growService: GrowService) {
  }

  ngOnInit() {
    this.getGrowArticle(this.pageIndex$);
  }

  getGrowArticle(pageIndex$: number) {
    this.growService.getGrowArticle(this.pageIndex$).subscribe(object => {
      this.getGrowArticle$ = object;
      console.log(this.getGrowArticle$);
    });
  }

  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }
}
