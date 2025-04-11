'use client';

import { AccountsWebService } from '@/app/web-services/account/account.web-service';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import React, { FormEvent, useEffect, useState } from 'react';

interface AccountRegisterFormProps {
    formValues: { [key: string]: string };
    formErrors: { [key: string]: string };
    apiError: string | null;
    handleInputChange: (event: HTMLInputElement, label: string) => void;
    handleRegister: (event: React.FormEvent<HTMLFormElement>) => void;
    disableRegister: () => boolean;
}

export function AccountRegisterForm({
    formValues,
    formErrors,
    apiError,
    handleInputChange,
    handleRegister,
    disableRegister,
}: AccountRegisterFormProps) {
    const [compeCodes, setCompeCodes] = useState<{ key: string; value: string; }[]>([]);

    async function fetchCompeCodes() {
        const response = await AccountsWebService.getCompeCodes();
        setCompeCodes(response);
    }


    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        handleRegister(event);
    }

    useEffect(() => {
        fetchCompeCodes();

    }, []);

    return (
        <form style={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }} onSubmit={handleSubmit}>
            {apiError && <p style={{ color: 'red', margin: '1vh' }}>{apiError}</p>}

            <Select label="Compe Code"
                name="compeCode"
                value={formValues['compeCode']}
                onChange={(e) => handleInputChange({ name: e.target.name, value: e.target.value } as HTMLInputElement, 'Compe Code')}
                error={!!formErrors['compeCode']}
                style={{ width: '100%' }}
            >
                <MenuItem value={'000'} disabled selected={true}>
                    CompeCode
                </MenuItem>
                {
                    compeCodes.map((option) => (
                        <MenuItem value={option.value}>
                            {option.key}
                        </MenuItem>
                    ))
                }
            </Select>

            <TextField label="Branch Code"
                name="branchCode"
                type="text"
                value={formValues['branchCode']}
                onChange={(e) => handleInputChange(e.target as HTMLInputElement, 'Branch Code')}
                error={!!formErrors['branchCode']}
                helperText={formErrors['branchCode']}
                required
                style={{ marginTop: '1vh', width: '41%' }}
            />

            <TextField label="Account Number"
                name="accountNumber"
                type="text"
                value={formValues['accountNumber']}
                onChange={(e) => handleInputChange(e.target as HTMLInputElement, 'Account Number')}
                error={!!formErrors['accountNumber']}
                helperText={formErrors['accountNumber']}
                required
                style={{ marginTop: '1vh', width: '41%' }}
            />

            <TextField label="Digit"
                name="digit"
                type="text"
                value={formValues['digit']}
                onChange={(e) => handleInputChange(e.target as HTMLInputElement, 'Digit')}
                error={!!formErrors['digit']}
                helperText={formErrors['digit']}
                required
                style={{ marginTop: '1vh', width: '16%' }}
            />

            <div style={{ width: '100%', display: 'flex', justifyContent: 'end', gap: '1vw', marginTop: '2vh' }}>
                <Button type="reset" variant="contained" color="secondary">
                    Voltar
                </Button>
                <Button type="submit" variant="contained" disabled={disableRegister()} color="primary">
                    Register
                </Button>
            </div>

        </form>
    );
}