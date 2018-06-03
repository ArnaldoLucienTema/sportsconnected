import { Component, OnInit } from '@angular/core';
import {UserInfoViewModel} from '../_models/user_info_viewmodel';
import {User_infoService} from '../_services/user_info.service';
import { Chart } from 'chart.js';
import {Sort} from '@angular/material';


@Component({
  selector: 'app-user-info-media',
  templateUrl: './user-info-media.component.html',
  styleUrls: ['./user-info-media.component.css']
})
export class User_infoMediaComponent implements OnInit{

  viewModel: UserInfoViewModel;
  userInfoService : User_infoService;
  sortedData;
  constructor() {
  }

  ngOnInit() {

    this.userInfoService = new User_infoService();
    this.userInfoService.getUserInfo('0')
      .subscribe(userInfo => {
        this.sortedData = userInfo.media.slice();
        return this.viewModel = userInfo
      });
  }

  sortData(sort: Sort) {
    const data = this.viewModel.media.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'Popular': return compare(+a.views, +b.views, isAsc);
        case 'Recente': return compare(a.date, b.date, isAsc);
        case 'Gostos': return compare(+a.likes, +b.likes, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
