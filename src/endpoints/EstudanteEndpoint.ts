import { Request, Response } from "express"
import moment from "moment"
import EstudanteData from "../data/EstudanteData"
import { EmailJaCadastrado } from "../error/EmailJaCadastrado"
import { EstudanteNaoCadastrado } from "../error/EstudanteNaoCadastrado"
import { MissingFields } from "../error/MissingFields"
import { UsuarioNaoCadastrado } from "../error/UsuarioNaoCadastrado"
import { Estudante } from "../Informations"

class EstudanteEndpoint {

    async criarEstudante(req: Request, res: Response) {
        try {
            
            const { nome, email, dataNasc, turmaId, hobbies } = req.body

            if (!nome || !email || !dataNasc || !turmaId || !hobbies) {
                throw new MissingFields()
            }

            const estudanteData: EstudanteData = new EstudanteData()
            // instanciar classe turma aqui

            const emailExiste = await estudanteData.selecionarEstudantePorEmail(email)

            if(emailExiste) {
                throw new EmailJaCadastrado()
            }

            // const idTurmaExiste = await turmadata.buscarTurmaPeloId(turmaId)

            // if (!idTurmaExiste.length) {
            //     throw new turmaInvalida()
            // }

            const dataConvertida = moment(dataNasc, "DD/MM/YYY").format("YYYY-MM-DD")

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

    async buscarEstudantePorName(req: Request, res: Response) {
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

            // const turmadata = new TurmaData()

            // const idTurmaExiste = await turmadata.buscarTurmaPeloId(turmaId)

            // if (!idTurmaExiste.length) {
            //     throw new turmaInvalida()
            // }

            const response = await estudanteData.atualizarClasseDoEstudante(id,turmaId)

            res.status(200).send({message:response})
        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message || error.sqlMessage })
        }
    }
}

export default EstudanteEndpoint