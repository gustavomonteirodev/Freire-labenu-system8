import { BaseError } from "./BaseError";

export class EmailJaCadastrado extends BaseError {
    constructor() {
        super("Esse e-mail já se encontra no sistema.", 404)
    }
}