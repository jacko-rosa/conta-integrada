import { HeaderComponent } from "@/app/components/header/home/header.componten";
import ProtectedRoute from "@/app/components/protected-route/protected-route.component";

export default function PrivateLayout({ children }: { children: React.ReactNode; }) {
  return (
    <body>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '98vw', maxWidth: '2500px', paddingTop: '1vh' }}>
        <ProtectedRoute>
          <HeaderComponent />
          {children}
        </ProtectedRoute>
      </div>
    </body>
  );
}