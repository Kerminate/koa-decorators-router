import * as Koa from "koa";

declare module "koa" {
    interface Request {
        body: any;  //追加body属性
    }
}