import { Component, OnInit } from '@angular/core';
import {TrangChinhService} from '../trang-chinh/trang-chinh.service';

@Component({
  providers: [TrangChinhService],
  selector: 'app-ky-thuat-nhan-giong',
  templateUrl: './ky-thuat-nhan-giong.component.html',
  styleUrls: ['./ky-thuat-nhan-giong.component.css']
})
export class KyThuatNhanGiongComponent implements OnInit {

  constructor(private trangChinhService: TrangChinhService) { }

  ngOnInit() {
  }
  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }
}
