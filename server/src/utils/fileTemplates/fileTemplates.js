import {setHtmlTemplate} from "./templates/htmlTemplate.js";
import {setTxtTemplate} from "./templates/txtTemplate.js";
import {setJsonTemplate} from "./templates/jsonTemplate.js";
import {setCsvTemplate} from "./templates/csvTemplate.js";
import {setXlsTemplate} from "./templates/xlsTemplate.js";

export const fileTemplates = {
    html: setHtmlTemplate,
    txt: setTxtTemplate,
    json: setJsonTemplate,
    csv: setCsvTemplate,
    xls: setXlsTemplate,
}