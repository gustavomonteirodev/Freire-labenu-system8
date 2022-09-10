import { BaseError } from "./BaseError";

export class EstudanteNaoCadastrado extends BaseError{
    constructor() {
        super("Estudante não cadastrado no sistema.", 404)
    }
}