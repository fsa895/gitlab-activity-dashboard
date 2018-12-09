import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core';
import logo from './styles/images/gitlab.png';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    icon: {
        margin: theme.spacing.unit * 2,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    title: {
        fontSize: 14,
    },
    add: {
        display: 'flex',
        'justify-content': 'space-between',
    },
    card: {
        maxWidth: '20%',
        marginTop: '1%',
        marginLeft: '2%',
        marginRight: '10%',
    },
    media: {
        height: 140,
    },
    cardAction: {
        display: 'flex',
        'flex-direction': 'column',
    },
});


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }

    }

    handleClose = () => {
        this.setState({ open: false })
    }
    handleSubscribe = () => {
        this.setState({ open: false })
        console.log("url and token", this.state.url, this.state.token)
    }

    handleIconButtion = () => {
        this.setState({ open: true })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#insertion-point-jss'),
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="root">
                <AppBar position="static">
                    <Toolbar variant="dense" className={classes.add}>

                        <Typography variant="h6" color="inherit" className="header">
                            GITLAB-ACTIVITY-DASHBOARD
            </Typography>
                        <IconButton className="menuButton" color="inherit" aria-label="Menu" onClick={this.handleIconButtion}>
                            <Icon
                                className={classNames(classes.icon, 'fa fa-plus-circle')}
                                color="error"
                                fontSize="large"
                            />
                        </IconButton>
                    </Toolbar>
                </AppBar>


                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Enter the details</DialogTitle>
                    <DialogContent>
                        <TextField id="username"
                            onChange={e => this.handleChange(e)}
                            value={this.state.url}
                            label="URL"
                            type="text"
                            name="url"
                            margin="normal"
                        /> &nbsp;&nbsp;&nbsp;
                    <TextField id="password"
                            onChange={e => this.handleChange(e)}
                            value={this.state.token}
                            label="Admin Token"
                            type="password"
                            name="token"
                            margin="normal"

                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
              </Button>
                        <Button onClick={this.handleSubscribe} color="primary" id="submit">
                            Submit
              </Button>
                    </DialogActions>
                </Dialog>
                <Card className={classes.card}>
                    <CardActionArea className={classes.cardAction}>
                        <img src={logo} className={classes.media} alt="logo" />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.state.url}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
