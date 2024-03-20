## Handwritten Digit Classifier with TensorFlow.js

This project implements a Convolutional Neural Network (CNN) for classifying handwritten digits using TensorFlow.js. The web app allows users to interact with the model and classify handwritten digits in real-time.

### Project Description

The CNN architecture consists of:

* Two convolutional layers for feature extraction
* Max-pooling layers for downsampling
* ReLU activation for introducing non-linearity
* Variance scaling for normalization
* A flattened layer to prepare the data for the final layer
* A dense layer with 10 neurons and softmax activation for predicting class probabilities (0-9)

The model is trained using the Adam optimizer and categorical cross-entropy loss function.

### Technologies Used

* Backend: TensorFlow.js
* Frontend: HTML, CSS, Bootstrap

### Live Demo

You can interact with the web app and classify handwritten digits here: [https://rrrinav.github.io/MNIST-Digit-Classifier/](https://rrrinav.github.io/MNIST-Digit-Classifier/)
