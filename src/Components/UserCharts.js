import { Chart } from "react-google-charts";
import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
// import async from 'async';


const templateChart = ['Element', 'Density', { role: 'style' }, {
    sourceColumn: 0,
    role: 'annotation',
    type: 'string',
    calc: 'stringify'
}]

class UserCharts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: '',
            totalUsers: 0,
            activeUsers: 0,
            disabledusers: 0,
            collection: {}
        }
    }

    chartEntries = () => {
        const dt = [
            templateChart,
            ['Active Users', this.state.activeUsers, '#b87333', null],
            ['Disabled Users', this.state.disabledusers, 'silver', null],
            ['Total Users', this.state.totalUsers, 'gold', null]
        ];

        this.setState({
            data: dt
        })

    }

    componentWillMount() {
        fetch('http://172.23.239.118:5000/users').then(resp => resp.json())
            .then(resp => {
                this.setState({ collection: resp })
                console.log('These are all users', resp);
                console.log('total users: ', resp.length);
                this.setState({ totalUsers: resp.length });

                resp.map(x => {
                    if (x.state === 'active') {
                        this.setState({
                            activeUsers: this.state.activeUsers + 1
                        })
                    }
                    else this.setState({
                        disabledusers: this.state.disabledusers + 1
                    })
                })
            })
            .then(resp => {
                this.chartEntries()
            })
    }


    handleYearStatistics = () => {
        let actUsr = 0, disUsr = 0;
        this.state.collection.map((x, index, array) => {
            console.log('This is x: ', x.lastSignInAt);
            console.log('activity:', x.state);
            const x1 = x.year;
            console.log('x1:', x1);
            const x2 = (new Date()).getFullYear();
            console.log('x2:', x2);

            if (x1 == x2) {
                if (x.state == "active") actUsr += 1;
                else disUsr += 1;
            }
            if (index === (array.length - 1)) {
                this.setState({
                    activeUsers: actUsr,
                    disabledusers: disUsr,
                    totalUsers: actUsr + disUsr
                });
                this.chartEntries();
            }
        })
    }

    handleMonthStatistics = () => {
        let actUsr = 0, disUsr = 0;
        this.state.collection.map((x, index, array) => {
            console.log('activity:', x.state);
            const x1 = x.month;
            console.log('x1:', x1);
            const x2 = (new Date()).getMonth() + 1;
            console.log('x2:', x2);

            if (x1 === x2) {
                if (x.state === "active") actUsr += 1;
                else disUsr += 1;
                console.log('actUsr:', actUsr);
                console.log('disUsr:', disUsr);
            }

            if (index === (array.length - 1)) {
                this.setState({
                    activeUsers: actUsr,
                    disabledusers: disUsr,
                    totalUsers: actUsr + disUsr
                }, () => this.chartEntries());

            }
        })
    }

    render() {
        return (
            <div>
                <Chart
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={this.state.data}
                    options={{
                        title: 'Users Data',
                        width: 800,
                        height: 400,
                        bar: { groupWidth: '95%' },
                        legend: { position: 'none' },
                    }}

                />
                <div style={{ marginLeft: "22%", marginBottom: "3%" }}>
                    <Button variant="outlined" color="primary" onClick={this.handleYearStatistics} >
                        This Year
                </Button>
                    <Button variant="outlined" color="primary" onClick={this.handleMonthStatistics}>
                        This Month
                </Button>
                </div>
                <Divider style={{ marginRight: "30%" }} />
            </div>
        );
    }

}

export default UserCharts;