import { argv } from 'process';
import * as fs from 'fs';


console.log('hello');


// print process.argv

// grab file name and number 
argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
    
  });

// readFile and pull in data 
fs.readFile('/Users/joe/test.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})

// then iterate through data and return the highest scores