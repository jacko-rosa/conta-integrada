'use server'

import { UserDto } from "@/definitions/user.definition";
import { buildObjectsFromFormData, logEnd, logInit } from "@/utils/util";

const CLAZZ = 'AuthenticationService'

const inputsForm = {
    name: 'name',
    lastName: 'lastName',
    email: 'email',
    document: 'document',
    password: 'password',
}

export async function signUp(form: FormData): Promise<UserDto> {
    const METHOD = 'signUp';
    logInit(CLAZZ, METHOD, buildObjectsFromFormData([inputsForm.name, inputsForm.lastName, inputsForm.email, inputsForm.document], form))

    const name = form.get(inputsForm.name);
    const lastName = form.get(inputsForm.lastName);
    const email = form.get(inputsForm.email)
    const document = form.get(inputsForm.document);
    const password = form.get(inputsForm.password);

    const response = {
        name,
        lastName,
        email,
        document,
        password
    } as UserDto

    logEnd(CLAZZ, METHOD, response)
    return Promise.resolve(response);
}