import request from "supertest";
import express from "express";
import routes from "../../routes";

const app = express();
app.use(routes);

describe("Test the main route", () => {
  it("should return a 200 status code and 'main api route' as the response", (done) => {
    request(app).get("/").then((response) => {
      expect(response.status).toEqual(200);
      expect(response.text).toEqual("main api route");
      done();
    });
  });
});
