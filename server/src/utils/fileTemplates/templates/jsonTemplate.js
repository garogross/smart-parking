export const setJsonTemplate = (titles,data,cols) => {
    const result = data.map((item) => {
        return Object.values(cols).reduce((colAcc,colCur,index) => {
                colAcc[titles[index].text] = item[colCur.key]
                return colAcc;
            },{})
    })
    return JSON.stringify(result)
}