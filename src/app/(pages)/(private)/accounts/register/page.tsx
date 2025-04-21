'use client'

import { AccountRegisterForm } from "@/app/components/account/register/account-register.component";
import { AccountsWebService } from "@/app/web-services/account/account.web-service";
import { AccountMapper } from "@/mappers/accout.mapper";
import { BRAND } from "@/utils/constants";
import { Routes } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const defaultValue = {
    compeCode: '',
    branchCode: '',
    accountNumber: '',
    digit: '',
}

export default function AccuntRegisterPage() {
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>(defaultValue);
    const [formValues, setFormValues] = useState<{ [key: string]: string }>(defaultValue);
    const [apiError, setApiError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    async function register(event: React.FormEvent<HTMLFormElement>) {
        setApiError(null);
        setIsSubmitting(true);
        try {
            const form = new FormData(event.currentTarget)
            const dto = AccountMapper.formToDto(form);
            await AccountsWebService.registerAccount(dto);
            router.push(Routes.ACCOUNTS.MAIN.href);
        } catch (error: unknown) {
            setIsSubmitting(false);
            if (error instanceof Error) {
                setApiError(error.message);
            } else {
                setApiError('Unespected error');
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleInputChange(event: HTMLInputElement) {
        const { name, value } = event;
        setFormValues((prev) => ({ ...prev, [name]: value }));
        // setFormErrors((prev) => ({ ...prev, [name]: '' }));
        setFormErrors((prev) => {
            const updatedErrors = { ...prev };
            delete updatedErrors[name];
            return updatedErrors;
        });
        setApiError(null);
        // const errors = AuthorizationValidation.validateFormSignUp(name, value, label, formErrors);
        // setFormErrors(errors);
    }

    function disableRegister(): boolean {

        return Object.keys(formErrors).length > 0 || Object.keys(formValues).length < Object.keys(defaultValue).length || isSubmitting;
    }

    useEffect(() => {
        setFormValues((prev) => ({ ...prev, 'compeCode': '000' }));
        document.title = `${BRAND} | ${Routes.ACCOUNTS.REGISTER.label}`;
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', width: '100%' }}>
            <AccountRegisterForm
                formValues={formValues}
                formErrors={formErrors}
                apiError={apiError}
                handleInputChange={handleInputChange}
                handleRegister={register}
                disableRegister={disableRegister}
            >
            </AccountRegisterForm>
        </div>
    );
};