import { useEffect } from 'react';
import { DashboardHero } from '@/components/dashboard/DashboardHero';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { RecentInstallations } from '@/components/dashboard/RecentInstallations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useInstallationStore } from '@/store/installationStore';

export const Dashboard = () => {
  const { installations, loadInstallations, isLoading } = useInstallationStore();

  useEffect(() => {
    loadInstallations();
  }, [loadInstallations]);

  const recent = installations.slice(0, 5);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <DashboardHero />
      <StatsCards installations={installations} />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">התקנות אחרונות</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 animate-pulse rounded-xl bg-muted/20"
                />
              ))}
            </div>
          ) : (
            <RecentInstallations installations={recent} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
