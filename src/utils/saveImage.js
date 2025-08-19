const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/api.error');

function saveImage(image) {
    const newImage = uuid.v4() + path.extname(image.name);
    const imagePath = `${process.env.API_URL}/static/${newImage}`;

    image.mv(`${path.join(process.env.STORAGE_IMAGE_FOLDER, newImage)}`, err => {
        if (err) {
            throw ApiError.badRequest('Image Error');
        }
    });

    return imagePath;
}

module.exports = saveImage;