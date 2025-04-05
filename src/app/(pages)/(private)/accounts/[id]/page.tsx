import { Breadcrumps } from "@/app/components/breadcrumps/breadcrumps";
import { Routes } from "@/utils/routes";

export default function AccountEditPage() {
    return (
        <div>
            
            <Breadcrumps crumbs={[Routes.ACCOUNTS.MAIN]} actual={Routes.ACCOUNTS.EDIT} />
        </div>
    )
}