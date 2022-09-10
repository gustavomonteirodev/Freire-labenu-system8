import { Docente } from "../Informations";
import BaseDataBase from "./BaseDataBase";

export class DocenteData extends BaseDataBase {

    async inserirDocente(docente: Docente) {

        await this.getConnetion().insert({
            id: docente.getId(),
            nome: docente.getNome(),
            email: docente.getEmail(),
            data_nascimento: docente.getDataNasc(),
            turma_id: docente.getTurmaId(),
        }).into("Docente")

        return `O Docente:'${docente.getNome()}' foi cadastrado com sucesso!`
    }

    async selecionarDocentePorEmail(email: string) {
        
        const result = await this.getConnetion()
            .select("*")
            .from("Docente")
            .where({ email })

        return result[0]
    }

    async selecionarTodosDocentes(): Promise<Docente[]> {
        const result = await this.getConnetion()
            .select("*")
            .from("Docente")

        const teacherList = result.map((docente) => {
            return new Docente(docente.nome, docente.email, docente.data_nasc, docente.turma_id, docente.id)
        })

        return teacherList

    }

    async selecionarDocentePorId(id: string):Promise<Docente| undefined> {
        const result = await this.getConnetion()
            .select("*")
            .from("Docente")
            .where({ id })

        if (!result.length) {
            return undefined
        }

        return new Docente(result[0].nome, result[0].email, result[0].data_nasc, result[0].turma_id, result[0].id)
    }

    async atualizarClasseDoDocente(id: string, turmaId: string): Promise<string> {
        await this.getConnetion()
            .update({ turma_id: turmaId })
            .into("Docente")
            .where({ id: id })

        return `Docente com id ${id} transferido para a turma ${turmaId}`
    }

}