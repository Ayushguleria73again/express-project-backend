require("dotenv").config()
const express = require("express")
const port = process.env.PORT || 8000
const app = express()
const mongoose = require("mongoose")
const signupRouter = require('./routes/signup')
const Router = require('./routes/routes')
const cors = require("cors")

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}))

app.use("/api", signupRouter)  // Use the actual router for the signup endpoint
app.use("/routes", Router)

main().catch(err => console.log(err))

async function main() {
    await mongoose.connect(process.env.MONGOURL)
    console.log("connected to mongodb");

}


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
