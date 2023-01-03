import request from "supertest";
import app from "../../..";
// import routes from "../../../routes";


describe("GET /api/images/full/:filename/:width/:height", () => {

    it("should return the file name of the resized image", async () => {
      // Set up the request parameters
      const filename = "fjord";
      const width = 400;
      const height = 300;
      
      console.log("we are sending the request");
      // Send the request
      const response = await request(app).get(`/api/images/full/${filename}/${width}/${height}`);
      console.log(`Here is the response ${response}`);
      // Verify the response
      expect(response.status).toBe(200);
    });
  });

  
  
