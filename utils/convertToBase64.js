export function convertToBase64(inputFile) {
    const fileReader = new FileReader()

    return new Promise((resolve, reject) => {
      fileReader.onerror = () => {
        fileReader.abort()
        reject(new DOMException("Problem reading input file"))
      }

      
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
  
      fileReader.readAsDataURL(inputFile)
    })
  }