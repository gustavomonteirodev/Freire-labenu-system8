import { AddressInfo } from "net";
import app from "./app";
import EstudanteEndpoint from "./endpoints/EstudanteEndpoint";
import DocenteEndpoint from "./endpoints/DocenteEndpoint";
// import  createUser  from "./endpoints/createUser";
// import getAllUsers from "./endpoints/getUsers";

const estudante = new EstudanteEndpoint()
const docente = new DocenteEndpoint()

app.get("/estudante/:nome", estudante.buscarEstudantePorName)
app.post("/estudante", estudante.criarEstudante)
app.post("/estudante/mudar-turma/:id", estudante.mudarTurmaEstudante)

app.get("/docente", docente.buscarTodosDocentes)
app.post("/docente", docente.criarDocente)
app.post("/docente/mudar-turma/:id", docente.mudarTurmaDocente)

// app.get("/users", getAllUsers)
const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});