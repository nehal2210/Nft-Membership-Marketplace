import React from "react";
import { Tabs } from 'antd';
import UserDashboard from "./user-dashboard";
import ProviderDashboard from "./provider-dashboard";
import '../../App.css'

const items = [
  {
    key: 'User',
    label: `User`,
    children: <UserDashboard />,
  },
  {
    key: 'Provider',
    label: `Provider`,
    children: <ProviderDashboard />,
  }
];
const DashBoard = () => {
  return (
    <div className="pl-5 pr-5">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  )
}
export default DashBoard;