import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username: string="";
  password: string="";
  isuserLogged:boolean=false;


  constructor(private auth: AuthService ) {

   }

  ngOnInit(): void {


this.auth.getLoggedStatus().subscribe (status=> {
this.isuserLogged=status;

this.isuserLogged=this.auth.isUserLogged;

})
  }

  logout() {
    this.auth.logout();
    this.isuserLogged=this.auth.isUserLogged;
  }
}
