import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { TemplateService } from '../service/template.service';

@Component({
  selector: 'app-login-recuperar',
  templateUrl: './login-recuperar.page.html',
  styleUrls: ['./login-recuperar.page.scss'],
})
export class LoginRecuperarPage implements OnInit {

  formGroup: FormGroup;
  
  constructor(private formB: FormBuilder,
    private auth: AngularFireAuth,
    private template: TemplateService,
    private navCtrl: NavController) {
      this.iniciarForm();
    }

  ngOnInit() {
  }

  iniciarForm() {
    this.formGroup = this.formB.group({
      username: ['', [Validators.required, Validators.email]],
  
    })
  }

  recuperar() {

    this.template.loading.then(load => { // iniciar o carregamento
      load.present(); // forçar inicio carremento
      let user = this.formGroup.controls['username'].value;
        
      this.auth.sendPasswordResetEmail(user).then(data => { // tentar logar
        // login correto
        load.dismiss(); // parar o carregamento
        this.navCtrl.navigateRoot(['/home']);
        this.template.myAlert("Enviado para seu e-mail");
      }).catch(err => {
        // login errado
        load.dismiss(); // parar o carregamento
        this.template.myAlert("Login incorreto");
        
      })

    })

  }

}
