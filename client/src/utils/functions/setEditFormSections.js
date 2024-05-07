import {fullNameChain} from "../../constants";
import {formatDate} from "./date";

const fullNameFields = [
    "firstName",
    "lastName",
    "patronymic",
]
export const setEditFormSections = (sections, curItem) => {
    return sections.map(section => {
        const result = {
            ...section,
            cols: section.cols.map(col => (
                col.map(field => {
                    let value = curItem?.[field.key] || ""
                    fullNameFields.forEach((item, index) => {
                        if (field.key === item && curItem) value = curItem.fullName.split(fullNameChain)[index]
                    })

                    if (field.key)
                        return ({...field, value})
                }))
            )
        }
        const {sectionKey} = section
        if (sectionKey) {
            const cols = section.cols.flat()
            const values = curItem?.[sectionKey] ?
                curItem[sectionKey].map(item => {
                const fields =  cols.reduce((acc, cur) => {
                    const value  = cur.type === 'date' ? formatDate(item?.[cur.key],true) : item?.[cur.key]
                    acc[cur.key] = value || ""
                    return acc;
                }, {})
                return {...fields,_id: item?._id}
            }) : null
            result.values = values
        }

        return result
    })
}
