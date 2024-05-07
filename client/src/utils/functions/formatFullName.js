import {fullNameChain} from "../../constants";

export const formatFullName = (fullName) => fullName?.replaceAll(fullNameChain," ") || ""