import express from 'express';
import * as path from 'path';
import fs from 'fs';

const uploaded = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log(req.params.width, req.params.height);
  const thumbImageFile =
    path.join(__dirname, req.params.filename) +
    `_${req.params.width}_${req.params.height}.jpg`;
  try {
    console.log('checking path error');
    await fs.promises.readFile(thumbImageFile, 'utf8');
    res.status(200).sendFile(thumbImageFile);
  } catch (error) {
    console.log('checking catch error');
    next();
  }
};

export default uploaded;
