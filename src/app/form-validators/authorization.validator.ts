import { maxLenth, minLenth, mustContainAtLeastOne, required, typeInvalid } from "./util.validator";


function validateFormSignIn(name: string, value: string, label: string, currentErrors: { [key: string]: string }): { [key: string]: string } {
    const errors = { ...currentErrors };
    requiredValidation(value, errors, name, label);
    documentValidation(value, errors, name, label);
    return errors;
}

function validateFormSignUp(name: string, value: string, label: string, currentErrors: { [key: string]: string }): { [key: string]: string } {
    const errors = { ...currentErrors };
    requiredValidation(value, errors, name, label);
    nameValidation(value, errors, name, label);
    lastNameValidation(value, errors, name, label);
    documentValidation(value, errors, name, label);
    emailValidation(value, errors, name, label);
    passwordValidation(value, errors, name, label);
    return errors;
}

function requiredValidation(value: string, errors: { [key: string]: string; }, name: string, label: string) {
    value = value.trim();
    if (!value) {
        errors[name] = required(label);
    } else {
        delete errors[name];
    }
}

function nameValidation(value: string, errors: { [key: string]: string; }, name: string, label: string) {
    const minLimit = 3;
    const maxLimit = 50;
    if ('name' != name) {
        return
    }
    if (value.length < minLimit) {
        errors[name] = minLenth(label, minLimit);
        return;
    }
    if (value.length > maxLimit) {
        errors[name] = maxLenth(label, maxLimit);
        return;
    }
    delete errors[name];
}

function lastNameValidation(value: string, errors: { [key: string]: string; }, name: string, label: string) {
    const minLimit = 3;
    const maxLimit = 50;
    if ('lastName' != name) {
        return
    }
    if (value.length < minLimit) {
        errors[name] = minLenth(label, minLimit);
        return;
    }
    if (value.length > maxLimit) {
        errors[name] = maxLenth(label, maxLimit);
        return;
    }
    delete errors[name];
}

function documentValidation(value: string, errors: { [key: string]: string; }, name: string, label: string) {
    const minLimit = 11;
    const maxLimit = 14;
    if ('document' != name) {
        return;
    }
    const unformattedValue = value.replaceAll('.', '').replaceAll('-', '').replaceAll('/', '');
    if (isNaN(Number(unformattedValue))) {
        errors[name] = typeInvalid(label, 'number');
        return;
    }
    if (unformattedValue.length < minLimit || unformattedValue.length > maxLimit) {
        errors[name] = errors[name] + `${label} should has ${minLimit} or ${maxLimit} charactes.`;
        return;
    }
    delete errors[name]
}

function emailValidation(value: string, errors: { [key: string]: string; }, name: string, label: string) {
    const minLimit = 3;
    const maxLimit = 100;
    const minBeforeAt = 3;
    const minAfterAt = 3;

    if ('email' != name) {
        return;
    }
    if (value.length < minLimit) {
        errors[name] = minLenth(label, minLimit);
        return;
    }
    if (value.length > maxLimit) {
        errors[name] = maxLenth(label, maxLimit);
        return;
    }

    const [beforeAt, afterAt] = value.split('@');
    if ((!beforeAt || beforeAt.length < minBeforeAt) || (!afterAt || afterAt.length < minAfterAt)) {
        errors[name] = typeInvalid(label, 'email')
        return;
    }

    delete errors[name];
}

function passwordValidation(value: string, errors: { [key: string]: string; }, name: string, label: string) {
    const minLimit = 6;
    const maxLimit = 12;
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    let hasError = false;

    if ('password' != name) {
        return;
    }
    errors[name] = '';
    if (value.length < minLimit) {
        errors[name] = errors[name] + minLenth(label, minLimit);
        hasError = true
    }
    if (value.length > maxLimit) {
        errors[name] = errors[name] + maxLenth(label, maxLimit);
        hasError = true
    }
    if (!hasUppercase) {
        errors[name] = errors[name] + mustContainAtLeastOne(label, 'uppercase letter');
        hasError = true
    }
    if (!hasLowercase) {
        errors[name] = errors[name] + mustContainAtLeastOne(label, 'lowercase letter');
        hasError = true
    }
    if (!hasNumber) {
        errors[name] = errors[name] + mustContainAtLeastOne(label, 'number');
        hasError = true
    }
    if (!hasSpecialChar) {
        errors[name] = errors[name] + mustContainAtLeastOne(label, 'character');
        hasError = true
    }
    if (!hasError) {
        delete errors[name];
    }
    return

}

export const AuthorizationValidation = {
    validateFormSignUp,
    validateFormSignIn
}