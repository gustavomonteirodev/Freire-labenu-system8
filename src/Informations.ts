class InfoPessoais {
    constructor(
        private id: string,
        private nome: string,
        private email: string,
        private data_nasc: string,
        private turma_id: string
    ) {
    }

    getId(): string {
        return this.id
    }
    getNome(): string {
        return this.nome
    }
    getEmail(): string {
        return this.email
    }
    getDataNasc(): string {
        return this.data_nasc
    }
    getTurmaId(): string {
        return this.turma_id
    }
}

export class Estudante extends InfoPessoais {
    private hobbies: string[] = []
    constructor(id: string, nome: string, email: string, data_nasc: string, turma_id: string, hobbies?: string[]) {
        super(id, nome, email, data_nasc, turma_id)
        if(hobbies) {
            this.hobbies = hobbies
        }
    }

    getHobbies(): string[] {
        return this.hobbies
    }
}

export class Docente extends InfoPessoais {
    private especialidades: string[] = []
    constructor(id: string, nome: string, email: string, data_nasc: string, turma_id: string, especialidades?: string[]) {
        super(id, nome, email, data_nasc, turma_id)
        if(especialidades) {
            this.especialidades = this.especialidades
        }
    }

    getEspecialidades(): string[] {
        return this.especialidades
    }
}




export class Turma{
    private id:string | undefined = Date.now().toString()
    private nome:string | undefined
    private modulo:string | undefined

    constructor(nome:string,id?:string,modulo?:string){
        this.nome = nome
        this.id = id;
        this.modulo = modulo;
    }

    public getId(){
        return this.id
    }

    public getNome(){
        return this.nome
    }
}



