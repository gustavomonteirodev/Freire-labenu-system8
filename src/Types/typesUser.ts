export type UserEstudante = {
    id: string,
    nome: string,
    email: string,
    data_nasc: string,
    turma_id: string,
    hobbies: string[]
}

export type UserDocente = {
    id: string,
    nome: string,
    email: string,
    data_nasc: string,
    turma_id: string,
    especialidades: string[]
}