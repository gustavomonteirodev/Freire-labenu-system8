import { Request, Response } from "express"
import { TeacherData } from "../data/TeacherData"
import { EmailJaCadastrado } from "../error/EmailJaCadastrado"
import { MissingFields } from "../error/MissingFields"
import moment from "moment"
import { Docente } from "../Informations"
import { UsuarioNaoCadastrado } from "../error/UsuarioNaoCadastrado"

class TeacherController {

    async CreateTeacher(req: Request, res: Response) {
        try {
            const { nome, email, dataNasc, turmaId } = req.body

            if (!nome || !email || !dataNasc || !turmaId) {
                throw new MissingFields()
            }

            const docenteData = new TeacherData()

            const emailExiste = await docenteData.selectTeacherByEmail(email)

            if (emailExiste) {
                throw new EmailJaCadastrado()
            }

            // const idTurmaExiste = await turmaData.buscarTurmaPeloId(idTurma)

            // if (!idTurmaExiste.length) {
            //     throw new turmaInvalida()
            // }

            const dataConvertida = moment(dataNasc, "DD/MM/YYYY").format("YYYY-MM-DD")

            const id = Date.now().toString()

            const docente = new Docente(
                Date.now().toString(),
                nome, 
                email, 
                dataConvertida, 
                turmaId
            )

            const response = await docenteData.createTeacher(docente)

            res.status(201).send({ message: response })

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message || error.sqlMessage })
        }
    }

    async GetAllTeachers(req: Request, res: Response) {
        try {

            const docenteData = new TeacherData()

            const todosDocentes = await docenteData.selectAllTeachers()

            res.status(200).send(todosDocentes)
        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message || error.sqlMessage })
        }
    }

    async ChangeClass(req: Request, res: Response) {
        try {
            const id = req.params.id
            const { turmaId } = req.body

            const docenteData = new TeacherData()

            const docenteExiste = await docenteData.selectTeacherById(id)

            if (!docenteExiste) {
                throw new UsuarioNaoCadastrado()
            }

            // const turmadata = new TurmaData()

            // const idTurmaExiste = await turmadata.buscarTurmaPeloId(turmaId)

            // if (!idTurmaExiste.length) {
            //     throw new turmaInvalida()
            // }

            const response = await docenteData.updateTeacherClass(id, turmaId)

            res.status(200).send({ message: response })

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message || error.sqlMessage })
        }
    }
}
export default TeacherController