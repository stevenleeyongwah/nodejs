import fs from 'fs';
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";

const app: Application = express();
const port: number = 3000

app.get('/', (req: Request, res: Response) => {
    res.send('hey')
    res.hey()
})

app.listen(port, () => {
    console.log("connected")
})