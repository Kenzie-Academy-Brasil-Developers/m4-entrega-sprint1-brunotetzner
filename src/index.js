import express from "express";
import userRouter from "./routes/user.routes";

const app = express();
app.use(express.json());

app.use("/users", userRouter);

const port = 3333;
app.listen(port, () => {
  console.log(`aplicação rodando na porta ${port}`);
});
