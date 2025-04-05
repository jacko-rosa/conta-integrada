export const Routes = {
    HOME: {
        MAIN: {
            label: 'Home',
            href: '/'
        },
        LOGIN: {
            label: 'SignIn',
            href: '/login'
        },
        REGISTER: {
            label: 'SignUp',
            href: '/register'
        }
    },
    DASBOARD: {
        MAIN: {
            label: 'Dashboard',
            href: '/dashboard'
        }
    },
    ACCOUNTS: {
        MAIN: {
            label: 'Accounts',
            href: '/accounts'
        },
        EDIT: {
            label: 'Accounts Edit',
            href: (id: string) => `/accounts/${id}`
        },
        REGISTER: {
            label: 'Accounts Register',
            href: '/accounts/register'
        }
    }
}