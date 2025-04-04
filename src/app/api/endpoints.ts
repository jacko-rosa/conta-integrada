const POST = 'POST';
const GET = 'GET';

export const Endpoints = {
    authentication: {
        login: {
            path: '/api/authentication/login',
            methods: { POST },
        },
        register: {
            path: '/api/authentication/register',
            methods: { POST },
        },
    },
    accounts: {
        path: '/api/accounts',
        methods: { POST, GET },
        balance: {
            path: '/api/accounts/balance',
            methods: { GET },
        }
    }
}