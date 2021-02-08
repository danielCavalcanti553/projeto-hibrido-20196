import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { from, Observable } from "rxjs";
import { Cliente } from "../model/cliente";

@Injectable()
export class ClienteService{

    constructor(private firestore : AngularFirestore){}


    cadastrar(cliente : any) : Observable<any>{ // Função cadastro
        return from(new Observable(observe=>{ // Converte para Observable

            //codigo -> Inicia o cadastro
            this.firestore.collection('cliente').add(cliente).then(response=>{
                observe.next("Cadastrado com sucesso");
            }).catch(err=>{
                console.log(err);
                observe.next("Erro ao cadastrar");
            })
            // fim codigo
        }))
    }

    listaDeClientes(): Observable<any>{

        return from(new Observable(observe=>{ // Converte para Observable
            
            this.firestore.collection('cliente').snapshotChanges().subscribe(response=>{ 
                
                let lista : Cliente[] = []; // iniciar uma lista vazia  

                // converter o response em objetos cliente
                response.map(obj=>{ 
                    // dados do cliente
                    let data = obj.payload.doc.data();
                    let id = obj.payload.doc.id;

                    // dados do cliente no objeto CLiente
                    let cliente : Cliente = new Cliente();
                    cliente.setData(id,data);
                    lista.push(cliente); // adicionando o cliente na lista

                })

                observe.next(lista);
            })


        }))  
    }

    buscarPorId(id : any): Observable<any>{
        return from(new Observable(observe=>{ // Converte para Observable

            this.firestore.collection('cliente').doc(id).snapshotChanges().subscribe(response=>{
                
                let data = response.payload.data();
                let id = response.payload.id;

                // dados do cliente no objeto CLiente
                let cliente : Cliente = new Cliente();
                cliente.setData(id,data);

                observe.next(cliente);
            },err=>{
                observe.next(null);
            })

        }))
    }


    atualizar(id : any, dados : any): Observable<any>{
        return from(new Observable(observe=>{ // Converte para Observable
       
            this.firestore.collection('cliente').doc(id).set(dados).then(response=>{
                observe.next("Atualizado com sucesso");
            },err=>{
                observe.next("Erro ao atualizar");
            })
                    
        }))

    }

    excluir(id : any): Observable<any>{
        return from(new Observable(observe=>{ // Converte para Observable

            this.firestore.collection('cliente').doc(id).delete().then(response=>{
                observe.next("Excluído com sucesso");
            },err=>{
                observe.next("Erro ao atualizar");
            })
        })) 
    }
}