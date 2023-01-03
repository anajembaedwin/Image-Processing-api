import request from "supertest";
import routes from "../../../routes";


describe("GET /images/full/:filename/:width/:height", () => {

    it("should return the file name of the resized image", async () => {
      // Set up the request parameters
      const filename = "fjord.jpg";
      const width = 400;
      const height = 300;
  
      // Send the request
      const response = await request(routes).get(`/images/full/${filename}/${width}/${height}`);
  
      // Verify the response
      expect(response.status).toBe(200);
      expect(response.text).toBe(filename);
    });
  });

  
  
