const fs = require("fs")

//Resize image to 200 x 200
module.exports.resizeImage = (imagePath) => {
    const data = fs.readFileSync(imagePath)
    //sharp(data).resize(200, 200).toFile(imagePath)
}