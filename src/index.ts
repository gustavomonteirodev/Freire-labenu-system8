import { AddressInfo } from "net";
import { app } from "./app";
import StudentController from "./endpoints/studentController";
import TeacherController from "./endpoints/teacherController";
import TurmaController from "./endpoints/Turma";

const estudante = new StudentController()
const docente = new TeacherController()
const turma = new TurmaController()


app.post("/criar-turma",turma.criar)
app.get("/buscar-turmas-ativas",turma.ativa)
app.post("/mudar-modulo/:id",turma.modulo)

app.get("/estudante/:nome", estudante.getStudentByName)
app.post("/estudante", estudante.CreateStudent)
app.post("/estudante/mudar-turma/:id", estudante.ChangeClass)

app.get("/docente", docente.GetAllTeachers)
app.post("/docente", docente.CreateTeacher)
app.post("/docente/mudar-turma/:id", docente.ChangeClass)
