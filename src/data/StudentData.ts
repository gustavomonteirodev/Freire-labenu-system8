import { Estudante } from "../Informations"
import BaseDataBase from "./BaseDataBase"

class StudentData extends BaseDataBase {

    async insertStudent(student: Estudante): Promise<void> {

        await this.getConnetion()
            .insert({
                id: student.getId(),
                nome: student.getNome(),
                email: student.getEmail(),
                data_nasc: student.getDataNasc(),
                turma_id: student.getTurmaId(),
                hobbies: student.getHobbies()
            })
            .into("Estudante")
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
}

export default StudentData