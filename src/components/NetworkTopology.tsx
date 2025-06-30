import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";

interface NetworkDevice {
  id: string;
  name: string;
  ip: string;
  status: "online" | "offline" | "warning";
  manufacturer: "cisco" | "d-link" | "snr";
  ports: number;
  location: string;
  x: number;
  y: number;
  connections: string[];
}

const NetworkTopology = () => {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const devices: NetworkDevice[] = [
    {
      id: "1",
      name: "SW-CORE-01",
      ip: "192.168.1.1",
      status: "online",
      manufacturer: "cisco",
      ports: 24,
      location: "Серверная комн. 1",
      x: 400,
      y: 150,
      connections: ["2", "3", "4"],
    },
    {
      id: "2",
      name: "SW-EDGE-02",
      ip: "192.168.1.10",
      status: "online",
      manufacturer: "d-link",
      ports: 24,
      location: "Офис 2 этаж",
      x: 200,
      y: 300,
      connections: ["1", "5"],
    },
    {
      id: "3",
      name: "SW-ACCESS-03",
      ip: "192.168.1.15",
      status: "warning",
      manufacturer: "snr",
      ports: 24,
      location: "Склад",
      x: 600,
      y: 300,
      connections: ["1", "6"],
    },
    {
      id: "4",
      name: "SW-CORE-02",
      ip: "192.168.1.2",
      status: "offline",
      manufacturer: "cisco",
      ports: 48,
      location: "Серверная комн. 2",
      x: 400,
      y: 450,
      connections: ["1"],
    },
    {
      id: "5",
      name: "SW-WIFI-01",
      ip: "192.168.1.20",
      status: "online",
      manufacturer: "d-link",
      ports: 10,
      location: "Приемная",
      x: 100,
      y: 450,
      connections: ["2"],
    },
    {
      id: "6",
      name: "SW-LAB-01",
      ip: "192.168.1.30",
      status: "online",
      manufacturer: "snr",
      ports: 24,
      location: "Лаборатория",
      x: 700,
      y: 450,
      connections: ["3"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "#10b981";
      case "warning":
        return "#f59e0b";
      case "offline":
        return "#ef4444";
      default:
        return "#64748b";
    }
  };

  const getManufacturerColor = (manufacturer: string) => {
    switch (manufacturer) {
      case "cisco":
        return "#3b82f6";
      case "d-link":
        return "#10b981";
      case "snr":
        return "#f97316";
      default:
        return "#64748b";
    }
  };

  const getConnectionStatus = (deviceId: string, connectedDeviceId: string) => {
    const device = devices.find((d) => d.id === deviceId);
    const connectedDevice = devices.find((d) => d.id === connectedDeviceId);

    if (!device || !connectedDevice) return "offline";
    if (device.status === "offline" || connectedDevice.status === "offline")
      return "offline";
    if (device.status === "warning" || connectedDevice.status === "warning")
      return "warning";
    return "online";
  };

  const getConnectionColor = (status: string) => {
    switch (status) {
      case "online":
        return "#10b981";
      case "warning":
        return "#f59e0b";
      case "offline":
        return "#ef4444";
      default:
        return "#64748b";
    }
  };

  const renderConnections = () => {
    const connections: JSX.Element[] = [];
    const processedConnections = new Set<string>();

    devices.forEach((device) => {
      device.connections.forEach((connectedId) => {
        const connectionKey = [device.id, connectedId].sort().join("-");
        if (processedConnections.has(connectionKey)) return;
        processedConnections.add(connectionKey);

        const connectedDevice = devices.find((d) => d.id === connectedId);
        if (!connectedDevice) return;

        const status = getConnectionStatus(device.id, connectedId);
        const color = getConnectionColor(status);

        connections.push(
          <line
            key={connectionKey}
            x1={device.x}
            y1={device.y}
            x2={connectedDevice.x}
            y2={connectedDevice.y}
            stroke={color}
            strokeWidth={status === "offline" ? 1 : 2}
            strokeDasharray={status === "offline" ? "5,5" : "none"}
            opacity={status === "offline" ? 0.5 : 0.8}
          />,
        );
      });
    });

    return connections;
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-slate-200">
          Топология сети
        </CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white"
          >
            <Icon name="ZoomIn" className="h-4 w-4 mr-2" />
            Увеличить
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white"
          >
            <Icon name="RotateCcw" className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative bg-slate-900 rounded-lg p-4 min-h-[500px] overflow-hidden">
          <svg width="100%" height="500" className="absolute inset-0">
            {renderConnections()}

            {devices.map((device) => (
              <g key={device.id}>
                <circle
                  cx={device.x}
                  cy={device.y}
                  r="30"
                  fill={getManufacturerColor(device.manufacturer)}
                  stroke={getStatusColor(device.status)}
                  strokeWidth="3"
                  className="cursor-pointer transition-all duration-200 hover:r-35"
                  onClick={() =>
                    setSelectedDevice(
                      selectedDevice === device.id ? null : device.id,
                    )
                  }
                />
                <text
                  x={device.x}
                  y={device.y + 5}
                  textAnchor="middle"
                  className="fill-white text-xs font-medium pointer-events-none"
                >
                  {device.manufacturer === "cisco"
                    ? "🔷"
                    : device.manufacturer === "d-link"
                      ? "🟢"
                      : "🟠"}
                </text>
                <text
                  x={device.x}
                  y={device.y + 50}
                  textAnchor="middle"
                  className="fill-slate-300 text-xs font-medium pointer-events-none"
                >
                  {device.name}
                </text>
              </g>
            ))}
          </svg>

          {/* Device Info Panel */}
          {selectedDevice && (
            <div className="absolute top-4 right-4 w-72 bg-slate-800 border border-slate-600 rounded-lg p-4 shadow-xl">
              {(() => {
                const device = devices.find((d) => d.id === selectedDevice);
                if (!device) return null;

                return (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-white">{device.name}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedDevice(null)}
                        className="text-slate-400 hover:text-white h-6 w-6 p-0"
                      >
                        <Icon name="X" className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">IP:</span>
                        <span className="text-white">{device.ip}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Производитель:</span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            device.manufacturer === "cisco"
                              ? "text-blue-400 border-blue-400"
                              : device.manufacturer === "d-link"
                                ? "text-green-400 border-green-400"
                                : "text-orange-400 border-orange-400"
                          }`}
                        >
                          {device.manufacturer.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Портов:</span>
                        <span className="text-white">{device.ports}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Местоположение:</span>
                        <span className="text-white text-xs">
                          {device.location}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Статус:</span>
                        <Badge
                          className={
                            device.status === "online"
                              ? "bg-green-500/20 text-green-400"
                              : device.status === "warning"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                          }
                        >
                          {device.status === "online"
                            ? "Онлайн"
                            : device.status === "warning"
                              ? "Предупреждение"
                              : "Офлайн"}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-600">
                      <h4 className="text-xs font-medium text-slate-300 mb-2">
                        Подключения:
                      </h4>
                      <div className="space-y-1">
                        {device.connections.map((connId) => {
                          const connectedDevice = devices.find(
                            (d) => d.id === connId,
                          );
                          if (!connectedDevice) return null;
                          const status = getConnectionStatus(device.id, connId);

                          return (
                            <div
                              key={connId}
                              className="flex items-center justify-between text-xs"
                            >
                              <span className="text-slate-400">
                                {connectedDevice.name}
                              </span>
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  status === "online"
                                    ? "bg-green-400"
                                    : status === "warning"
                                      ? "bg-yellow-400"
                                      : "bg-red-400"
                                }`}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-slate-800 border border-slate-600 rounded-lg p-3 text-xs">
            <h4 className="font-medium text-slate-200 mb-2">Легенда:</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                <span className="text-slate-300">Cisco</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-slate-300">D-Link</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                <span className="text-slate-300">SNR</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkTopology;
