import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { FacebookService } from '../../../../node_modules/ngx-facebook';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(public auth: AuthService, private fb: FacebookService) { }

  ngOnInit() {
  }

}
