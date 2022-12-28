import request from "supertest";
import express from "express";
import images from "../../../routes";

const app = express();
app.use(images);

describe("Test the images route", () => {
  it("should return a 200 status code and 'images api route' as the response", (done) => {
    request(app).get("/images").then((response) => {
      expect(response.status).toEqual(200);
      expect(response.text).toEqual("images api route");
      done();
    });
  });
});