export const setCsvTemplate = (titles,data,cols) => {
    const titlesTxt = titles.reduce((acc, cur) => {
        acc += `"${cur.text}",`
        return acc
    }, '')
    const colsTxt = data.reduce((acc,col) => {
        acc += `${
            Object.values(cols).reduce((colAcc,colCur) => {
                colAcc += `"${col[colCur.key]}",`
                return colAcc;
            },'')
        }\n`
        return acc
    },'')


    return `${titlesTxt}\n\n${colsTxt}`
}