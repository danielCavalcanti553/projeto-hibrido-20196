import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';
import { TemplateService } from '../service/template.service';

@Component({
  selector: 'app-cliente-atualizar',
  templateUrl: './cliente-atualizar.page.html',
  styleUrls: ['./cliente-atualizar.page.scss'],
})
export class ClienteAtualizarPage implements OnInit {

  formGroup: FormGroup;
  cliente: Cliente = new Cliente();

  constructor(private navCtrl: NavController,
    private formB: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private clienteServ: ClienteService,
    private template: TemplateService) {
    this.iniciarForm();
  }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(idUrl => {
      let id = idUrl.get('id');

      this.clienteServ.buscarPorId(id).subscribe(response => {
        this.cliente = response;
        console.log(this.cliente);
        this.iniciarForm();
      })

    })
  }

  iniciarForm() {
    this.formGroup = this.formB.group({
      nome: [this.cliente.nome],
      cpf: [this.cliente.cpf],
      cidade: [this.cliente.cidade],
      endereco: [this.cliente.endereco],
      numero: [this.cliente.numero],
      estado: [this.cliente.estado],
      email: [this.cliente.email],
      telefone: [this.cliente.telefone]
    })
  }

  atualizar() {

    this.template.loading.then(load => { // iniciar o carregamento
      load.present(); // forçar inicio carremento

      this.clienteServ.atualizar(this.cliente.id, this.formGroup.value).subscribe(response => {
        load.dismiss();
        this.template.myAlert(response);
      },err=>{
        load.dismiss();
        this.template.myAlert(err);
      })

    })
  }

}
