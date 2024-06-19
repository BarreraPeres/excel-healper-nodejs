import fastify from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import fastifyMultipart from '@fastify/multipart';

import { createUsers } from "./http/routes/create-users";
import { exportUsers } from "./http/routes/export-users";
import { getUsers } from "./http/routes/get-users";
import { deleteUser } from "./http/routes/delete-user";
import { errorHandler } from "./error-handler";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export const app = fastify()
app.register(fastifyMultipart);
app.register(fastifySwagger, {
    swagger: {
        consumes: ["application/json"],
        produces: ["application/json"],

        info: {
            title: "API-HELPER-EXCEL",
            version: "1.0.0",
            description: "API para manipular dados do Excel, auxilia na criação, validação, armazenamento e exportação.",
        }
    },
    transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createUsers, { prefix: "/api" })
app.register(getUsers, { prefix: "/api" })
app.register(deleteUser, { prefix: "/api" })
app.register(exportUsers)

app.setErrorHandler(errorHandler)