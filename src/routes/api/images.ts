import express from 'express';
import sharp from 'sharp';
//middleware to check if picture has already been
import uploaded from '../../middlewares/uploaded';
import * as path from 'path';
import fs from 'fs';

// Create the router for the image routes
const images = express.Router();

// Set the absolute path for the full size images
const fullImagePath = path.resolve(__dirname, '../../../images/full');

// Set the absolute path for the thumbnail images
const thumbImagePath = path.resolve(__dirname, '../../../images/thumb');

// Route for resizing an image
images.get(
  '/full/:filename/:width/:height',
  uploaded,
  async (req: express.Request, res: express.Response) => {
    console.log('I am accepting images');
    // Validate the width and height parameters
    const widthValid =
      /^\d+$/.test(req.params.width) && parseInt(req.params.width) > 0;
    const heightValid =
      /^\d+$/.test(req.params.height) && parseInt(req.params.height) > 0;

    if (!widthValid || !heightValid) {
      return res.status(400).send('Invalid width or height parameter');
    }

    // Check for the existence of the file
    const fullImageFile =
      path.join(fullImagePath, req.params.filename) + '.jpg';

    if (!fs.existsSync(fullImageFile)) {
      return res.status(404).send('File not found');
    }

    try {
      // Read the image file
      const fullImageFile =
        path.join(fullImagePath, req.params.filename) + '.jpg';

      const thumbImageFile =
        path.join(thumbImagePath, req.params.filename) +
        `_${req.params.width}_${req.params.height}.jpg`;

      const image = sharp(fullImageFile);

      // get image metadata
      const metadata = await image.metadata();

      // If the metadata is null, it means that the image could not be read
      if (metadata === null) {
        throw new Error('Failed to read image file');
      }

      // Resize the image
      const resizedImage = await image.resize(
        parseInt(req.params.width),
        parseInt(req.params.height)
      );

      // Save the resized image to the thumbnail folder
      // resizedImage.toFile(thumbImageFile);
      // with error handling
      resizedImage
        .toFile(thumbImageFile)
        .then(() => {
          console.log('Resized image saved to thumbImagePath successfully');
          // Send a response with the file name of the resized image
          res.status(200).sendFile(thumbImageFile);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      // If there was an error, send a 500 status code
      res.status(500).send("Error in resizing file");
    }
  }
);

export default images;
