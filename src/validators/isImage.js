const path = require('path');

function isImage(image) {
    console.log(image);
    switch (path.extname(image.name)) {
        case '.webp': return true;
        case '.jpeg': return true;
        case '.jpg': return true;
        case '.gif': return true;
        case '.png': return true;
        default: return false;
    }
}

module.exports = isImage;