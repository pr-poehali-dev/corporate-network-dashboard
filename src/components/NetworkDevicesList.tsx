import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface NetworkDevice {
  id: string;
  name: string;
  ip: string;
  status: "online" | "offline" | "warning";
  lastSeen: string;
  model: string;
  manufacturer: "cisco" | "d-link" | "snr";
  ports: number;
  location: string;
  responseTime: string;
  uptime: string;
}

const NetworkDevicesList = () => {
  const devices: NetworkDevice[] = [
    {
      id: "1",
      name: "SW-CORE-01",
      ip: "192.168.1.1",
      status: "online",
      lastSeen: "1 мин назад",
      model: "Catalyst 3850-24T",
      manufacturer: "cisco",
      ports: 24,
      location: "Серверная комн. 1",
      responseTime: "3ms",
      uptime: "45 дней",
    },
    {
      id: "2",
      name: "SW-EDGE-02",
      ip: "192.168.1.10",
      status: "online",
      lastSeen: "30 сек назад",
      model: "DGS-3120-24TC",
      manufacturer: "d-link",
      ports: 24,
      location: "Офис 2 этаж",
      responseTime: "8ms",
      uptime: "12 дней",
    },
    {
      id: "3",
      name: "SW-ACCESS-03",
      ip: "192.168.1.15",
      status: "warning",
      lastSeen: "5 мин назад",
      model: "S2965-24T",
      manufacturer: "snr",
      ports: 24,
      location: "Склад",
      responseTime: "45ms",
      uptime: "8 дней",
    },
    {
      id: "4",
      name: "SW-CORE-02",
      ip: "192.168.1.2",
      status: "offline",
      lastSeen: "2 часа назад",
      model: "Catalyst 2960X-48TS",
      manufacturer: "cisco",
      ports: 48,
      location: "Серверная комн. 2",
      responseTime: "Timeout",
      uptime: "0 дней",
    },
    {
      id: "5",
      name: "SW-WIFI-01",
      ip: "192.168.1.20",
      status: "online",
      lastSeen: "2 мин назад",
      model: "DGS-1210-10P",
      manufacturer: "d-link",
      ports: 10,
      location: "Приемная",
      responseTime: "15ms",
      uptime: "23 дня",
    },
    {
      id: "6",
      name: "SW-LAB-01",
      ip: "192.168.1.30",
      status: "online",
      lastSeen: "1 мин назад",
      model: "S2950G-24T",
      manufacturer: "snr",
      ports: 24,
      location: "Лаборатория",
      responseTime: "12ms",
      uptime: "31 день",
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

  const getManufacturerColor = (manufacturer: string) => {
    switch (manufacturer) {
      case "cisco":
        return "text-blue-400";
      case "d-link":
        return "text-green-400";
      case "snr":
        return "text-orange-400";
      default:
        return "text-slate-400";
    }
  };

  const getManufacturerIcon = (manufacturer: string) => {
    switch (manufacturer) {
      case "cisco":
        return "Router";
      case "d-link":
        return "Wifi";
      case "snr":
        return "Network";
      default:
        return "HardDrive";
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-slate-200">
          Сетевые устройства
        </CardTitle>
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          <Icon name="Plus" className="h-4 w-4 mr-2" />
          Добавить устройство
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {devices.map((device) => {
            const statusBadge = getStatusBadge(device.status);
            return (
              <div
                key={device.id}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center">
                    <Icon
                      name={getManufacturerIcon(device.manufacturer)}
                      className={`h-6 w-6 ${getManufacturerColor(device.manufacturer)}`}
                    />
                    <Icon
                      name={getStatusIcon(device.status)}
                      className={`h-3 w-3 ${getStatusColor(device.status)} -mt-1`}
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-white">{device.name}</h3>
                      <Badge
                        variant={statusBadge.variant}
                        className={statusBadge.className}
                      >
                        {statusBadge.text}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-xs ${getManufacturerColor(device.manufacturer)} border-current`}
                      >
                        {device.manufacturer.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400">
                      {device.ip} • {device.model} • {device.ports} портов
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      📍 {device.location}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-slate-500">
                        Отклик: {device.responseTime}
                      </span>
                      <span className="text-xs text-slate-500">
                        Uptime: {device.uptime}
                      </span>
                      <span className="text-xs text-slate-500">
                        Обновлен: {device.lastSeen}
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
                    <Icon name="Settings" className="h-4 w-4" />
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

export default NetworkDevicesList;
