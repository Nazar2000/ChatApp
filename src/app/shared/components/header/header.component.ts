import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public page: string;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.page = this.activatedRoute.snapshot.paramMap.get('id');
  }

}