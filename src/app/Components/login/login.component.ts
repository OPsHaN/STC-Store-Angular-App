import { Component, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit {

//refresh the data from property when log in or log out

  loading:boolean = false;
  Name: RegExp = /^[0-9a-zA-Z]{4,20}$/;
  Password: RegExp = /^[0-9a-zA-Z]{4,20}$/;
  NameError?: string;
  PasswordError?: string;
  

  username:string='' ;
  password:string='';
  isuserLogged:boolean=false;

//refresh the data from property when log in or log out

private isUserLoggedObject:BehaviorSubject<boolean>;

constructor(private router:Router , private auth:AuthService) {

  this.isUserLoggedObject=new BehaviorSubject<boolean>(this.isUserLogged);


 }


 ngOnInit(): void {
  this.isuserLogged=this.auth.isUserLogged;
}


login() : void {
  if(this.username == 'admin' && this.password == 'admin' ){
    alert("Welcome : "+this.username);
    localStorage.setItem("token" ,this.username);
    this.isUserLoggedObject.next(true);
   this.router.navigate(["/dashboard"]);
  }
   else if(this.username == 'user' && this.password == 'user'){
    alert("Welcome : "+this.username);
    localStorage.setItem("token" ,this.username);
    this.isUserLoggedObject.next(true);
   this.router.navigate(["/products"]);
   
  }
  else {
    alert("Your details is wrong . Please try again");
  }

this.isuserLogged=this.auth.isUserLogged;

}

logout() {
this.auth.logout();
this.isuserLogged=this.auth.isUserLogged;
}
  



checkname(name: any) {
  console.log(this.NameError);

  if (!this.Name.test(name)) {
    this.NameError = 'Try Again With Correct Username';
  }
  else {
    this.NameError=undefined;
  }
}
checkpass(password: any) {
  if (!this.Password.test(password)) {
    this.PasswordError ="Password should contain more than 6 characters"
  }
  else {
    this.PasswordError = undefined;
  }

}

 //check when user login and the token saved in localstorage

 get isUserLogged() {
  return (localStorage.getItem("token"))?true:false;
    }
  

}


