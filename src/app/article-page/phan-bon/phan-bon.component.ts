import { Component, OnInit } from '@angular/core';
import {TrangChinhService} from '../trang-chinh/trang-chinh.service';

@Component({
  providers: [TrangChinhService],
  selector: 'app-phan-bon',
  templateUrl: './phan-bon.component.html',
  styleUrls: ['./phan-bon.component.css']
})
export class PhanBonComponent implements OnInit {

  constructor(private trangChinhService: TrangChinhService) { }

  ngOnInit() {
  }
  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }
}
