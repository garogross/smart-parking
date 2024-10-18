export function formatDate(dateStr,reversed) {
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    let result = `${day}-${month}-${year}`
    if(reversed) {
        return result.split('-').reverse().join('-')
    } else {
        const hours = date.getHours()
        const min = date.getMinutes()
        const sec = date.getSeconds()

        return `${result} ${hours}:${min}:${sec}`;

    }
}

export const isThisMonth = (dateStr,isGte) => {
    const date = new Date(dateStr)
    const today = new Date()
    const dateYear = date.getFullYear()
    const todayYear = today.getFullYear()
    const dateMonth = date.getMonth()
    const todayMonth = today.getMonth()

    return isGte ?
        dateYear >= todayYear && dateMonth >= todayMonth :
        dateYear === todayYear && dateMonth === todayMonth
}