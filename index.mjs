
import fs from 'fs'
import express from 'express'
import cors from 'cors'
import process from 'process'

import { Configuration, OpenAIApi } from "openai"

import CONFIG from './CONFIG.mjs'
import { getEmailFromPrompt, getPromptFromInputsData, getTestEmailFromInputsData } from './email-generator.mjs'


const configuration = new Configuration({
    organization: CONFIG.organization,
    apiKey: CONFIG.getSecretKey(),
})
console.log({apiKey: CONFIG.getSecretKey()})
const openai = new OpenAIApi(configuration)




const app = express()
app.use(express.json())
app.use(cors())	            // Makes it cross-origin

const port = process.env.PORT || 3000

app.get('/test', (req, res) => {
    console.log('Got a request to test.')
    res.json({ message: 'Yes, this works' })
})

app.post('/generate', async (req, res) => {
    const inputData = req.body
    console.log(inputData)
    if (CONFIG.getIsTestMode()) {
        setTimeout(() => {
            res.json({ message: getTestEmailFromInputsData(inputData) })
        }, 2250)
        return
    }
    const openAIPrompt = getPromptFromInputsData(inputData)
    console.log(openAIPrompt)
    const email = await getEmailFromPrompt(openai, openAIPrompt)
    console.log('Email generated: ' + email)
    res.json({ message: email })
})

app.listen(port, ()=>{
	console.log(`Listening on port ${port}...`)
})



