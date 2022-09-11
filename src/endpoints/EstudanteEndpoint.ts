import { Request, Response } from "express"
import moment from "moment"
import EstudanteData from "../data/EstudanteData"
import { TurmaData } from "../data/TurmaData"
import { EmailJaCadastrado } from "../error/EmailJaCadastrado"
import { EstudanteNaoCadastrado } from "../error/EstudanteNaoCadastrado"
import { MissingFields } from "../error/MissingFields"
import { TurmaInvalida } from "../error/TurmaInvalida"
import { UsuarioNaoCadastrado } from "../error/UsuarioNaoCadastrado"
import { Estudante } from "../Informations"

class EstudanteEndpoint {

    async criarEstudante(req: Request, res: Response) {
        try {
            
            const { nome, email, dataNasc, turmaId } = req.body

            if (!nome || !email || !dataNasc || !turmaId) {
                throw new MissingFields()
            }

            const estudanteData: EstudanteData = new EstudanteData()
            const turmaData: TurmaData = new TurmaData()

            const emailExiste = await estudanteData.selecionarEstudantePorEmail(email)

            if(emailExiste) {
                throw new EmailJaCadastrado()
            }

            const idTurmaExiste = await turmaData.buscarTurmaPeloId(turmaId)

            if (!idTurmaExiste.length) {
                throw new TurmaInvalida()
            }

            const dataConvertida = new Date(moment(dataNasc, "DD/MM/YYYY").format("YYYY-MM-DD"))

            const estudante: Estudante = new Estudante(
                Date.now().toString(),
                nome,
                email,
                dataConvertida, 
                turmaId
            )
            
            const response = await estudanteData.inserirEstudante(estudante)
            
            res.status(201).send({ message: response })

        } catch (error:any) {
            res.status(error.statusCode || 500).send({ message: error.sqlMessage || error.message })
        }
    }

    async buscarEstudantePorNome(req: Request, res: Response) {
        try {
            const { nome } = req.params

            const estudanteData: EstudanteData = new EstudanteData()

            const buscarEstudante = await estudanteData.selecionarEstudantePorNome(nome)

            if(!buscarEstudante){
                throw new EstudanteNaoCadastrado()
            }

            res.status(200).send(buscarEstudante)
        } catch (error:any) {
            res.status(error.statusCode || 500).send({ message: error.sqlMessage || error.message})
        }
    }

    async mudarTurmaEstudante(req: Request, res: Response) {
        try {
            const id = req.params.id
            const { turmaId } = req.body

            const estudanteData = new EstudanteData()

            const estudanteExiste = await estudanteData.selecionarEstudantePorId(id)

            if(!estudanteExiste){
                throw new UsuarioNaoCadastrado()
            }

            const turmadata = new TurmaData()

            const idTurmaExiste = await turmadata.buscarTurmaPeloId(turmaId)

            if (!idTurmaExiste.length) {
                throw new TurmaInvalida()
            }

            const response = await estudanteData.atualizarClasseDoEstudante(id,turmaId)

            res.status(200).send({message:response})
        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message || error.sqlMessage })
        }
    }
}

export default EstudanteEndpoint