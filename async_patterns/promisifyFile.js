const { promisify } = require('util');
const { writeFile } = require('fs');

const filePromisify = promisify(writeFile);

filePromisify('sample.txt','Beleive in yourself').
    then(()=>console.log('File Successfully created')).
    catch((err)=>console.log(err.message))