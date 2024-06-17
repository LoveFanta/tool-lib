import SparkMD5 from 'spark-md5'

const handleInputFile = (inputName:string) => {
  let inputFile = document.querySelector(inputName) as HTMLInputElement
  if(!inputFile) return 
  let files = inputFile.files as FileList
  const chunks = creatChunk(files[0], 10 * 1024)
  hash(chunks)
}

const hash = (chunks:Blob[]) => {
  const spark = new SparkMD5.ArrayBuffer()
  function _read(i:number) {
    if (i >= chunks.length) {
      console.log(spark.end())
      return
    }
    const blob = chunks[i]
    const reader = new FileReader()
    reader.onload = (e) => {
      const bytes = (e.target && e.target.result) as ArrayBuffer
      spark.append(bytes)
      _read(i + 1)
    }
    reader.readAsArrayBuffer(blob)
  }
  _read(0)
}

const creatChunk = (file: File, chunkSize: number) => {
  const result = []
  for (let i = 0; i < file.size; i += chunkSize) {
    result.push(file.slice(i, i + chunkSize, file.type))
  }
  return result
}