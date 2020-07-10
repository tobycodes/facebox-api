const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_API_KEY,
});

const handleImageUrl = (req, res) => {
    const { url } = req.body;

    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, url)
    .then(resp => res.json(resp))
    .catch(err => res.status(400).json('Could not process image.'));
}

module.exports = {
    handleImageUrl
};