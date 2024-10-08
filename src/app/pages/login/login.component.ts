import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObject:any={
    username:'',
    password:''
  }

   router = inject(Router)

   onLogin(){
     if(this.loginObject.username=="admin" && this.loginObject.password=="admin"){
       this.router.navigateByUrl('dashboard');
     }else{
      alert("Wrong Crediatinal");
     }
  }
}
