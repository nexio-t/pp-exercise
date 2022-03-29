import { argv } from "process";
import * as fs from "fs";

const userInput = {
  fileName: '',
  count: 0,
};

const countHighestScores = (data, count) => {
  const scores = Object.keys(data)
    .map(Number)
    .sort((v1, v2) => v2 - v1);

  if (count >= scores.length) {
    return console.error(
      `Count is out of range. Please select something less than ${scores.length}`
    );
  }
  const highScores = scores.slice(0, count);

  const results = highScores.map((score) => {
    return { score, id: data[score].id };
  });

  return console.log(`The top ${count} scores are: `, results);
};

const readInputs = (file, count) => {
  fs.readFile(`${file}`, 'utf8', (err, data) => {
    if (err) {
      return console.error('Error reading file: ', err);
    }
    try {      
      const parsedData = JSON.parse(data);

      return countHighestScores(parsedData, count);
    } catch (e) {
      // regex to capture position of unexpected token 
      // slice file at the position of unexpected token
      // attempt to parse JSON again and return highest scores
      return console.error(
        'Invalid JSON Format. No JSON object could be decoded.'
      );
    }
  });
};

if (argv.length < 4) {
  if (argv.length === 3) {
    console.error('Please provide a count of scores to return.');
  } else if (argv.length === 2) {
    console.error('Please provide the file path and count of scores.');
  }
} else {
  if (isNaN(parseInt(argv[3]))) {
    console.error('Count must be a number.');
  } else {
    argv.forEach((val, idx) => {
      if (idx === 2) userInput.fileName = val;
      if (idx === 3) userInput.count = val;
    });

    if (userInput.fileName && userInput.count) {
      readInputs(userInput.fileName, userInput.count);
    } else {
      console.error('File path and/or count are invalid');
    }
  }
}
