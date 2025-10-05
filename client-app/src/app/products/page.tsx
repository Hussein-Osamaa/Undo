import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProductList } from '@/components/products/ProductList';
import { SampleDataSeeder } from '@/components/products/SampleDataSeeder';

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <SampleDataSeeder />
        <ProductList />
      </div>
    </DashboardLayout>
  );
}
