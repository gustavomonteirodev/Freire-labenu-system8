class InfoPessoais {
    constructor(
        private id: string,
        private nome: string,
        private email: string,
        private data_nasc: string,
        private turma_id: string
    ) {
    }
}

class Estudante extends InfoPessoais {
    private hobbies: string
    constructor(id: string, nome: string, email: string, data_nasc: string, turma_id: string, hobbies: string) {
        super(id, nome, email, data_nasc, turma_id)
        this.hobbies = hobbies
    }
}

class Docente extends InfoPessoais {
    private especialidades: string
    constructor(id: string, nome: string, email: string, data_nasc: string, turma_id: string, especialidades: string) {
        super(id, nome, email, data_nasc, turma_id)
        this.especialidades = especialidades
    }
}

class Turma {
    constructor(
        private id: string,
        private nome: string,
        private docentes: string,
        private estudantes: string,
        private modulo: number
    ) {
    }
}
