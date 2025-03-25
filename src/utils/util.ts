export function logInit(clazz: string, method: string, request: object) {
    console.log(`CLAZZ: ${clazz} | START | METHOD: ${method} | REQUEST: ${JSON.stringify(request)}`)
}

export function logMid(clazz: string, method: string, step: string, content: object) {
    console.log(`CLAZZ: ${clazz} | MIDLE | METHOD: ${method} | STEP: ${step} | CONTENT: ${JSON.stringify(content)}}`)
}

export function logEnd(clazz: string, method: string, response: object) {
    console.log(`CLAZZ: ${clazz} | END | METHOD: ${method} | RESPONSE: ${JSON.stringify(response)}`)
}

export async function throwError(error: Error, clazz: string, method: string, message: string): Promise<never> {
    console.log(`CLAZZ: ${clazz} | METHOD: ${method} | ERROR: ${error.name} ORIGINAL MESSAGE: ${error.message} ALTERNATIVE MESSAGE: ${message} }`);
    throw new Error(message)
}

export function buildObjectsFromFormData(keys: string[], form: FormData): object[] {
    return keys.map((key) => {
        return { [key]: form.get(key) };
    });
}
