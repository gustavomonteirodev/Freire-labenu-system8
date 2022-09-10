import { AddressInfo } from "net";
import { app } from "./app";
import EstudanteEndpoint from "./endpoints/EstudanteEndpoint";
import DocenteEndpoint from "./endpoints/DocenteEndpoint";
import TurmaController from "./endpoints/Turma";
// import  createUser  from "./endpoints/createUser";
// import getAllUsers from "./endpoints/getUsers";

const estudante = new EstudanteEndpoint()
const docente = new DocenteEndpoint()
const turma = new TurmaController()


app.post("/criar-turma",turma.criar)
app.get("/buscar-turmas-ativas",turma.ativa)
app.post("/mudar-modulo/:id",turma.modulo)

app.get("/estudante/:nome", estudante.buscarEstudantePorName)
app.post("/estudante", estudante.criarEstudante)
app.post("/estudante/mudar-turma/:id", estudante.mudarTurmaEstudante)

app.get("/docente", docente.buscarTodosDocentes)
app.post("/docente", docente.criarDocente)
app.post("/docente/mudar-turma/:id", docente.mudarTurmaDocente)

// app.get("/users", getAllUsers)
