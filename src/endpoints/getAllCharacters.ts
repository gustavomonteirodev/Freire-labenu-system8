// import { Request, Response } from "express"
// import { connection } from "../connection"
// import { character } from "../types"

// export default async function getAllCharacters (
//     req: Request,
//     res: Response
//     ): Promise<void>{
//         // const result: character[] = await connection.raw("SELECT * FROM characters")
//         // res.send(result[0])
//         try {
//         const name = req.query

//         const characters: character[] = await connection("characters")
//         res.send(characters)

//         } catch (error) {
//             res.status(500).send("Unexpected server error")
//         }
//      }