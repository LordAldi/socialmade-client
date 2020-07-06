import React, { Component, Fragment} from 'react'
import {Link} from 'react-router-dom'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

// MUI STUFF
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

import MyButton from '../util/MyButton'


//icon
import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
import Notifications from '@material-ui/icons/Notifications'
export class Navbar extends Component {
    render() {
        const {authenticated} = this.props
        return (
            <AppBar>
                <Toolbar className='nav-container'>
                    {authenticated ? (
                        <Fragment>
                            <MyButton tip='Post a Scream'>
                                <AddIcon/>
                            </MyButton>
                            <Link to='/'>
                                <MyButton tip='home'>
                                    <HomeIcon/>
                                </MyButton>
                            </Link>
                            <MyButton tip='Notification'>
                                <Notifications/>
                            </MyButton>
                        </Fragment>
                    ):(
                        <Fragment>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/">Home</Button>
                            <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>        
        )
    }
}
const mapStateToProps =(state)=>({
    authenticated: state.user.authenticated
})
Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(Navbar)
