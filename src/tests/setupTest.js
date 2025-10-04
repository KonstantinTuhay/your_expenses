import supertest from "supertest";
import { app } from "../app.mjs";

export const request = supertest(app);
