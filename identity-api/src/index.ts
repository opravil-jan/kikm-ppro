import express from 'express'
import authRouter from './routes/v1/auth'
import clientRouter from './routes/v1/client'
import typeRouter from './routes/v1/type'
import contactRouter from './routes/v1/contact'
import { createConnection } from 'typeorm'

createConnection()
  .then(() => {
    console.log(`Connected into database successful created`)
  })
  .catch((err) => console.error('Connected into database failed', err))

const app = express()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*') // TODO: update to match the domain you will make the request from
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/v1', authRouter)
app.use('/v1', clientRouter)
app.use('/v1', typeRouter)
app.use('/v1', contactRouter)

app.listen(process.env.PORT, () => {
  console.log(`Application has ben started on port ${process.env.PORT}`)
})
