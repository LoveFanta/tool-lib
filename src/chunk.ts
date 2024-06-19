import SparkMD5 from 'spark-md5'

export default class FileHandle {

  inputName:string
  maxSize:number
  hashValue:string = ""
  chunks:Blob[] = []

  constructor(inputName:string,maxSize:number) {
    this.inputName = inputName
    this.maxSize = maxSize
  }

  handleInputFile = () => {
    let inputFile = document.querySelector(this.inputName) as HTMLInputElement
    if(!inputFile) return 
    let files = inputFile.files as FileList
    this.chunks = this.creatChunk(files[0], 10 * 1024)
    this.hash(this.chunks).then((res) => {
      this.hashValue = res
      console.log(res);
    })
  }

  hash = (chunks:Blob[]):Promise<string>  => {
    return new Promise((resolve) => {
      const spark = new SparkMD5.ArrayBuffer()
      const reader = new FileReader()
      function _read(i:number) {
        if (i >= chunks.length) {
          return resolve(spark.end())
        }
        const blob = chunks[i]
        reader.onload = (e) => {
          const bytes = (e.target && e.target.result) as ArrayBuffer
          spark.append(bytes)
          _read(i + 1)
        }
        reader.readAsArrayBuffer(blob)
      }
      _read(0)
    })
  }


  creatChunk = (file: File, chunkSize: number) => {
    const result = []
    for (let i = 0; i < file.size; i += chunkSize) {
      result.push(file.slice(i, i + chunkSize, file.type))
    }
    return result
  }
}