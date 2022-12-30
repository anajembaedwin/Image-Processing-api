import multer from 'multer';

const storage = multer.diskStorage({
    destination: '../../images/full',
});

const upload = multer({ storage });

export default upload;

  