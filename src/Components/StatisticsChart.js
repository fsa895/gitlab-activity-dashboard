import { Chart } from "react-google-charts";
import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import async from 'async';


const templateChart = ['Element', 'Density', { role: 'style' }, {
    sourceColumn: 0,
    role: 'annotation',
    type: 'string',
    calc: 'stringify'
}]

class StatisticsChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            projectsCount: 0,
            usersCount: 0,
            groupsCount: 0,
            pipelinesCount: 0,
            issuesCount: 0,
            mergesCount: 0,
            runnersCount: 0,
            sshCount: 0,
            collectionProjects: {},
            collectionUsers: {},
            collectionGroups: {},
            collectionPipelines: {},
            collectionIssues: {},
            collectionMerges: {},
            collectionRunners: {},
            collectionSsh: {}
        }
    }

    handleYear = () => {
        let projects = 0, users = 0, merges = 0, issues = 0, ssh = 0;
        this.state.collectionProjects.map((x, index, array) => {
            const x1 = x.year;
            const x2 = (new Date()).getFullYear();
            if (x1 == x2) {
                projects += 1;
            }
            if (index === (array.length - 1)) {
                this.setState({
                    projectsCount: projects
                }, () => { this.chartsEntries() });

            }
        })
        this.state.collectionUsers.map((x, index, array) => {
            const x1 = x.year;
            const x2 = (new Date()).getFullYear();
            if (x1 == x2) {
                users += 1;
            }
            if (index === (array.length - 1)) {
                this.setState({
                    usersCount: users
                }, () => { this.chartsEntries() });
            }
        })
        this.state.collectionMerges.map((x, index, array) => {
            const x1 = x.year;
            const x2 = (new Date()).getFullYear();
            if (x1 == x2) {
                merges += 1;
            }
            if (index === (array.length - 1)) {
                this.setState({
                    mergesCount: merges
                }, () => { this.chartsEntries() });
            }
        })
        this.state.collectionIssues.map((x, index, array) => {
            const x1 = x.year;
            const x2 = (new Date()).getFullYear();
            if (x1 == x2) {
                issues += 1;
            }
            if (index === (array.length - 1)) {
                this.setState({
                    issuesCount: issues
                }, () => { this.chartsEntries() });
            }
        })
        this.state.collectionSsh.map((x, index, array) => {
            const x1 = x.year;
            const x2 = (new Date()).getFullYear();
            if (x1 == x2) {
                ssh += 1;
            }
            if (index === (array.length - 1)) {
                this.setState({
                    sshCount: ssh
                }, () => { this.chartsEntries() });
            }
        })
    }

    handleMonth = () => {
        let projects = 0, users = 0, merges = 0, issues = 0, ssh = 0;
        this.state.collectionProjects.map((x, index, array) => {
            const x1 = x.month;
            const x2 = (new Date()).getMonth() + 1;

            if (x1 == x2) {
                projects += 1;
            }
            if (index === (array.length - 1)) {
                this.setState({
                    projectsCount: projects
                }, () => { this.chartsEntries() });

            }
        })

        this.state.collectionUsers.map((x, index, array) => {
            const x1 = x.month;
            const x2 = (new Date()).getMonth() + 1;

            if (x1 == x2) {
                users += 1;
            }
            if (index === (array.length - 1)) {
                this.setState({
                    usersCount: users
                }, () => { this.chartsEntries() });

            }
        })

        this.state.collectionIssues.map((x, index, array) => {
            const x1 = x.month;
            const x2 = (new Date()).getMonth() + 1;

            if (x1 == x2) {
                issues += 1;
            }
            if (index === (array.length - 1)) {
                this.setState({
                    issuesCount: issues
                }, () => { this.chartsEntries() });

            }
        })


        this.state.collectionSsh.map((x, index, array) => {
            const x1 = x.month;
            const x2 = (new Date()).getMonth() + 1;

            if (x1 == x2) {
                ssh += 1;
            }
            if (index === (array.length - 1)) {
                this.setState({
                    sshCount: ssh
                }, () => { this.chartsEntries() });

            }
        })


        this.state.collectionMerges.map((x, index, array) => {
            const x1 = x.month;
            const x2 = (new Date()).getMonth() + 1;

            if (x1 == x2) {
                merges += 1;
            }
            if (index === (array.length - 1)) {
                this.setState({
                    mergesCount: merges
                }, () => { this.chartsEntries() });

            }
        })
    }

    chartsEntries = () => {
        const dt =
            [templateChart,
                ['Groups', this.state.groupsCount, '#1AC8ED', null],
                ['Issues', this.state.issuesCount, '#AF7595', null],
                ['Users', this.state.usersCount, '#8C2155', null],
                ['Merge', this.state.mergesCount, '#5C1A1B', null],
                ['Pipelines', this.state.pipelinesCount, '#91C499', null],
                ['Runners', this.state.runnersCount, 'yellow', null],
                ['SSH', this.state.sshCount, 'green', null],
                ['Projects', this.state.projectsCount, '#AED4E6', null],
            ];

        this.setState({
            data: dt
        })
    }



    componentWillMount() {
        async.parallel([
            (callback) => {
                fetch(`http://172.23.239.118:5000/projects`).then(resp => resp.json())
                    .then(resp => {
                        this.setState({ collectionProjects: resp })
                        console.log("projects:", resp.length)
                        if (!resp.length) {
                            console.log('inside if projects')
                            this.setState({ projectsCount: 0 })
                        } else {
                            console.log('else condn', resp.length);
                            this.setState({ projectsCount: resp.length })
                        }
                        console.log("project length: ", resp.length);
                        callback(null, 'Project fetch successfull')
                    })
                    .catch(err => callback(err))
            },
            (callback) => {
                fetch(`http://172.23.239.118:5000/users`).then(resp => resp.json())
                    .then(resp => {
                        this.setState({ collectionUsers: resp })
                        if (!resp.length) {
                            this.setState({ usersCount: 0 })
                        }
                        else {
                            this.setState({ usersCount: resp.length })
                        }
                        console.log("users length: ", resp.length);
                        callback(null, 'Users fetch successfull')
                    })
                    .catch(err => callback(err))
            },
            (callback) => {
                fetch(`http://172.23.239.118:5000/groups`).then(resp => resp.json())
                    .then(resp => {
                        this.setState({ collectionGroups: resp })
                        if (!resp.length) this.setState({ groupsCount: 0 })
                        else this.setState({ groupsCount: resp.length })
                        console.log("groups length: ", resp.length);
                        callback(null, 'Groups fetch successfull')
                    })
                    .catch(err => callback(err))
            },
            (callback) => {
                fetch(`http://172.23.239.118:5000/pipelines`).then(resp => resp.json())
                    .then(resp => {
                        this.setState({ collectionPipelines: resp })
                        if (!resp.length) this.setState({ pipelinesCount: 0 })
                        else this.setState({ pipelinesCount: resp.length })
                        console.log("pipelines length: ", resp.length);
                        callback(null, 'pipelines fetch successfull')
                    })
                    .catch(err => callback(err))
            },
            (callback) => {
                fetch(`http://172.23.239.118:5000/issues`).then(resp => resp.json())
                    .then(resp => {
                        this.setState({ collectionIssues: resp })
                        if (!resp.length) this.setState({ issuesCount: 0 })
                        else this.setState({ issuesCount: resp.length })
                        console.log("issues length: ", resp.length);
                        callback(null, 'issues fetch successfull')
                    })
                    .catch(err => callback(err))
            },
            (callback) => {
                fetch(`http://172.23.239.118:5000/merges`).then(resp => resp.json())
                    .then(resp => {
                        this.setState({ collectionMerges: resp })
                        if (!resp.length) this.setState({ mergesCount: 0 })
                        else this.setState({ mergesCount: resp.length })
                        console.log("merges length: ", resp.length);
                        callback(null, 'merges fetch successfull')
                    })
                    .catch(err => callback(err))
            },
            (callback) => {
                fetch(`http://172.23.239.118:5000/runners`).then(resp => resp.json())
                    .then(resp => {
                        this.setState({ collectionRunners: resp })
                        if (!resp.length) this.setState({ runnersCount: 0 })
                        else this.setState({ runnersCount: resp.length })
                        console.log("runners length: ", resp.length);
                        callback(null, 'runners fetch successfull')
                    })
                    .catch(err => callback(err))
            },
            (callback) => {
                fetch(`http://172.23.239.118:5000/ssh`).then(resp => resp.json())
                    .then(resp => {
                        this.setState({ collectionSsh: resp })
                        if (!resp.length) this.setState({ sshCount: 0 })
                        else this.setState({ sshCount: resp.length })
                        console.log("ssh length: ", resp.length);
                        callback(null, 'ssh fetch successfull')
                    })
                    .catch(err => callback(err))
            }

        ], (err, result) => {
            if (err) { console.log('ERROR while fetch', err) }
            else this.chartsEntries();
            // console.log(result);
        });


    }

    render() {
        return (
            <div >
                <Chart
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={this.state.data}
                    options={{
                        title: 'Statistics',
                        width: 800,
                        height: 400,
                        bar: { groupWidth: '95%' },
                        legend: { position: 'none' },
                    }}
                />
                <div style={{ marginLeft: "22%", marginBottom: "3%" }}>
                    <Button variant="outlined" color="primary" onClick={this.handleYear}>
                        This Year
                    </Button>
                    <Button variant="outlined" color="primary" onClick={this.handleMonth}>
                        This Month
                    </Button>
                </div>
                <Divider style={{ marginRight: "30%" }} />
            </div>
        );
    }
}

export default StatisticsChart; 