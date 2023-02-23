import process from 'process'

// Keep these private and don't share them with anyone
// The secret OpenAI key should be first added via an environment variable called

const CONFIG = {
    organization: "org-anSGG3NG5MAAJBVZeIdptcy1",
    getSecretKey: function() {
        return process.env.SECRET_OPENAI_KEY
    }
}

export default CONFIG