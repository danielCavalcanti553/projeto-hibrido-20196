import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { TemplateService } from '../service/template.service';

@Component({
  selector: 'app-login-cadastro',
  templateUrl: './login-cadastro.page.html',
  styleUrls: ['./login-cadastro.page.scss'],
})
export class LoginCadastroPage implements OnInit {

  formGroup: FormGroup;

  constructor(private formB: FormBuilder,
    private navCtrl: NavController,
    private auth: AngularFireAuth,
    private template: TemplateService) {
    this.iniciarForm();
  }

  ngOnInit() {
  }

  cadastro() {

    this.template.loading.then(load => { // iniciar o carregamento
      load.present(); // forçar inicio carremento
      let user = this.formGroup.controls['username'].value;
      let password = this.formGroup.controls['password'].value;

      this.auth.createUserWithEmailAndPassword(user, password).then(data => {
        load.dismiss();
        this.navCtrl.navigateRoot(['/login']);
      }).catch(err => {
        load.dismiss();
        this.template.myAlert("Login incorreto");
      })

    })
  }

  iniciarForm() {
    this.formGroup = this.formB.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

}
