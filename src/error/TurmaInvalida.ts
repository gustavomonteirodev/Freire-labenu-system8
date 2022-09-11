import { BaseError } from "./BaseError";

export class TurmaInvalida extends BaseError {
    constructor(){
        super("Turma não encontrada", 401)
    }
}