const setHtmlTemplateHeaders = (headers) => {
    return headers.reduce((acc, cur, index) => {
        const {width, text} = cur
        acc += `<th data-col-seq="${index}" style="width: ${width}%;">${text}</th>\n`
        return acc
    }, "")
}

const setHtmlTemplateCols = (data,cols) => {
    return data.reduce((acc,col) => {
        acc += `
       <tr class="kv-grid-history">
       ${
            Object.values(cols).reduce((colAcc,colCur) => {
                const style = colCur.style ?
                    Object.keys(colCur.style(col)).reduce((acc,cur) => {
                        acc += `${cur}: ${colCur.style(col)[cur]};`
                        return acc;
                    },'') : ""
                colAcc += `<td class="kv-grid-history" style="${style}" data-col-seq="1">${col[colCur.key]}</td>`
                return colAcc;
            },'')
        }
       </tr>
       `
        return acc
    },'')
}

export const setHtmlTemplate = (headers,data,cols) =>  (`
<!DOCTYPE html>
<meta content="text/html;charset=utf-8" http-equiv="Content-Type"/>
<meta content="IE=edge;chrome=1" http-equiv="X-UA-Compatible"/>
<link crossorigin="anonymous" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
      rel="stylesheet">
<link crossorigin="anonymous" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" rel="stylesheet">
<style>.kv-wrap {
    padding: 20px
}</style>
<body class="kv-wrap">
<table class="kv-grid-table table table-hover table-bordered table-sm">
    <thead class="kv-table-header kv-grid-history" style="top:50px">
    <tr>
        ${setHtmlTemplateHeaders(headers)} 
    </tr>
    </thead>
    <tbody>
        ${setHtmlTemplateCols(data,cols)}
    </tbody>
</table>
</body>
`)