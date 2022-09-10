import { BaseError } from "./BaseError";

export class ModuloNotPermit extends BaseError{
    constructor(){
        super("O modulo só pode ser entre 1 e 6",401)
    }
}