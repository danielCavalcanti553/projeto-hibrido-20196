export class Cliente{
    
    id : string;
    nome : string;
    cpf : string;
    cidade: string;
    endereco : string;
    numero : string;
    estado : string;
    email : string;
    telefone : string;

    setData(id : any, data: any){
        this.id = id;
        this.nome = data.nome;
        this.cpf = data.cpf;
        this.cidade = data.cidade;
        this.endereco = data.endereco;
        this.numero = data.numero;
        this.estado = data.estado;
        this.email = data.email;
        this.telefone = data.telefone;
    }

}