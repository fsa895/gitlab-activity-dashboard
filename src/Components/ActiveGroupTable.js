import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

// let id = 0;
// function createData(name, calories, fat, carbs, protein) {
//     id += 1;
//     return { id, name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

class ActiveGroupTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    createData = (name, calories, fat, carbs, protein) => {
        let x = { name, calories, fat, carbs, protein };
        let new_array = this.state.data;
        new_array.push(x);
        this.setState({
            data: new_array
        })
    }

    componentWillMount() {
        this.createData('Frozen yoghurt', 159, 6.0, 24, 4.0);
        this.createData('Ice cream sandwich', 237, 9.0, 37, 4.3);
        this.createData('Eclair', 262, 16.0, 24, 6.0);
        this.createData('Cupcake', 305, 3.7, 67, 4.3);
        this.createData('Gingerbread', 356, 16.0, 49, 3.9);
    }

    render() {
        return (
            <div style={{ marginTop: "5%" }}>
                <Typography variant="h6" id="tableTitle">
                    Highly Active Groups
                </Typography>
                <Table style={{ width: "70%" }}>
                    <TableHead>
                        <TableRow>
                            <TableCell >UserName</TableCell>
                            <TableCell numeric>Forks</TableCell>
                            <TableCell numeric>Merge</TableCell>
                            <TableCell numeric>Pipeline</TableCell>
                            <TableCell numeric>Issues Closed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.data.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell numeric>{row.calories}</TableCell>
                                    <TableCell numeric>{row.fat}</TableCell>
                                    <TableCell numeric>{row.carbs}</TableCell>
                                    <TableCell numeric>{row.protein}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default ActiveGroupTable;