import multer from 'multer'

export default async function uploadPostImage(req, res) {
  const upload = multer({
    storage: multer.diskStorage({
      destination: './public/images/uploads',
      filename: (req, file, cb) => cb(null, file.originalname)
    })
  })

  try {
    upload.single('image')(req, res, err => {
      const image = {
        name: req.file.originalname,
        type: req.file.mimetype,
        url: req.file.path
      }      

      res.status(200).json({ data: image })
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload file' })
  }
}

export const config = {
  api: {
    bodyParser: false
  }
}