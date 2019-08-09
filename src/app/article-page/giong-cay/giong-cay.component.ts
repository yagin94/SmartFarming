import { Component, OnInit } from '@angular/core';
import {TrangChinhService} from '../trang-chinh/trang-chinh.service';

@Component({
  providers: [TrangChinhService],
  selector: 'app-giong-cay',
  templateUrl: './giong-cay.component.html',
  styleUrls: ['./giong-cay.component.css']
})
export class GiongCayComponent implements OnInit {

  constructor(private trangChinhService: TrangChinhService) { }

  ngOnInit() {
  }
  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }
}
