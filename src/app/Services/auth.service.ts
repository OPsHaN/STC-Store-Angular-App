import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  username: string="";
  password: string="";
  isuserLogged:boolean=false;

//refresh the data from property when log in or log out

  private isUserLoggedObject:BehaviorSubject<boolean>;


  constructor(private router:Router) {

    this.isUserLoggedObject=new BehaviorSubject<boolean>(this.isUserLogged);
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
      alert("Your Details Is Wrong . Please Try again");
    }
  }

   logout(){
    localStorage.removeItem("token");
    this.isUserLoggedObject.next(false);
  }

 //check when user login and the token saved in localstorage

 get isUserLogged() {
  return (localStorage.getItem("token"))?true:false;
    }
  
  
    //refresh the data when login or logout
    getLoggedStatus():Observable<boolean>{
      return this.isUserLoggedObject.asObservable();
    }
}
