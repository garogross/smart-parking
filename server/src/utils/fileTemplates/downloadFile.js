import {DIRNAME, downloadFileFormats} from "../../constants.js";
import {AppError} from "../appError.js";
import path from "path";
import fs from "fs";
import {fileTemplates} from "./fileTemplates.js";

export const downloadFile = (titles, cols, renderData, fileName) => {
    return async (req, res, next) => {
        const {format} = req.params
        if (!format || !downloadFileFormats.includes(format)) return next(new AppError('invalid format'))
        if (!req.data) return next(new AppError('no data'))
        const data = renderData ? req.data.map(renderData) : req.data

        const filePath = `public/${fileName}.${format}`
        const fullFilePath = path.join(DIRNAME.replace('src', ""), filePath)

        const fileContent = format === 'xls' ?
            await fileTemplates[format](titles, data, cols) :
            fileTemplates[format](titles, data, cols)
        fs.writeFile(
            fullFilePath,
            fileContent,
            (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                } else {
                    res.download(filePath, `${fileName}.${format}`)
                }
            });
    }
}