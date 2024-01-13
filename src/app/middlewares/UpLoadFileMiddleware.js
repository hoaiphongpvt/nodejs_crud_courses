const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/imgs/') // Tệp tải lên sẽ được lưu trong thư mục 'src/public/imgs/'
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        const extension = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + extension)
    },
})

// Set up multer middleware
const upload = multer({ storage: storage })

module.exports = function (req, res, next) {
    res.locals._upload = {
        urlthumbnail: '/imgs/default-image.jpg',
    }

    // Xử lý tải lên bằng cách sử dụng hàm middleware tùy chỉnh
    upload.single('thumbnail')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ error: err.message })
        } else if (err) {
            return res.status(500).json({ error: err.message })
        }

        // Kiểm tra nếu có tệp đã tải lên
        if (req.file) {
            const imageUrl = `/imgs/${req.file.filename}`
            res.locals._upload.urlthumbnail = imageUrl
        }

        next()
    })
}
