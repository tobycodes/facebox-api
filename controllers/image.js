const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '4ba97e741fc34f458244d508d985a83b',
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