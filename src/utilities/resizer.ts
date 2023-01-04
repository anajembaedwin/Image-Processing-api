import express from 'express';
import sharp from 'sharp';
import * as path from 'path';

export default async function resizeImage(
  fullImagePath: string,
  thumbImagePath: string,
  req: express.Request,
  res: express.Response
) {
  // Set the absolute path for the full size images
  fullImagePath = path.resolve(__dirname, '../../images/full');

  // Set the absolute path for the thumbnail images
  thumbImagePath = path.resolve(__dirname, '../../images/thumb');

  // Read the image file
  const fullImageFile = path.join(fullImagePath, req.params.filename) + '.jpg';
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
}
