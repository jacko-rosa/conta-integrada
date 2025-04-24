'use client';

import { Breadcrumps } from '@/app/components/breadcrumps/breadcrumps';
import { PaymentWebService } from '@/app/web-services/payment/payment.web-service';
import { Routes } from '@/utils/routes';
import { Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Errors {
    barcode: string | null;
    description: string | null;
}

const errorDefault = {
    barcode: 'barcode is required',
    description: ''
}

export default function PaymentsRegisterPage() {
    const [barcode, setBarcode] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState<Errors>(errorDefault);
    const [apiError, setApiError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const validateBarcode = (value: string) => {
        if (value.trim().length < 40) {
            setErrors(prevErrors => ({ ...prevErrors, barcode: 'Barcode sould has more then 40 charactes' }))
            return
        }
        if (value.trim().length > 48) {
            setErrors(prevErrors => ({ ...prevErrors, barcode: 'Barcode sould has no more then 48 charactes' }))
            return
        }
    }

    const validateDescription = (value: string) => {
        if (value.trim().length > 40) {
            setErrors(prevErrors => ({ ...prevErrors, description: 'Barcode sould has more then 40 charactes' }))
            return
        }
    }

    const handleBarcode = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setBarcode(value);
        setErrors(prevErrors => ({ ...prevErrors, barcode: null }));
        validateBarcode(value);
    };

    const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setDescription(value);
        setErrors(prevErrors => ({ ...prevErrors, description: null }));
        validateDescription(value);
    };

    const hasError = (): boolean => {
        return !!errors.barcode || !!errors.description
    }

    const handleAdvance = async () => {
        setIsSubmitting(true);
        try {
            await PaymentWebService.registerPayment(barcode, description);
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
    };

    return (
        <div>
            <Breadcrumps crumbs={[Routes.DASBOARD.MAIN]} actual={Routes.PAYMENTS.REGISTER} />
            <div>
                {apiError && <p style={{ color: 'red', margin: '1vh' }}>{apiError}</p>}
                {isSubmitting && <CircularProgress />}
                <Typography variant="h6" gutterBottom>
                    Pay Slip
                </Typography>

                <div>
                    <TextField label="Barcode"
                        fullWidth
                        value={barcode}
                        onChange={handleBarcode}
                        required
                    />

                    <TextField label="Description"
                        fullWidth
                        value={description}
                        onChange={handleDescription}
                        margin="normal"
                        helperText={
                            <span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <span style={{ display: 'block' }}>
                                    opitional
                                </span>
                                <span style={{ display: 'block' }}>
                                    {description.length}/40
                                </span>
                            </span>
                        }
                    />
                </div>

                <div>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleAdvance}
                        disabled={hasError() || isSubmitting}
                        style={{ marginTop: '2vh' }}
                    >
                        Advance
                    </Button>
                </div>
            </div>
        </div>
    );
}