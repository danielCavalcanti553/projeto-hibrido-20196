import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { TemplateService } from '../service/template.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formGroup: FormGroup;

  constructor(private formB: FormBuilder,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private auth: AngularFireAuth,
    private template: TemplateService) {

    this.menuCtrl.enable(false);
    this.iniciarForm();

    this.auth.authState.subscribe(response=>{
      
    })
  }

  ngOnInit() {
  }

  logar() {

    this.template.loading.then(load => { // iniciar o carregamento
      load.present(); // forçar inicio carremento
      let user = this.formGroup.controls['username'].value;
      let password = this.formGroup.controls['password'].value;
      
      this.auth.signInWithEmailAndPassword(user, password).then(data => { // tentar logar
        // login correto
        load.dismiss(); // parar o carregamento
        this.navCtrl.navigateRoot(['/home']);
      }).catch(err => {
        // login errado
        load.dismiss(); // parar o carregamento
        this.template.myAlert("Login incorreto");
        
      })

    })

  }

  iniciarForm() {
    this.formGroup = this.formB.group({
      username: ['admin@email.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]]
    })
  }

  paginaCadastro() {
    this.navCtrl.navigateForward(['/login-cadastro']);
  }

  recuperarSenha() {
    this.navCtrl.navigateForward(['/login-recuperar']);
  }

}
