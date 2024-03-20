// Load the trained model asynchronously from the specified file path
async function loadModel() {
    return await tf.loadLayersModel('./model/mnist-digit-classifier.json');
}

// Preprocess the uploaded image before making predictions
function preprocessImage(imageElement) {
    return tf.tidy(() => {
        // Preprocess the image: resize, convert to grayscale, normalize, and adjust dimensions
        const imageTensor = tf.browser.fromPixels(imageElement)
            .resizeNearestNeighbor([28, 28])
            .mean(2)
            .expandDims(2)
            .expandDims()
            .toFloat();

        return imageTensor;
    });
}

// Make prediction on the preprocessed image using the provided model
async function predictImage(model, image) {
    // Predict the class of the image using the model and return the result
    const prediction = await model.predict(image).argMax(1).data();
    return prediction[0];
}

// Event listener for when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Load the pre-trained model
    const model = await loadModel();

    // Get necessary DOM elements
//    const imageUpload = document.getElementById('imageUpload');
    const selectedImage = document.getElementById('selectedImage');
    const predictButton = document.getElementById('predictButton');
    const predictionResult = document.getElementById('predictionResult');

    // Event listener for when an image is uploaded
    // imageUpload.addEventListener('change', (event) => {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();

    //     // Display the selected image on the webpage
    //     reader.onload = function (e) {
    //         selectedImage.src = e.target.result;
    //         selectedImage.style.display = 'block';
    //     };

    //     // Read the uploaded image file as data URL
    //     reader.readAsDataURL(file);
    // });

    // Event listener for when the predict button is clicked
    predictButton.addEventListener('click', async () => {
        let result = await saveCanvas();
        // Preprocess the selected image
        const image = preprocessImage(selectedImage);
        // Predict the class of the preprocessed image
        const prediction = await predictImage(model, image);
        // Display the predicted class on the webpage
        predictionResult.innerHTML = `${prediction}`;
        // Dispose the preprocessed image tensor to free memory
        image.dispose();
    });
});
