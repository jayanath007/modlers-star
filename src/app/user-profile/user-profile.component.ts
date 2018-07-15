import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { UIParams, UIResponse, FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(public auth: AuthService, private fb: FacebookService) { 

    const initParams: InitParams = {
      appId: '1170263726357175',
      xfbml: true,
      version: 'v2.8'
    };

    fb.init(initParams);

  }

  ngOnInit() {
  }


  share(url: string) {

    const params: UIParams = {
      href: 'https://github.com/zyra/ngx-facebook',
      method: 'share'
    };

    this.fb.ui(params)
      .then((res: UIResponse) => {
        return console.log(res);
      }).catch((e: any) => {
       return console.error(e);
      }
    );

  }

}


