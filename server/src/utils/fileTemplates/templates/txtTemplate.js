export const setTxtTemplate = (titles,data,cols) => {
    return data.reduce((acc,col) => {
        acc += `${
            Object.values(cols).reduce((colAcc,colCur,index) => {
                colAcc += `${titles[index].text.padEnd(30,' ')} ${col[colCur.key]}\n`
                return colAcc;
            },'')
        }\n\n`
        return acc
    },'')
}