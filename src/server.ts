import { app } from "./app";
import { env } from "./config";

app.listen({ port: env.PORT || 3333, host: "0.0.0.0" }).then(() => {
    console.log("SERVER RUNNING ✔");
})

