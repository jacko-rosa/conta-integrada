export function logInit(clazz: string, method: string, request?: object) {
    console.log(`CLAZZ: ${clazz} | START | METHOD: ${method} ${request ? `| REQUEST: ${JSON.stringify(request)}` : ''}`);
}

export function logMid(clazz: string, method: string, step: string, content: object) {
    console.log(`CLAZZ: ${clazz} | MIDLE | METHOD: ${method} | STEP: ${step} | CONTENT: ${JSON.stringify(content)}}`);
}

export function logEnd(clazz: string, method: string, response?: object) {
    console.log(`CLAZZ: ${clazz} | END | METHOD: ${method} ${response ? `| RESPONSE: ${JSON.stringify(response)}` : ''}`);
}

export async function throwError(error: Error, clazz: string, method: string): Promise<never> {
    console.error(`CLAZZ: ${clazz} | METHOD: ${method} | ERROR: ${JSON.stringify(error)} MESSAGE: ${error.message}`);
    throw error;
}
