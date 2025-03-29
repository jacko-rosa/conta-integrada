export const required = (label: string) => `${label} is required.`;
export const minLenth = (label: string, minLimit: number) => `${label} should has more then ${minLimit} charactes.`;
export const maxLenth = (label: string, maxLimit: number) => `${label} should has not more then ${maxLimit} charactes.`;
export const excatLenth = (label: string, limit: number) => `${label} should has ${limit} charactes.`;
export const typeInvalid = (label: string, type: string) => `${label} must be a valid ${type}.`;
export const mustContainAtLeastOne = (label: string, thing: string) => `${label} must contain at least one ${thing}.`;