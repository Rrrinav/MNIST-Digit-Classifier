// import { MnistData } from "./data.js";

// async function run() {
//   const data = new MnistData(); // Instantiate MnistData class
//   await data.load();

//   const model = getModel();
//   tfvis.show.modelSummary({ name: "Model Architecture", tab: "Model" }, model);

//   await train(model, data); // Pass data to the train function
//   await showAccuracy(model, data);
//   await showConfusion(model, data);

//   // Save the trained model
//   await model.save('downloads://digit-predictor'); // Change the path as needed
// }

// document.addEventListener("DOMContentLoaded", run);

// function getModel() {
//   const hiddenLayerNeurons = 30; // Increase number of neurons
//   const learningRate = 0.001; // Adjust learning rate
//   const IMAGE_WIDTH = 28;
//   const IMAGE_HEIGHT = 28;
//   const IMAGE_CHANNELS = 1;

//   const model = tf.sequential();

//   model.add(
//     tf.layers.flatten({
//       inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
//     })
//   );

//   model.add(
//     tf.layers.dense({
//       units: hiddenLayerNeurons,
//       activation: "relu",
//       kernelInitializer: "glorotNormal",
//     })
//   );

//   model.add(
//     tf.layers.dense({
//       units: hiddenLayerNeurons / 2,
//       activation: "relu",
//       kernelInitializer: "glorotNormal",
//     })
//   );

//   const NUM_OUTPUT_CLASSES = 10;
//   model.add(
//     tf.layers.dense({
//       units: NUM_OUTPUT_CLASSES,
//       kernelInitializer: "glorotNormal",
//       activation: "softmax",
//     })
//   );

//   const optimizer = tf.train.adam(learningRate); // Change optimizer to Adam
//   model.compile({
//     optimizer: optimizer,
//     loss: "sparseCategoricalCrossentropy",
//     metrics: ["accuracy"],
//   });

//   return model;
// }

// async function train(model, data) {
//   const metrics = ["loss", "val_loss", "acc", "val_acc"];
//   const container = {
//     name: "Model Training",
//     tab: "Model",
//     styles: { height: "1000px" },
//   };
//   const fitCallbacks = tfvis.show.fitCallbacks(container, metrics);

//   const BATCH_SIZE = 70;
//   const TRAIN_DATA_SIZE = 55000; // Increase training dataset size
//   const TEST_DATA_SIZE = 6000; // Increase testing dataset size

//   const [trainXs, trainYs] = tf.tidy(() => {
//     const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
//     return [d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]), d.labels.argMax(-1)];
//   });

//   const [testXs, testYs] = tf.tidy(() => {
//     const d = data.nextTestBatch(TEST_DATA_SIZE);
//     return [d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]), d.labels.argMax(-1)];
//   });

//   return model.fit(trainXs, trainYs, {
//     batchSize: BATCH_SIZE,
//     validationData: [testXs, testYs],
//     epochs: 13,
//     shuffle: true,
//     callbacks: fitCallbacks,
//   });
// }

// async function showAccuracy(model, data) {
//   const [preds, labels] = doPrediction(model, data);
//   const classAccuracy = await tfvis.metrics.perClassAccuracy(labels, preds);
//   const container = { name: "Accuracy", tab: "Evaluation" };
//   tfvis.show.perClassAccuracy(container, classAccuracy, classNames);

//   labels.dispose();
// }

// async function showConfusion(model, data) {
//   const [preds, labels] = doPrediction(model, data);
//   const confusionMatrix = await tfvis.metrics.confusionMatrix(labels, preds);
//   const container = { name: "Confusion Matrix", tab: "Evaluation" };
//   tfvis.render.confusionMatrix(container, {
//     values: confusionMatrix,
//     tickLabels: classNames,
//   });

//   labels.dispose();
// }

// function doPrediction(model, data, testDataSize = 1000) {
//   const IMAGE_WIDTH = 28;
//   const IMAGE_HEIGHT = 28;
//   const testData = data.nextTestBatch(testDataSize);
//   const testxs = testData.xs.reshape([
//     testDataSize,
//     IMAGE_WIDTH,
//     IMAGE_HEIGHT,
//     1,
//   ]);
//   const labels = testData.labels.argMax(-1);
//   const preds = model.predict(testxs).argMax(-1);

//   testxs.dispose();
//   return [preds, labels];
// }

// const classNames = [
//   "Zero",
//   "One",
//   "Two",
//   "Three",
//   "Four",
//   "Five",
//   "Six",
//   "Seven",
//   "Eight",
//   "Nine",
// ];
