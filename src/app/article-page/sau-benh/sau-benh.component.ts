import { Component, OnInit } from '@angular/core';
import {TrangChinhService} from '../trang-chinh/trang-chinh.service';

@Component({
  providers: [TrangChinhService],
  selector: 'app-sau-benh',
  templateUrl: './sau-benh.component.html',
  styleUrls: ['./sau-benh.component.css']
})
export class SauBenhComponent implements OnInit {

  constructor(private trangChinhService: TrangChinhService) { }

  ngOnInit() {
  }
  arrayPage(numberOfPage: number): any[] {
    return Array(numberOfPage);
  }
}
