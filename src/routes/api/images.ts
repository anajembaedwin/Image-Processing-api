import express from "express";
import sharp from "sharp";
// import upload from '../../middlewares/upload';
import * as path from 'path';
import fs from 'fs';


// Create the router for the image routes
const images = express.Router();
// console.log(`checking images: ${images}`);

// images.get("/", async (req:express.Request, res:express.Response) => {
//   res.status(200).send("we are in w");
// })

// Set the absolute path for the full size images
const fullImagePath = path.resolve(__dirname, '../../../images/full');
// console.log(`checking fullImagePath: ${fullImagePath}`);



// Set the absolute path for the thumbnail images
const thumbImagePath = path.resolve(__dirname, '../../../images/thumb');
// console.log(`checking fullImagePath: ${thumbImagePath}`);

// // Route for uploading an image
// images.post("/upload", upload.single("image"), async (req, res) => {
//   // Check if an image was provided
//   if (!req.file) {
//     return res.status(400).send("No image provided");
//   }

//   // Send a response with the file name of the uploaded image
//   res.send(req.file.filename);
// });

const middleWareFunc = async (req:express.Request, res:express.Response, next: express.NextFunction) => {
  console.log(req.params.width, req.params.height);
  const thumbImageFile = path.join(__dirname, req.params.filename) +`_${req.params.width}_${req.params.height}.jpg`;
  try{
    console.log("checking path error");
    await fs.promises.readFile(thumbImageFile, "utf8");
    res.status(200).sendFile(thumbImageFile);
  }catch(error) {
    console.log("checking catch error");
    next()
  }

}
// Route for resizing an image
images.get("/full/:filename/:width/:height", middleWareFunc, async (req: express.Request, res: express.Response) => {

    console.log("I am accepting images");
   // Validate the width and height parameters
    const widthValid = /^\d+$/.test(req.params.width) && parseInt(req.params.width) > 0;
    const heightValid = /^\d+$/.test(req.params.height) && parseInt(req.params.height) > 0;
    
   if (!widthValid || !heightValid) {
     return res.status(400).send("Invalid width or height parameter");
  }

    // Check for the existence of the file
    const fullImageFile = path.join(fullImagePath, req.params.filename) + ".jpg";
    console.log(fullImageFile);
    if (!fs.existsSync(fullImageFile)) {
      return res.status(404).send("File not found");
    }

  try {
    // Read the image file
    const fullImageFile = path.join(fullImagePath, req.params.filename) + ".jpg";
    console.log(`checking fullImageFile: ${fullImageFile}`);
    const thumbImageFile = path.join(thumbImagePath, req.params.filename) +`_${req.params.width}_${req.params.height}.jpg`;
    console.log(`checking thumbImageFile: ${thumbImageFile}`);
    const image = sharp(fullImageFile);
    console.log(`checking image: ${image}`);

    // get image metadata
    const metadata = await image.metadata();

      // If the metadata is null, it means that the image could not be read
    if (metadata === null) {
      throw new Error('Failed to read image file');
    }
    // console.log(metadata);

    // Resize the image
    const resizedImage = await image.resize(
      parseInt(req.params.width),
      parseInt(req.params.height)
    );

    // Save the resized image to the thumbnail folder
    // resizedImage.toFile(thumbImageFile);
    // with error handling
    resizedImage.toFile(thumbImageFile)
    .then(() => {
      console.log('Resized image saved to thumbImagePath successfully');
          // Send a response with the file name of the resized image
      res.status(200).sendFile(thumbImageFile)
    })
    .catch((error) => {
      console.error(error);
    });
    // resizedImage.toFile(thumbImagePath + req.params.filename);
    

  } catch (error: any) {
    // If there was an error, send a 500 status code
    res.status(500).send(error.message);
  }
});

export default images;
