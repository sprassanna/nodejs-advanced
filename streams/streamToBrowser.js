const { stat, createReadStream, createWriteStream } = require('fs');
const { createServer } = require('http');
const { promisify } = require('util');
const fileInfo = promisify(stat);
const multiparty = require('multiparty');

const fileName = "./dest.mp4";

const createVideo = async (req, res) => {

    const { size } = await fileInfo(fileName);
    const range = req.headers.range;
    console.log(`range ${range}`)

    if (range) {

        let [start, end] = range.replace(/bytes=/, '').split('-');
        start = parseInt(start, 10);
        end = end ? parseInt(end, 10) : size - 1;
        console.log(`start ${start} end ${end}`)
        res.writeHead(206, {

            'Content-Range': `bytes ${start} - ${end}/${size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': (end - start) + 1,
            'Content-Type': 'video/mp4'
        })
        createReadStream(fileName, { start, end }).pipe(res);

    }
    else {
        res.writeHead(200, {
            'Content-Length': size,
            'Content-Type': 'video/mp4'
        });
        createReadStream(fileName)
            .pipe(res);

    }




}

createServer((req, res) => {
    if (req.method === 'POST') {
        let newForm = new multiparty.Form();
        newForm
            .on('part', (part) => {
                console.log(`${part.filename}`);
                part.pipe(createWriteStream(`./${part.filename}-new.mp4`))
                    .on('close', () => {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(`<h1> FILE UPLOAD COMPLETED!! </h1>`);
                    })
            })
        newForm.parse(req);

    }
    else if (req.url === '/video') {
        createVideo(req, res)
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(
            `
            <form enctype="multipart/form-data" method="POST" action="/">
                <input type="file" name="uploadFile" />
                <button>Upload files</button>
            </form>
            
            `
        );

    }
}).listen(3000, () => console.log(`Running http://localhost:3000/`))
