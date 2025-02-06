const tf = require('@tensorflow/tfjs-node');

// Step 1: Generate mock data with menu type
const generateMockData = () => {
  const data = [];
  for (let i = 0; i < 30; i++) {
    const isWeekend = i % 7 === 0 || i % 7 === 6 ? 1 : 0; // 1 for Sat/Sun
    const isExamDay = i >= 25 ? 1 : 0; // Last 5 days are exams
    const attendance = isExamDay ? 0.3 : isWeekend ? 0.4 : 0.7; // 30-70% attendance
    const menuType = Math.floor(Math.random() * 3); // 0 = unpopular, 1 = average, 2 = popular
    const meals = Math.floor(attendance * 1000 * (1 + menuType * 0.2)); // Adjust meals based on menu type
    data.push({
      features: [attendance, isWeekend, isExamDay, menuType],
      label: meals
    });
  }
  return data;
};

const dataset = generateMockData();
console.log(dataset);

// Step 2: Build and train the model
const trainModel = async () => {
  // Convert data to tensors
  const features = dataset.map(d => d.features);
  const labels = dataset.map(d => d.label);

  const featureTensor = tf.tensor2d(features);
  const labelTensor = tf.tensor1d(labels);

  // Define a sequential model
  const model = tf.sequential();
  model.add(tf.layers.dense({
    units: 1,
    inputShape: [4] // 4 features: attendance, is_weekend, is_exam_day, menu_type
  }));

  // Compile the model
  model.compile({
    optimizer: tf.train.sgd(0.1), // Learning rate
    loss: 'meanSquaredError'
  });

  // Train the model
  await model.fit(featureTensor, labelTensor, {
    epochs: 100,
    validationSplit: 0.2,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch}: loss = ${logs.loss}`);
      }
    }
  });

  return model;
};

// Step 3: Test the model
const testModel = async (model) => {
  if (!model) {
    throw new Error('Model is not initialized.');
  }

  // Test Case 1: Weekday, no exam, popular dish (high attendance)
  const input1 = tf.tensor2d([[0.7, 0, 0, 2]]); // 70% attendance, popular dish
  const pred1 = model.predict(input1);
  console.log('Weekday + Popular Dish Prediction:', pred1.dataSync());

  // Test Case 2: Weekend + exam, unpopular dish (low attendance)
  const input2 = tf.tensor2d([[0.3, 1, 1, 0]]); // 30% attendance, unpopular dish
  const pred2 = model.predict(input2);
  console.log('Weekend + Exam + Unpopular Dish Prediction:', pred2.dataSync());
};

// Step 4: Run the model
const run = async () => {
  try {
    const model = await trainModel();
    await testModel(model);

    // Save the model for later use (optional)
    await model.save('file://./saved_model');
  } catch (error) {
    console.error('Error:', error);
  }
};

run();