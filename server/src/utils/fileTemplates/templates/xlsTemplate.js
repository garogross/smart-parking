import ExcelJS from 'exceljs';

export const setXlsTemplate = async (titles,data,cols) => {
    try {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Sheet');
        sheet.columns = titles.map(({text,width},index) => ({
            header: text,
            key: cols[index].key,
            width
        }))

        data.forEach((item,index) => {

            const row = cols.reduce((acc,cur) => {
               acc[cur.key] = item[cur.key]
                return acc
            },{})
            sheet.addRow({id: index+1,...row})
        })
        sheet.getRow(1).font = { bold: true };
        const buffer = await workbook.xlsx.writeBuffer();

        return buffer
    } catch (err) {
        console.log({err})
    }
}