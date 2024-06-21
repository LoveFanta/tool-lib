import { FileChunks } from '../index';

const inputFile = document.querySelector('inputFile') as HTMLInputElement

const creatChunk = new FileChunks(inputFile,10)

console.log(inputFile);

inputFile.addEventListener('change',() =>{
    creatChunk.init()
    console.log(creatChunk.hashValue,creatChunk.chunks);
})
