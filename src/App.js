import React, { Component } from 'react';
import UserCharts from './Components/UserCharts';
import StatisticsChart from './Components/StatisticsChart';
import ActiveUsersTable from './Components/ActiveUsersTable';
import ActiveGroupTable from './Components/ActiveGroupTable';

class App extends Component {
  render() {
    return (
      <div style={{ marginLeft: "20%" }}>
        <StatisticsChart />
        <UserCharts />
        <ActiveUsersTable />
        <ActiveGroupTable />
      </div>
    );
  }
}

export default App;
