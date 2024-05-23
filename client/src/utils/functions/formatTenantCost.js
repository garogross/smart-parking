import {tariffTypes} from "../../constants";

export const formatTenantCost = (formData) => {
    const data = {...formData, costOfMonth: {}}
    const monthTariffs = [tariffTypes.perMonth, tariffTypes.unLimit]
    const hourTariffs = [tariffTypes.perHour, tariffTypes.Guest]
    for (let key in data) {
        if (key.startsWith('costOfMonth.')) {
            data.costOfMonth[key.replace('costOfMonth.', "")] = (!data[key] || !monthTariffs.includes(data.tariff)) ? 0 : data[key]
            delete data[key]
        }
    }
    if (!hourTariffs.includes(data.tariff)) data.costOfTime = 0

    return data
}