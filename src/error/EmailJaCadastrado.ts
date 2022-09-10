import { BaseError } from "./BaseError";

export class EmailJaCadastrado extends BaseError {
    constructor() {
        super("Esse e-amil já foi se encontra no sistema.", 404)
    }
}