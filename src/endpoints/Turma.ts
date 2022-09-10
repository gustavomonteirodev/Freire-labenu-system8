import { Request, Response } from "express";
import { TurmaData } from "../data/TurmaData";
import { MissingFields } from "../error/MissingFields";
import { ModuloNotPermit } from "../error/ModuloNotPermit";
import { Turma } from "../Informations";

class TurmaController {

    async criar(req: Request, res: Response) {
        try {
            const { nome } = req.body;

            if (!nome) {
                throw new MissingFields()
            }

            const turma = new Turma(nome)
            const turmaData = new TurmaData()

            const response = await turmaData.criarTurma(turma);

            res.status(201).send({ message: response })

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message || error.sqlMessage })
        }
    }

    async ativa(req: Request, res: Response) {
        try {

            const turmadata = new TurmaData()

            const turmasAtivas = await turmadata.selecionarTurmasAtivas();

            res.status(200).send(turmasAtivas)
        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message || error.sqlMessage })
        }
    }

    async modulo(req: Request, res: Response) {
        try {
            const id = req.params.id
            const { modulo } = req.body

            if (!modulo) {
                throw new MissingFields()
            }

            if (modulo < 0 || modulo > 6) {
                throw new ModuloNotPermit()
            }

            const turmaData = new TurmaData()

            const response = await turmaData.mudarModulo(id, modulo)

            res.status(200).send({ message: response })

        } catch (error: any) {
            res.status(error.statusCode || 500).send({ message: error.message || error.sqlMessage })
        }
    }

}
export default TurmaController;