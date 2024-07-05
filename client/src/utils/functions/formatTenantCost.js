import {tariffTypes} from "../../constants";

export const formatTenantCost = (formData) => {
    const data = {...formData, costOfMonth: {}}
    const monthTariffs = [tariffTypes.manual, tariffTypes.admin]
    const hourTariffs = [tariffTypes.guest]
    for (let key in data) {
        if (key.startsWith('costOfMonth.')) {
            data.costOfMonth[key.replace('costOfMonth.', "")] = (!data[key] || !monthTariffs.includes(data.tariff)) ? 0 : data[key]
            delete data[key]
        }
    }
    if (!hourTariffs.includes(data.tariff)) data.costOfHour = 0

    return data
}