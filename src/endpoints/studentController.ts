import { Request, Response } from "express"
import moment from "moment"
import StudentData from "../data/StudentData"
import { EmailJaCadastrado } from "../error/EmailJaCadastrado"
import { EstudanteNaoCadastrado } from "../error/EstudanteNaoCadastrado"
import { MissingFields } from "../error/MissingFields"
import { UsuarioNaoCadastrado } from "../error/UsuarioNaoCadastrado"
import { Estudante } from "../Informations"

class StudentController {

    async CreateStudent(req: Request, res: Response) {
        try {
            
            const { nome, email, dataNasc, turmaId, hobbies } = req.body

            if (!nome || !email || !dataNasc || !turmaId || !hobbies) {
                throw new MissingFields()
            }

            const studentData: StudentData = new StudentData()
            // instanciar classe turma aqui

            const emailExiste = await studentData.selectStudentByEmail(email)

            if(emailExiste) {
                throw new EmailJaCadastrado()
            }

            // const idTurmaExiste = await turmadata.buscarTurmaPeloId(turmaId)

            // if (!idTurmaExiste.length) {
            //     throw new turmaInvalida()
            // }

            const dataConvertida = moment(dataNasc, "DD/MM/YYY").format("YYYY-MM-DD")

            const student: Estudante = new Estudante(
                Date.now().toString(),
                nome,
                email,
                dataConvertida, 
                turmaId
            )
            
            const response = await studentData.insertStudent(student)
            
            res.status(201).send({ message: response })

        } catch (error:any) {
            res.status(error.statusCode || 500).send({ message: error.sqlMessage || error.message })
        }
    }

    async getStudentByName(req: Request, res: Response) {
        try {
            const { nome } = req.params

            const studentData: StudentData = new StudentData()

            const buscarEstudante = await studentData.selectStudentByName(nome)

            if(!buscarEstudante){
                throw new EstudanteNaoCadastrado()
            }

            res.status(200).send(buscarEstudante)
        } catch (error:any) {
            res.status(error.statusCode || 500).send({ message: error.sqlMessage || error.message})
        }
    }

    async ChangeClass(req: Request, res: Response) {
        try {
            const id = req.params.id
            const { turmaId } = req.body

            const studentData = new StudentData()

            const estudanteExiste = await studentData.selectStudentById(id)

            if(!estudanteExiste){
                throw new UsuarioNaoCadastrado()
            }

            // const turmadata = new TurmaData()

            // const idTurmaExiste = await turmadata.buscarTurmaPeloId(turmaId)

            // if (!idTurmaExiste.length) {
            //     throw new turmaInvalida()
            // }

            const response = await studentData.updateStudentClass(id,turmaId)

            res.status(200).send({message:response})
        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message || error.sqlMessage })
        }
    }
}

export default StudentController