const express = require('express')
const exphbs = require('express-handlebars')
const morgan = require('morgan')
const path = require('path')
const route = require('./routes')
const methodOverride = require('method-override')

const app = express()
const db = require('./config/db')
const port = 3000

db.connect()

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded())
app.use(express.json())

app.use(morgan('combined'))

app.use(methodOverride('_method'))

app.engine(
    'hbs',
    exphbs({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    })
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

route(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
