import express from 'express';

//middleware to check if picture has already been
import uploaded from '../../middlewares/uploaded';

import * as path from 'path';
import fs from 'fs';

import resizeImage from '../../utilities/resizer';

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
      await resizeImage(fullImagePath, thumbImagePath, req, res);
    } catch (error) {
      // If there was an error, send a 500 status code
      res.status(500).send('Error in resizing file');
    }
  }
);

export default images;
