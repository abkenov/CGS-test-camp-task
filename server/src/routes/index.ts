import { Application } from "express";
import todosRouter from "./api/todos.route";
import usersRouter from "./api/user.route";

class AppRouter {
    constructor(private app: Application) {}
    init() {
        this.app.get("/", (_req, res) => {
            res.send("API Running");
        });
        this.app.use("/api/todos", todosRouter);
        this.app.use("/api/", usersRouter)
    }
}

export default AppRouter;