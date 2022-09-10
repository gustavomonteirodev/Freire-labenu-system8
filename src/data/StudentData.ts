import { Estudante } from "../Informations"
import BaseDataBase from "./BaseDataBase"

class StudentData extends BaseDataBase {

    async insertStudent(student: Estudante): Promise<string> {

        await this.getConnetion()
            .insert({
                id: student.getId(),
                nome: student.getNome(),
                email: student.getEmail(),
                data_nasc: student.getDataNasc(),
                turma_id: student.getTurmaId()
            })
            .into("Estudante")

            return `O estudante ${student.getNome} foi criado com sucesso!`
    }
    
    async selectStudentByEmail(email: string) {

        const result = await this.getConnetion()
            .select("*")
            .from("estudante")
            .where({ email })

        return result[0]
    }

    async selectStudentByName(nome: string): Promise<Estudante | undefined> {
        const result = await this.getConnetion()
            .select("*")
            .from("Estudante")
            .where({ nome })

            if(!result.length) {
                return undefined
            }
        return new Estudante(Date.now().toString(), result[0].nome, result[0].email, result[0].data_nasc, result[0].turma_id)
    }

    async selectStudentById(id: string): Promise<Estudante | undefined> {
        const result = await this.getConnetion()
            .select("*")
            .from("Estudante")
            .where({ id })

        if (!result.length) {
            return undefined
        }

        return new Estudante(result[0].nome, result[0].email, result[0].data_nascimento, result[0].turma_id, result[0].id)
    }

    async updateStudentClass(id: string, turmaId: string): Promise<string> {
        await this.getConnetion()
            .update({ turma_id: turmaId })
            .into("Estudante")
            .where({ id: id })

        return `O estudante com id ${id} foi transferido para a turma ${turmaId}`
    }
}

export default StudentData