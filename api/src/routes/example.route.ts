import { Get, Post, Res, Params, Body, Router } from "@reflet/express";
import { Response } from "express";

@Router("/hello")
export class HelloRouter {
    @Get()
    async hello(@Res res: Response) {
        res.send(["Hello world"]);
    }
}