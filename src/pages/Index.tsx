import NetworkDashboard from "@/components/NetworkDashboard";
import HostsList from "@/components/HostsList";
import LogsPanel from "@/components/LogsPanel";
import Icon from "@/components/ui/icon";

const Index = () => {
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

        {/* Hosts and Logs Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <section>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Icon name="Server" className="h-5 w-5 mr-2 text-green-400" />
              Управление хостами
            </h2>
            <HostsList />
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Icon name="FileText" className="h-5 w-5 mr-2 text-orange-400" />
              Системные логи
            </h2>
            <LogsPanel />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
