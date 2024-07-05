import { tariffTypes } from "../../constants"

export const verifyTenantTarrif = (data) => {
    if(data.tariff === tariffTypes.guest) {
        const date = new Date()
        const [hour,min] = data.validity.split(":")
        date.setHours(+hour)
        date.setMinutes(+min)
        data.validity = date.toISOString()
    }
    return data
}