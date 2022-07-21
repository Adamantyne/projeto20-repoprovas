import supertest from "supertest";
import app from "../src/app.js";

describe("arquivo testado", () => {
  it("return not found", async () => {
    const response = await supertest(app).get("/not_found");
    expect(response.statusCode).toEqual(404);
  });
});