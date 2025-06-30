import NetworkDashboard from "@/components/NetworkDashboard";
import NetworkDevicesList from "@/components/NetworkDevicesList";
import NetworkTopology from "@/components/NetworkTopology";
import LogsPanel from "@/components/LogsPanel";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Index = () => {
  const [viewMode, setViewMode] = useState<"list" | "topology">("list");

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Shield" className="h-8 w-8 text-blue-400" />
            <div>
              <h1 className="text-xl font-bold text-white">Network Admin</h1>
              <p className="text-sm text-slate-400">
                Панель управления корпоративной сетью
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <Icon name="Clock" className="h-4 w-4" />
              <span>
                Последнее обновление: {new Date().toLocaleTimeString("ru-RU")}
              </span>
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
              <Icon name="User" className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-8">
        {/* Network Overview */}
        <section>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Icon name="BarChart3" className="h-5 w-5 mr-2 text-blue-400" />
            Обзор сети
          </h2>
          <NetworkDashboard />
        </section>

        {/* Network Devices Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <Icon name="Network" className="h-5 w-5 mr-2 text-green-400" />
              Сетевые устройства
            </h2>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "text-slate-400 hover:text-white"
                }
              >
                <Icon name="List" className="h-4 w-4 mr-2" />
                Список
              </Button>
              <Button
                variant={viewMode === "topology" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("topology")}
                className={
                  viewMode === "topology"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "text-slate-400 hover:text-white"
                }
              >
                <Icon name="GitBranch" className="h-4 w-4 mr-2" />
                Топология
              </Button>
            </div>
          </div>

          {viewMode === "list" ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <NetworkDevicesList />
              <section>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Icon
                    name="FileText"
                    className="h-5 w-5 mr-2 text-orange-400"
                  />
                  Системные логи
                </h3>
                <LogsPanel />
              </section>
            </div>
          ) : (
            <div className="space-y-8">
              <NetworkTopology />
              <section>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Icon
                    name="FileText"
                    className="h-5 w-5 mr-2 text-orange-400"
                  />
                  Системные логи
                </h3>
                <LogsPanel />
              </section>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Index;
