const { Transform } = require('stream');

class ReplaceText extends Transform {
    constructor(char) {
        super();
        this.replaceChar = char;
    }

    _transform(chunk, encoding, callback) {
        var replaceText = chunk.toString().replace(/[a-z]|[A-Z]|[0-9]/g, this.replaceChar);
        console.log(`replaceChar: ${this.replaceChar}`)
        console.log(`replaceText: ${replaceText}`)
        this.push(replaceText);
        callback();
    }

    _flush(callback) {
        this.push('omg its done')
        callback();

    }
}


const repalceText = new ReplaceText('y');

process.stdin
    .pipe(repalceText)
    .pipe(process.stdout);