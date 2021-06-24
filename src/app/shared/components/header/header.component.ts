import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GeneralService} from '../../../core/services/generel/general.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public page: string;
  public ifChatPage: boolean;

  constructor(
    public generalService: GeneralService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.ifChatPage = this.router.url.includes('/chat');
    this.page = this.activatedRoute.snapshot.paramMap.get('id');
  }
}
