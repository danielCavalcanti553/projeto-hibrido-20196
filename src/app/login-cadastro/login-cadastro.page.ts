import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login-cadastro',
  templateUrl: './login-cadastro.page.html',
  styleUrls: ['./login-cadastro.page.scss'],
})
export class LoginCadastroPage implements OnInit {

  formGroup : FormGroup; 

  constructor(private formB : FormBuilder,
    private navCtrl : NavController,
    private auth : AngularFireAuth) {
      this.iniciarForm();
    }

  ngOnInit() {
  }

  cadastro(){

    let user = this.formGroup.controls['username'].value;
    let password = this.formGroup.controls['password'].value;

    this.auth.createUserWithEmailAndPassword(user,password).then(data=>{
      this.navCtrl.navigateRoot(['/login']);
    }).catch(err=>{
      console.log("Erro ao cadastrar");
    })
  }

  iniciarForm(){
    this.formGroup = this.formB.group({
      username : ['', [Validators.required,Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]]
    })
  }

}
