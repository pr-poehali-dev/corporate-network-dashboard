import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Host {
  id: string;
  name: string;
  ip: string;
  status: "online" | "offline" | "warning";
  lastSeen: string;
  description: string;
  responseTime: string;
}

const HostsList = () => {
  const hosts: Host[] = [
    {
      id: "1",
      name: "web-server-01",
      ip: "192.168.1.10",
      status: "online",
      lastSeen: "2 мин назад",
      description: "Основной веб-сервер",
      responseTime: "12ms",
    },
    {
      id: "2",
      name: "db-server-01",
      ip: "192.168.1.15",
      status: "online",
      lastSeen: "1 мин назад",
      description: "База данных PostgreSQL",
      responseTime: "8ms",
    },
    {
      id: "3",
      name: "mail-server",
      ip: "192.168.1.25",
      status: "warning",
      lastSeen: "15 мин назад",
      description: "Почтовый сервер Exchange",
      responseTime: "156ms",
    },
    {
      id: "4",
      name: "backup-server",
      ip: "192.168.1.30",
      status: "offline",
      lastSeen: "2 часа назад",
      description: "Сервер резервного копирования",
      responseTime: "Timeout",
    },
    {
      id: "5",
      name: "file-server",
      ip: "192.168.1.20",
      status: "online",
      lastSeen: "30 сек назад",
      description: "Файловый сервер NAS",
      responseTime: "45ms",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "text-green-400";
      case "warning":
        return "text-yellow-400";
      case "offline":
        return "text-red-400";
      default:
        return "text-slate-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return "CheckCircle2";
      case "warning":
        return "AlertTriangle";
      case "offline":
        return "XCircle";
      default:
        return "Circle";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return {
          variant: "default" as const,
          className: "bg-green-500/20 text-green-400 border-green-500/30",
          text: "Онлайн",
        };
      case "warning":
        return {
          variant: "outline" as const,
          className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
          text: "Предупреждение",
        };
      case "offline":
        return {
          variant: "destructive" as const,
          className: "bg-red-500/20 text-red-400 border-red-500/30",
          text: "Офлайн",
        };
      default:
        return {
          variant: "outline" as const,
          className: "text-slate-400",
          text: "Неизвестно",
        };
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-slate-200">
          Список хостов
        </CardTitle>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Icon name="Plus" className="h-4 w-4 mr-2" />
          Добавить хост
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {hosts.map((host) => {
            const statusBadge = getStatusBadge(host.status);
            return (
              <div
                key={host.id}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Icon
                    name={getStatusIcon(host.status)}
                    className={`h-5 w-5 ${getStatusColor(host.status)}`}
                  />
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-white">{host.name}</h3>
                      <Badge
                        variant={statusBadge.variant}
                        className={statusBadge.className}
                      >
                        {statusBadge.text}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400">
                      {host.ip} • {host.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-slate-500">
                        Последний отклик: {host.lastSeen}
                      </span>
                      <span className="text-xs text-slate-500">
                        Время отклика: {host.responseTime}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-white"
                  >
                    <Icon name="Edit" className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-white"
                  >
                    <Icon name="MoreVertical" className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default HostsList;
