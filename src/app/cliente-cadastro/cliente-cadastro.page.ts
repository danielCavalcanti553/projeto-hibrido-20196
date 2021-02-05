import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ClienteService } from '../service/cliente.service';
import { TemplateService } from '../service/template.service';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.page.html',
  styleUrls: ['./cliente-cadastro.page.scss'],
})
export class ClienteCadastroPage implements OnInit {

  formGroup: FormGroup;

  constructor(private formB: FormBuilder,
    private navCtrl: NavController,
    private template: TemplateService,
    private clienteServ: ClienteService) {
    this.iniciarForm();
  }

  ngOnInit() {
  }

  cadastro() {
    this.template.loading.then(load => { // iniciar o carregamento
      load.present(); // forçar inicio carremento

      this.clienteServ.cadastrar(this.formGroup.value).subscribe(response => {
        load.dismiss();
        this.template.myAlert(response);
      })

    })
  }

  iniciarForm() {
    this.formGroup = this.formB.group({
      nome: [],
      cpf: [],
      cidade: [],
      endereco: [],
      numero: [],
      estado: [],
      email: [],
      telefone: []
    })
  }

}
