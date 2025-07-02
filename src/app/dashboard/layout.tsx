
import { FC, ReactNode } from 'react';


interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
    <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">

        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
