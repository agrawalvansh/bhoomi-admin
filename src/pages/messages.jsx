import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, FiUsers, FiBox, FiShoppingBag, FiMessageSquare, FiBarChart2, FiMail, FiTool,
  FiInbox, FiStar, FiAlertCircle, FiMessageCircle, FiSettings, FiEdit, FiChevronRight,
  FiSearch, FiFilter, FiPlusCircle
} from 'react-icons/fi';

const MessagesPage = () => {
  const colors = {
    primary: '#2D3B2D',
    secondary: '#D4B982',
    tertiary: '#4A6741',
    background: '#F9F6F0',
    accent: '#A8C69F',
    deep: '#1B4D3E',
    highlight: '#F3E5AB'
  };

  const navItems = [
    { to: '/home', icon: <FiHome />, label: 'Dashboard' },
    { to: '/admin/users', icon: <FiUsers />, label: 'Users' },
    { to: '/admin/products', icon: <FiBox />, label: 'Products' },
    { to: '/admin/orders', icon: <FiShoppingBag />, label: 'Orders' },
    { to: '/admin/community', icon: <FiMessageSquare />, label: 'Community' },
    { to: '/admin/analytics', icon: <FiBarChart2 />, label: 'Analytics' },
    { to: '/admin/messages', icon: <FiMail />, label: 'Messages' },
    { to: '/admin/settings', icon: <FiTool />, label: 'Settings' },
    { to: '/admin/team', icon: <FiUsers />, label: 'Team Management' },
    { to: '/admin/supplies', icon: <FiTool />, label: 'Supplies' }
  ];


  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Sample messages data
  const messages = [
    {
      id: 1,
      category: 'inquiry',
      subject: 'Plant Care Question',
      sender: 'John Doe',
      preview: 'I need help with my indoor plants...',
      time: '10:30 AM',
      unread: true
    },
    {
      id: 2,
      category: 'maintenance',
      subject: 'Garden Maintenance Request',
      sender: 'Sarah Smith',
      preview: 'Requesting monthly maintenance service...',
      time: '9:15 AM',
      unread: false
    },
    {
      id: 3,
      category: 'emergency',
      subject: 'Urgent: Plant Disease',
      sender: 'Mike Johnson',
      preview: 'My plants are showing signs of disease...',
      time: 'Yesterday',
      unread: true
    }
  ];

  // Sample templates
  const templates = [
    { id: 1, name: 'Welcome Message', category: 'General' },
    { id: 2, name: 'Maintenance Confirmation', category: 'Maintenance' },
    { id: 3, name: 'Emergency Response', category: 'Emergency' }
  ];

  const location = useLocation();

  // NavItem component renders each individual link with an active style.
  const NavItem = ({ to, icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <motion.li
        whileHover={{ x: 5 }}
        className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
          isActive ? 'bg-white shadow' : 'hover:bg-white/50'
        }`}
      >
        <Link to={to} className="flex items-center w-full">
          <span className="mr-3" style={{ color: isActive ? colors.tertiary : colors.primary }}>
            {icon}
          </span>
          <span className={`font-medium ${isActive ? 'text-gray-800' : 'text-gray-600'}`}>
            {label}
          </span>
        </Link>
      </motion.li>
    );
  };


  return (
    <div className="min-h-screen">
      <div className="flex" style={{ backgroundColor: colors.background }}>
        {/* Sidebar Navigation */}
        <motion.nav 
      className="w-64 p-6 border-r-2 overflow-y-auto h-screen sticky top-0"
      style={{ backgroundColor: colors.background, borderColor: colors.accent }}
      initial={{ x: -20 }}
      animate={{ x: 0 }}
    >
      <div className="mb-8">
      </div>
      <ul className="space-y-3">
        {navItems.map((item, index) => (
          <NavItem key={index} to={item.to} icon={item.icon} label={item.label} />
        ))}

      </ul>
    </motion.nav>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Message Categories and List */}
          <div className="w-80 border-r" style={{ borderColor: colors.accent }}>
            {/* Search Bar */}
            <div className="p-4 border-b" style={{ borderColor: colors.accent }}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full p-2 pl-8 border rounded"
                  style={{ borderColor: colors.accent }}
                />
                <FiSearch className="absolute left-2 top-3" style={{ color: colors.tertiary }} />
              </div>
            </div>

            {/* Message Categories */}
            <div className="p-4">
              <h3 className="font-medium mb-2" style={{ color: colors.deep }}>Categories</h3>
              <ul className="space-y-2">
                <li 
                  className={`flex items-center p-2 rounded cursor-pointer ${
                    selectedCategory === 'all' ? 'bg-opacity-10' : ''
                  }`}
                  style={{ 
                    backgroundColor: selectedCategory === 'all' ? colors.accent : 'transparent',
                    color: colors.primary 
                  }}
                  onClick={() => setSelectedCategory('all')}
                >
                  <FiInbox className="mr-2" />
                  <span>All Messages</span>
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>
                </li>
                {['General Inquiries', 'Maintenance Requests', 'Emergency Support', 'Feedback'].map((category, index) => (
                  <li
                    key={index}
                    className={`flex items-center p-2 rounded cursor-pointer ${
                      selectedCategory === category ? 'bg-opacity-10' : ''
                    }`}
                    style={{ 
                      backgroundColor: selectedCategory === category ? colors.accent : 'transparent',
                      color: colors.primary 
                    }}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <FiMessageCircle className="mr-2" />
                    <span>{category}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Message List */}
            <div className="border-t" style={{ borderColor: colors.accent }}>
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    message.unread ? 'font-semibold' : ''
                  }`}
                  style={{ borderColor: colors.accent }}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex justify-between mb-1">
                    <span style={{ color: colors.deep }}>{message.subject}</span>
                    <span className="text-sm" style={{ color: colors.tertiary }}>{message.time}</span>
                  </div>
                  <div className="text-sm" style={{ color: colors.tertiary }}>
                    {message.sender} - {message.preview}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Message Content and Tools */}
          <div className="flex-1 flex flex-col">
            {/* Message Toolbar */}
            <div className="p-4 border-b flex justify-between items-center" style={{ borderColor: colors.accent }}>
              <div className="flex space-x-4">
                <button className="p-2 rounded hover:bg-gray-100">
                  <FiFilter style={{ color: colors.tertiary }} />
                </button>
                <button className="p-2 rounded hover:bg-gray-100">
                  <FiStar style={{ color: colors.tertiary }} />
                </button>
              </div>
              <div className="flex space-x-4">
                <button 
                  className="px-4 py-2 rounded text-white"
                  style={{ backgroundColor: colors.deep }}
                >
                  New Template
                </button>
                <button 
                  className="px-4 py-2 rounded text-white"
                  style={{ backgroundColor: colors.tertiary }}
                >
                  Compose
                </button>
              </div>
            </div>

            {/* Message Content */}
            <div className="flex-1 p-6">
              {selectedMessage ? (
                <div>
                  <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.deep }}>
                    {selectedMessage.subject}
                  </h2>
                  <div className="mb-4">
                    <span className="font-medium" style={{ color: colors.deep }}>From: </span>
                    <span style={{ color: colors.tertiary }}>{selectedMessage.sender}</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg border" style={{ borderColor: colors.accent }}>
                    {selectedMessage.preview}
                  </div>
                </div>
              ) : (
                <div className="text-center mt-20" style={{ color: colors.tertiary }}>
                  Select a message to view its content
                </div>
              )}
            </div>

            {/* Quick Response Templates */}
            <div className="p-4 border-t" style={{ borderColor: colors.accent }}>
              <h3 className="font-medium mb-2" style={{ color: colors.deep }}>Quick Response Templates</h3>
              <div className="flex space-x-4 overflow-x-auto">
                {templates.map(template => (
                  <button
                    key={template.id}
                    className="px-4 py-2 rounded whitespace-nowrap"
                    style={{ backgroundColor: colors.background, color: colors.deep }}
                  >
                    {template.name}
                  </button>
                ))}
                <button
                  className="px-4 py-2 rounded flex items-center"
                  style={{ backgroundColor: colors.background, color: colors.tertiary }}
                >
                  <FiPlusCircle className="mr-2" />
                  Add Template
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;