import { Request, Response } from "express"
import { DocenteData } from "../data/DocenteData"
import { EmailJaCadastrado } from "../error/EmailJaCadastrado"
import { MissingFields } from "../error/MissingFields"
import moment from "moment"
import { Docente } from "../Informations"
import { UsuarioNaoCadastrado } from "../error/UsuarioNaoCadastrado"

class DocenteEndpoint {

    async criarDocente(req: Request, res: Response) {
        try {
            const { nome, email, dataNasc, turmaId } = req.body

            if (!nome || !email || !dataNasc || !turmaId) {
                throw new MissingFields()
            }

            const docenteData = new DocenteData()

            const emailExiste = await docenteData.selecionarDocentePorEmail(email)

            if (emailExiste) {
                throw new EmailJaCadastrado()
            }

            // const idTurmaExiste = await turmaData.buscarTurmaPeloId(idTurma)

            // if (!idTurmaExiste.length) {
            //     throw new turmaInvalida()
            // }

            const dataConvertida = moment(dataNasc, "DD/MM/YYYY").format("YYYY-MM-DD")

            const docente = new Docente(
                Date.now().toString(),
                nome, 
                email, 
                dataConvertida, 
                turmaId
            )

            const response = await docenteData.inserirDocente(docente)

            res.status(201).send({ message: response })

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message || error.sqlMessage })
        }
    }

    async buscarTodosDocentes(req: Request, res: Response) {
        try {

            const docenteData = new DocenteData()

            const todosDocentes = await docenteData.selecionarTodosDocentes()

            res.status(200).send(todosDocentes)
        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message || error.sqlMessage })
        }
    }

    async mudarTurmaDocente(req: Request, res: Response) {
        try {
            const id = req.params.id
            const { turmaId } = req.body

            const docenteData = new DocenteData()

            const docenteExiste = await docenteData.selecionarDocentePorId(id)

            if (!docenteExiste) {
                throw new UsuarioNaoCadastrado()
            }

            // const turmadata = new TurmaData()

            // const idTurmaExiste = await turmadata.buscarTurmaPeloId(turmaId)

            // if (!idTurmaExiste.length) {
            //     throw new turmaInvalida()
            // }

            const response = await docenteData.atualizarClasseDoDocente(id, turmaId)

            res.status(200).send({ message: response })

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message || error.sqlMessage })
        }
    }
}
export default DocenteEndpoint