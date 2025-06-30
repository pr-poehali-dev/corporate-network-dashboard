import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface LogEntry {
  id: string;
  timestamp: string;
  host: string;
  level: "info" | "warning" | "error" | "success";
  message: string;
  source: string;
}

const LogsPanel = () => {
  const logs: LogEntry[] = [
    {
      id: "1",
      timestamp: "14:23:15",
      host: "web-server-01",
      level: "info",
      message: "HTTP запрос обработан успешно",
      source: "nginx",
    },
    {
      id: "2",
      timestamp: "14:22:48",
      host: "db-server-01",
      level: "success",
      message: "Резервное копирование выполнено",
      source: "postgresql",
    },
    {
      id: "3",
      timestamp: "14:21:32",
      host: "mail-server",
      level: "warning",
      message: "Высокое использование ЦП: 85%",
      source: "system",
    },
    {
      id: "4",
      timestamp: "14:20:15",
      host: "backup-server",
      level: "error",
      message: "Соединение потеряно - таймаут",
      source: "network",
    },
    {
      id: "5",
      timestamp: "14:19:43",
      host: "file-server",
      level: "info",
      message: "Место на диске: 78% заполнено",
      source: "storage",
    },
    {
      id: "6",
      timestamp: "14:18:29",
      host: "web-server-01",
      level: "warning",
      message: "Медленный SQL запрос: 2.3s",
      source: "application",
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case "success":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "info":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "warning":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "success":
        return "CheckCircle2";
      case "info":
        return "Info";
      case "warning":
        return "AlertTriangle";
      case "error":
        return "XCircle";
      default:
        return "Circle";
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case "success":
        return "Успех";
      case "info":
        return "Инфо";
      case "warning":
        return "Предуп.";
      case "error":
        return "Ошибка";
      default:
        return level;
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-slate-200">
          Последние логи
        </CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white"
          >
            <Icon name="Filter" className="h-4 w-4 mr-2" />
            Фильтр
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white"
          >
            <Icon name="RefreshCw" className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-start space-x-3 p-3 rounded-lg bg-slate-900/30 border border-slate-700/50 hover:border-slate-600/50 transition-colors"
            >
              <Icon
                name={getLevelIcon(log.level)}
                className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                  log.level === "success"
                    ? "text-green-400"
                    : log.level === "info"
                      ? "text-blue-400"
                      : log.level === "warning"
                        ? "text-yellow-400"
                        : log.level === "error"
                          ? "text-red-400"
                          : "text-slate-400"
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-mono text-slate-400">
                    {log.timestamp}
                  </span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getLevelColor(log.level)}`}
                  >
                    {getLevelText(log.level)}
                  </Badge>
                  <span className="text-xs text-slate-500">{log.host}</span>
                  <span className="text-xs text-slate-600">•</span>
                  <span className="text-xs text-slate-500">{log.source}</span>
                </div>
                <p className="text-sm text-slate-200 break-words">
                  {log.message}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-700">
          <Button
            variant="ghost"
            className="w-full text-slate-400 hover:text-white"
          >
            <Icon name="ChevronDown" className="h-4 w-4 mr-2" />
            Показать больше логов
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogsPanel;
