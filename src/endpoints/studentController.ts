import { Request, Response } from "express"
import StudentData from "../data/StudentData"
import { Estudante } from "../Informations"

class StudentController {

    async CreateStudent(req: Request, res: Response) {
        try {
            
            const { nome, email, dataNasc, turmaId, hobbies } = req.body

            if (!nome || !email || !dataNasc || !turmaId || !hobbies) {
                throw new Error('Verifique se todos os dados foram enviados.')
            }

            const student: Estudante = new Estudante(
                Date.now().toString(),
                nome,
                email,
                dataNasc, 
                turmaId,
                hobbies
            )

            const studentData: StudentData = new StudentData()
            studentData.insertStudent(student)

            res.status(201).send({ message: "Estudante adicionado com sucesso!" })

        } catch (error:any) {
            res.status(error.statusCode || 500).send({ message: error.sqlMessage || error.message })
        }
    }

    async getStudentByName(req: Request, res: Response) {
        try {
            const { nome } = req.params

            const studentData: StudentData = new StudentData()

            const buscarEstudante = await studentData.selectStudentByName(nome)

            res.status(200).send(buscarEstudante)
        } catch (error:any) {
            res.status(error.statusCode || 500).send({ message: error.sqlMessage || error.message})
        }
    }
}

export default StudentController