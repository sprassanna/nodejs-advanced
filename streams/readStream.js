const { Readable } = require('stream');
const dataFileArray = ['One', 'Two', 'Three', 'Four', 'Five'];


class ArrayStream extends Readable {

    constructor(array = []) {
        super({ objectMode: true });
        this.array = array;
        this.index = 0;
    }

    _read() {
        if (this.index < this.array.length) {
            let chunk = {
                data: this.array[this.index],
                index: this.index
            }
            this.push(chunk);

            this.index += 1;

        }
        else {
            this.push(null);
        }
    }
}





const arrayStream = new ArrayStream(dataFileArray);

arrayStream.on('data', (chunk) => console.log(chunk));

arrayStream.on('end', () => console.log('DONE!'))


