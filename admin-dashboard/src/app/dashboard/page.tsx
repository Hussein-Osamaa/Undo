/**
 * Main dashboard page
 */

import { AdminLayout } from '@/components/layout/AdminLayout';
import { OverviewDashboard } from '@/components/dashboard/OverviewDashboard';

export default function DashboardPage() {
  return (
    <AdminLayout>
      <OverviewDashboard />
    </AdminLayout>
  );
}
