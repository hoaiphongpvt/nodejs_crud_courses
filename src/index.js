const express = require('express')
const exphbs = require('express-handlebars')
const morgan = require('morgan')
const path = require('path')
const route = require('./routes')
const methodOverride = require('method-override')
const SortMiddleware = require('./app/middlewares/SortMiddleware')

const app = express()
const db = require('./config/db')
const port = 3000

db.connect()

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded())
app.use(express.json())

app.use(morgan('combined'))

app.use(methodOverride('_method'))

//Custom Middleware
app.use(SortMiddleware)

app.engine(
    'hbs',
    exphbs({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (filed, sort) => {
                const iconTypes = {
                    default: `<svg xmlns="http://www.w3.org/2000/svg" 
                                width="16" height="16" 
                                fill="#000" 
                                class="bi bi-sort-down" 
                                viewBox="0 0 16 16">
                                <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
                            </svg>`,
                    asc: `<svg xmlns="http://www.w3.org/2000/svg" 
                            width="16" height="16" 
                            fill="#000" 
                            class="bi bi-sort-alpha-down" 
                            viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371zm1.57-.785L11 2.687h-.047l-.652 2.157z"/>
                            <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z"/>
                        </svg>`,
                    desc: `<svg xmlns="http://www.w3.org/2000/svg" 
                            width="16" height="16" 
                            fill="#000" 
                            class="bi bi-sort-alpha-down-alt" 
                            viewBox="0 0 16 16">
                            <path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645z"/>
                            <path fill-rule="evenodd" d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371zm1.57-.785L11 9.688h-.047l-.652 2.156z"/>
                            <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z"/>
                        </svg>`,
                }
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                }
                const iconType = iconTypes[sort.type]
                const type = types[sort.type]
                return `<a href='?_sort&column=${filed}&type=${type}'>
                            ${iconType}
                        </a>`
            },
        },
    })
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

route(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
