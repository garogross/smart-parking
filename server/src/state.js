export const globalState = {
    lastEntryPlateNumber: "",
    lastExitPlateNumber: "",
}

export const setPlateNumber = (payload,isExit) => {
    const key = isExit ? "lastExitPlateNumber" : "lastEntryPlateNumber"
    globalState[key] = payload
}