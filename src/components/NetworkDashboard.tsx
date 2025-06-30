import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const NetworkDashboard = () => {
  const networkStats = {
    totalHosts: 24,
    onlineHosts: 21,
    criticalAlerts: 2,
    warningAlerts: 5,
    networkUptime: "99.8%",
    bandwidth: "847 MB/s",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-200">
            Состояние сети
          </CardTitle>
          <Icon name="Globe" className="h-4 w-4 text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            {networkStats.networkUptime}
          </div>
          <p className="text-xs text-slate-400">время работы</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-200">
            Хосты онлайн
          </CardTitle>
          <Icon name="Server" className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            {networkStats.onlineHosts}/{networkStats.totalHosts}
          </div>
          <p className="text-xs text-slate-400">активных устройств</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-200">
            Пропускная способность
          </CardTitle>
          <Icon name="Activity" className="h-4 w-4 text-orange-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">
            {networkStats.bandwidth}
          </div>
          <p className="text-xs text-slate-400">текущая нагрузка</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-200">
            Критические уведомления
          </CardTitle>
          <Icon name="AlertTriangle" className="h-4 w-4 text-red-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-400">
            {networkStats.criticalAlerts}
          </div>
          <p className="text-xs text-slate-400">требуют внимания</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-200">
            Предупреждения
          </CardTitle>
          <Icon name="AlertCircle" className="h-4 w-4 text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-400">
            {networkStats.warningAlerts}
          </div>
          <p className="text-xs text-slate-400">к проверке</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700 md:col-span-1">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-slate-200">
            Быстрые действия
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Badge
            variant="outline"
            className="text-blue-400 border-blue-400 hover:bg-blue-400/10 cursor-pointer"
          >
            Сканировать сеть
          </Badge>
          <Badge
            variant="outline"
            className="text-green-400 border-green-400 hover:bg-green-400/10 cursor-pointer"
          >
            Тест связи
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default NetworkDashboard;
