// import resizeImage from '../../utilities/resizer';
// import express from 'express';
import sharp from 'sharp';
import * as path from 'path';

describe('sharp', () => {
  it('should return image metadata', async () => {
  // Set the path for the image file
  const imagePath = path.resolve(__dirname, '../../../images/full/fjord.jpg');
  
  // Read the image file
  const image = sharp(imagePath);
  
  // Get image metadata
  const metadata = await image.metadata();
  
  // Verify the metadata
  expect(metadata).toBeDefined();
  expect(metadata.format).toBe('jpeg');
  });
  
  it('should return a resized image', async () => {
  // Set the path for the image file
  const imagePath = path.resolve(__dirname, '../../../images/full/fjord.jpg');
  
  // Read the image file
  const image = sharp(imagePath);
  
  // Resize the image
  const resizedImage = image.resize(200, 200);
  
  // Verify the resized image
  expect(resizedImage).toBeDefined();
  });
  });
