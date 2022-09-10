import { AddressInfo } from "net";
import app from "./app";
import StudentController from "./endpoints/studentController";
import TeacherController from "./endpoints/teacherController";
// import  createUser  from "./endpoints/createUser";
// import getAllUsers from "./endpoints/getUsers";

const estudante = new StudentController()
const docente = new TeacherController()

app.get("/estudante/:nome", estudante.getStudentByName)
app.post("/estudante", estudante.CreateStudent)
app.post("/estudante/mudar-turma/:id", estudante.ChangeClass)

app.get("/docente", docente.GetAllTeachers)
app.post("/docente", docente.CreateTeacher)
app.post("/docente/mudar-turma/:id", docente.ChangeClass)

// app.get("/users", getAllUsers)
const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});