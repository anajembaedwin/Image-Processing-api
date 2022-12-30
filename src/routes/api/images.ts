import express from "express";
import sharp from "sharp";
// import upload from '../../middlewares/upload';
import * as path from 'path';


// Create the router for the image routes
const images = express.Router();
// console.log(`checking images: ${images}`);

// Set the absolute path for the full size images
const fullImagePath = path.resolve(__dirname, 'public/images/full');
// console.log(`checking fullImagePath: ${fullImagePath}`);



// Set the absolute path for the thumbnail images
const thumbImagePath = path.resolve(__dirname, 'public/images/thumb');
// console.log(`checking fullImagePath: ${thumbImagePath}`);

// Route for uploading an image
// images.post("/", upload.single("image"), async (req, res) => {
//   // Check if an image was provided
//   if (!req.file) {
//     return res.status(400).send("No image provided");
//   }

//   // Send a response with the file name of the uploaded image
//   res.send(req.file.filename);
// });

// Route for resizing an image
images.get("/images/:filename/:width/:height", async (req, res) => {
   // Validate the width and height parameters
    const widthValid = /^\d+$/.test(req.params.width) && parseInt(req.params.width) > 0;
    const heightValid = /^\d+$/.test(req.params.height) && parseInt(req.params.height) > 0;
    
   if (!widthValid || !heightValid) {
     return res.status(400).send("Invalid width or height parameter");
  }

  try {
    // Read the image file
    const fullImageFile = path.join(fullImagePath, req.params.filename);
    console.log(`checking fullImageFile: ${fullImageFile}`);
    const thumbImageFile = path.join(thumbImagePath, req.params.filename);
    console.log(`checking thumbImageFile: ${thumbImageFile}`);
    const image = sharp(fullImageFile);
    console.log(`checking image: ${image}`);
    // const image = sharp(fullImagePath + req.params.filename);

    // Resize the image
    const resizedImage = await image.resize(
      parseInt(req.params.width),
      parseInt(req.params.height)
    );

    // Save the resized image to the thumbnail folder
    resizedImage.toFile(thumbImageFile);
    // resizedImage.toFile(thumbImagePath + req.params.filename);
    

    // Send a response with the file name of the resized image
    res.send(req.params.filename);
  } catch (error: any) {
    // If there was an error, send a 500 status code
    res.status(500).send(error.message);
  }
});

export default images;
