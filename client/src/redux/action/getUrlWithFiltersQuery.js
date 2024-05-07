import {fullNameChain} from "../../constants";

export const getUrlWithFiltersQuery = (url,page,filters = {}) => (dispatch,getState) => {
    let filtersQuery = ""
    if (filters) {
        for (let key in filters) {
            const filter = filters[key]
            if (!filter && typeof filter !== "boolean") continue;
            let value = filter
            if(key === 'fullName') value = value.replaceAll(' ',fullNameChain)
            filtersQuery += `&${key}=${value}`
        }
    }
    return `${url}?page=${page}${filtersQuery}`
}