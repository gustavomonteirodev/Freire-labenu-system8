import { BaseError } from "./BaseError"

export class MissingFields extends BaseError {
    constructor(){
        super("Verifique se todos os dados foram enviados.", 404)
    }
}