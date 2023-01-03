"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
// import upload from '../../middlewares/upload';
const path = __importStar(require("path"));
const fs_1 = __importDefault(require("fs"));
// Create the router for the image routes
const images = express_1.default.Router();
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
const middleWareFunc = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.width, req.params.height);
    const thumbImageFile = path.join(__dirname, req.params.filename) + `_${req.params.width}_${req.params.height}.jpg`;
    try {
        console.log("checking path error");
        yield fs_1.default.promises.readFile(thumbImageFile, "utf8");
        res.status(200).sendFile(thumbImageFile);
    }
    catch (error) {
        console.log("checking catch error");
        next();
    }
});
// Route for resizing an image
images.get("/full/:filename/:width/:height", middleWareFunc, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    if (!fs_1.default.existsSync(fullImageFile)) {
        return res.status(404).send("File not found");
    }
    try {
        // Read the image file
        const fullImageFile = path.join(fullImagePath, req.params.filename) + ".jpg";
        console.log(`checking fullImageFile: ${fullImageFile}`);
        const thumbImageFile = path.join(thumbImagePath, req.params.filename) + `_${req.params.width}_${req.params.height}.jpg`;
        console.log(`checking thumbImageFile: ${thumbImageFile}`);
        const image = (0, sharp_1.default)(fullImageFile);
        console.log(`checking image: ${image}`);
        // get image metadata
        const metadata = yield image.metadata();
        // If the metadata is null, it means that the image could not be read
        if (metadata === null) {
            throw new Error('Failed to read image file');
        }
        // console.log(metadata);
        // Resize the image
        const resizedImage = yield image.resize(parseInt(req.params.width), parseInt(req.params.height));
        // Save the resized image to the thumbnail folder
        // resizedImage.toFile(thumbImageFile);
        // with error handling
        resizedImage.toFile(thumbImageFile)
            .then(() => {
            console.log('Resized image saved to thumbImagePath successfully');
            // Send a response with the file name of the resized image
            res.status(200).sendFile(thumbImageFile);
        })
            .catch((error) => {
            console.error(error);
        });
        // resizedImage.toFile(thumbImagePath + req.params.filename);
    }
    catch (error) {
        // If there was an error, send a 500 status code
        res.status(500).send(error.message);
    }
}));
exports.default = images;
