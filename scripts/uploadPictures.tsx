import * as cloudinary from 'cloudinary'
import * as fs from 'fs'
import * as path from 'path'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET 
  });
  
(async () => {
    const picturesFolder = path.join(__dirname, '..', '..', 'pictures')
    const files = await fs.readdirSync(picturesFolder)
    files.forEach(async (name) => {
        if (name.indexOf('profile_cropped') !== 0) {
            return
        }
        console.log(await cloudinary.uploader.upload(path.join(picturesFolder, name)))
    })
})()