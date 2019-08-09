import { Component, OnInit } from '@angular/core';
import {TrangChinhService} from '../trang-chinh/trang-chinh.service';

@Component({
  providers: [TrangChinhService],
  selector: 'app-ki-thuat-trong',
  templateUrl: './ki-thuat-trong.component.html',
  styleUrls: ['./ki-thuat-trong.component.css']
})
export class KiThuatTrongComponent implements OnInit {

  constructor(private trangChinhService: TrangChinhService) { }

  ngOnInit() {
  }
  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }
}
