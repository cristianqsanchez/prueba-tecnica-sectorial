import express from 'express'
import cors from 'cors'
import categoriesRouter from './routes/category'
import './config/db'

const app = express()

const port = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())

app.use('/api', categoriesRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
