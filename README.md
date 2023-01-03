# Image-Processing-api
An image API that can be used in two different ways. As a simple placeholder API for rapid prototyping and  as a library to serve properly scaled versions of your images to the front end to reduce page load size.

# How to run the project

```
git clone https://github.com/anajembaedwin/Image-Processing-api.git
```

```
npm install
```

```
npm run test
```

```
npm run start
```

Please check the package.json file to ensure you are using the correct version of nodejs and express.

# Available endpoints
This application has the image resize endpoint that can resize the available images in the image folder. You can add pictures manually in this folder if you want to resize it.

This API can presently only resize jpg images and updates will be made to include other extensions.

You can resize images on the browser using this sample endpoint:

>> http://127.0.0.1:3000/api/images/full/fjord/400/300

Note: Only include the name of the image without the extention. Replace fjord/400/300 with the image-name/image-width/image-height of any other image in the folder to respectively.

# Other Functionalities
This first MVP is meant to present a working model for further development. I have added a middleware to ensure that resized images are saved and do not duplicate in the thumb folder. 


