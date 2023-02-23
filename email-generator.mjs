
export function getTestEmailFromInputsData(data) {
    const { emailTo, formality, emailDescription } = data
    return `Dear ${emailTo}, this is a ${formality} email regarding this: ${emailDescription}. Thank you!`
}

export function getPromptFromInputsData(data) {
    const testLength = 'very short'
    const { emailTo, formality, emailDescription } = data
    const prompt = `Write a ${testLength} ${formality} email to ${emailTo} based on the following email description: ${emailDescription}`
    return prompt
}

export async function getEmailFromPrompt(openai, promptText) {
    const openaiRes = await openai.createCompletion({
        "model": "text-davinci-003",
        "prompt": promptText,
        "max_tokens": 100,                                // Max tokens used per response
        "temperature": 0,                                 // Like --stylize of midjourney; 0 to 1 (0.9 is very wild, 0 is no risk)
    })
    return openaiRes.data.choices[0].text
}