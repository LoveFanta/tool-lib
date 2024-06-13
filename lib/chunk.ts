const handleInputFile = () => {
    let inputFile = document.querySelector('#fileInput') as HTMLElement
    let files = inputFile.files[0]
    const chunks = creatChunk(files, 10 * 1024)
    console.log(chunks);
    hash(chunks)
  }

  const hash = (chunks) => {
    const spark = new SparkMD5()
    function _read(i) {
      if(i >= chunks.length){
        console.log(spark.end())
        return
      }
      const blob = chunks[i]
      const reader = new FileReader()
      reader.onload = (e) => {
        const bytes = e.target.result
        spark.append(bytes)
        _read(i + 1)
      }
      reader.readAsArrayBuffer(blob)
    }
    _read(0)
  }

  const creatChunk = (file, chunkSize) => {
    const result = []
    for (let i = 0; i < file.size; i += chunkSize) {
      result.push(file.slice(i, i + chunkSize, file.type))
    }
    return result
  }