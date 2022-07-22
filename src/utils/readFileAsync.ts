
//Promise wrapper for events of file reading
export const readFileAsync = (file: File) => new Promise<FileReader['result']>((res, rej) => {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onerror = () => {
        rej(reader.result)
    }
    reader.onloadend = () => {
        res(reader.result)
    }
})