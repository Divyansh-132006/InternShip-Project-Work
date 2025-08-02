import React, { useState, useEffect } from 'react';
import {
  Target,
  Users,
  TrendingUp,

  Bell,
  Search,
  User,

  LogOut,
  DollarSign,
  Award,
  Clock,

  MessageSquare,
  FileText,
  BarChart3,
  Plus,
  Filter
} from 'lucide-react';

const App = () => {
  const [currentView, setCurrentView] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });


  const campaigns = [
    { id: 1, title: 'Clean Water Initiative', raised: 15420, goal: 25000, donors: 156, status: 'active', progress: 62 },
    { id: 2, title: 'Education for All', raised: 8750, goal: 15000, donors: 89, status: 'active', progress: 58 },
    { id: 3, title: 'Healthcare Support', raised: 22100, goal: 30000, donors: 234, status: 'active', progress: 74 },
    { id: 4, title: 'Youth Development', raised: 5000, goal: 10000, donors: 45, status: 'draft', progress: 50 }
  ];

  const tasks = [
    { id: 1, title: 'Review campaign proposals', priority: 'high', dueDate: '2025-08-03', completed: false },
    { id: 2, title: 'Update donor database', priority: 'medium', dueDate: '2025-08-05', completed: false },
    { id: 3, title: 'Prepare weekly report', priority: 'high', dueDate: '2025-08-04', completed: true },
    { id: 4, title: 'Social media content planning', priority: 'low', dueDate: '2025-08-07', completed: false }
  ];

  const notifications = [
    { id: 1, message: 'New donation of $500 received for Clean Water Initiative', time: '2 hours ago', type: 'success' },
    { id: 2, message: 'Campaign review meeting scheduled for tomorrow', time: '4 hours ago', type: 'info' },
    { id: 3, message: 'Monthly target achieved for Healthcare Support', time: '1 day ago', type: 'success' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setCurrentView('dashboard');
  };

  const handleSignUp = () => {
    setCurrentView('dashboard');
  };

  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform hover:scale-105 transition-transform duration-300">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-4 shadow-lg">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">FundRaise</h1>
          <p className="text-gray-600">Intern Fundraising Platform</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">Welcome Back</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Sign In
          </button>
        </div>

        <div className="mt-6 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <button
            onClick={handleSignUp}
            className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-colors duration-300"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );

  const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [showNotifications, setShowNotifications] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
      fetch("https://internrepo.onrender.com/api/dashboard")
        .then((res) => res.json())
        .then((data) => setUserData(data))
        .catch((err) => console.error("Error fetching dashboard data", err));
    }, []);


    const StatCard = ({ icon: Icon, title, value, change, color }) => (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <span className="text-green-500 text-sm font-semibold flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            {change}
          </span>
        </div>
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    );

    const CampaignCard = ({ campaign }) => (
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-gray-800">{campaign.title}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
            {campaign.status}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{campaign.progress}%</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${campaign.progress}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <div>
              <span className="font-semibold text-gray-800">${campaign.raised.toLocaleString()}</span>
              <span className="text-gray-600"> of ${campaign.goal.toLocaleString()}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-1" />
              {campaign.donors}
            </div>
          </div>
        </div>
      </div>
    );

    const TaskItem = ({ task }) => (
      <div className={`flex items-center p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
        }`}>
        <input
          type="checkbox"
          checked={task.completed}
          className="mr-3 w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
          readOnly
        />
        <div className="flex-1">
          <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {task.title}
          </h4>
          <div className="flex items-center mt-1 text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>{task.dueDate}</span>
            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${task.priority === 'high' ? 'bg-red-100 text-red-800' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
              }`}>
              {task.priority}
            </span>
          </div>
        </div>
      </div>
    );

    return (
      <div className="min-h-screen bg-gray-50">

        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="flex items-center">
                  <Target className="w-8 h-8 text-red-500 mr-3" />
                  <h1 className="text-xl font-bold text-gray-800">FundRaise</h1>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="search"
                    placeholder="Search campaigns..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64"
                  />
                </div>

                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">
                    {userData ? userData.name : "Loading..."}
                  </span>

                </div>

                <button
                  onClick={() => setCurrentView('login')}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>


          {showNotifications && (
            <div className="absolute right-4 top-16 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map(notification => (
                  <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                    <p className="text-sm text-gray-800">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </header>


        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <div className="mb-8">
            <nav className="flex space-x-8 border-b border-gray-200">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'campaigns', label: 'Campaigns', icon: Target },
                { id: 'tasks', label: 'Tasks', icon: FileText },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-2 border-b-2 font-medium text-sm transition-colors duration-300 ${activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>


          {activeTab === 'overview' && (
            <div className="space-y-8">

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  icon={DollarSign}
                  title="Total Raised"
                  value={userData ? `$${userData.donationsRaised.toLocaleString()}` : "$0"}
                  change="+12.5%"
                  color="bg-gradient-to-r from-green-500 to-green-600"
                />

                <StatCard
                  icon={Users}
                  title="Total Donors"
                  value="524"
                  change="+8.2%"
                  color="bg-gradient-to-r from-blue-500 to-blue-600"
                />
                <StatCard
                  icon={Target}
                  title="Active Campaigns"
                  value="3"
                  change="+1"
                  color="bg-gradient-to-r from-purple-500 to-purple-600"
                />
                <StatCard
                  icon={Award}
                  title="Success Rate"
                  value="94%"
                  change="+2.1%"
                  color="bg-gradient-to-r from-orange-500 to-orange-600"
                />
              </div>


              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="flex items-center p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg hover:from-indigo-100 hover:to-purple-100 transition-all duration-300">
                    <Plus className="w-5 h-5 text-indigo-600 mr-3" />
                    <span className="font-medium text-gray-800">Create Campaign</span>
                  </button>
                  <button className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-all duration-300">
                    <FileText className="w-5 h-5 text-green-600 mr-3" />
                    <span className="font-medium text-gray-800">Generate Report</span>
                  </button>
                  <button className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg hover:from-orange-100 hover:to-red-100 transition-all duration-300">
                    <MessageSquare className="w-5 h-5 text-orange-600 mr-3" />
                    <span className="font-medium text-gray-800">Contact Donors</span>
                  </button>
                </div>
              </div>


              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {notifications.slice(0, 3).map(notification => (
                    <div key={notification.id} className="flex items-start p-4 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                      <div className="flex-1">
                        <p className="text-gray-800">{notification.message}</p>
                        <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}


          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Campaigns</h2>
                <div className="flex space-x-3">
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                  <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                    <Plus className="w-4 h-4 mr-2" />
                    New Campaign
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map(campaign => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            </div>
          )}


          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
                <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="space-y-4">
                  {tasks.map(task => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </div>
              </div>
            </div>
          )}


          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Analytics</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Donation Trends</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Chart visualization would go here</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Campaign Performance</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Performance metrics would go here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  };

  return currentView === 'login' ? <LoginPage /> : <Dashboard />;
};

export default App;
