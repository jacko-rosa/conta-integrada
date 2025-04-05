import { HeaderComponent } from "@/app/components/header/home/header.componten";
import ProtectedRoute from "@/app/components/protected-route/protected-route.component";

export default function PrivateLayout({ children }: { children: React.ReactNode; }) {
  return (
    <ProtectedRoute>
      <main style={{ display: 'flex', width: '100vw', maxWidth: '2500px', padding: '1vh 1vw 1vh 1vw' }}>
        <div style={{ border: '1px solid black', display: 'block', width: '20%', minHeight: '98vh' }}>
          {/* TODO subistituir por SideNav  */}
        </div>
        <div style={{ width: '80%' }}>
          <HeaderComponent />
          <div style={{ margin: '1vh 0 0 1vw' }}>
            {children}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}