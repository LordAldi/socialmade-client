import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from 'prop-types'
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'

//Mui stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography, Grid } from '@material-ui/core';

import {connect} from 'react-redux'
import {likeScream, unlikeScream} from '../../redux/actions/dataActions'
import MyButton from '../../util/MyButton'

//icons
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

const styles = {
    card: {
        position: 'relative',
        display:'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 100,
        maxHeight:100,
        maxWidth: "30%",
        borderRadius: 0.5
    },
    content: {
        padding: 25,
        objectFit: 'cover',
        minWidth: 300
    }, 
    mainText: {
        fontSize: "0.9rem",
        marginRight: "5%",
        width: '80%'
    }
}

class Scream extends Component {
    likedScream = () =>{
        if(this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.scream.screamId)){
            return true
        } else return false
    }

    likeScream = () => {
        this.props.likeScream(this.props.scream.screamId)
    }
    unlikeScream = () => {
        this.props.unlikeScream(this.props.scream.screamId)
    }


    render() {
        dayjs.extend(relativeTime)
        const {classes, scream : { body,createdAt,userImage,userHandle,screamId, likeCount, commentCount}, 
        user: {authenticated, credentials: {handle}}} = this.props 
        //const classes = this.props.classes
        const likeButton = !authenticated ? (
            <Link to='/login'>
                <MyButton tip='Like'>
                    
                        <FavoriteBorder color='primary'/>
                    
                </MyButton>
            </Link>
        ): (
            this.likedScream() ? (
                <MyButton tip='Unlike' onClick={this.unlikeScream}>
                    <FavoriteIcon color='primary'/>
                </MyButton>
            ): (
                <MyButton tip='Like' onClick={this.likeScream}>
                    <FavoriteBorder color='primary'/>
                </MyButton>
            )
        )
        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId ={screamId}/>
        ): null
        return (
            <Card className={classes.card}>
                <CardMedia 
                
                image={userImage}
                title="Profile Image"
                className={classes.image}/>
                
                <CardContent className={classes.content}>
                
                    <Typography 
                    variant = 'h5' 
                    component={Link} 
                    to={`/users/${userHandle}`}
                    color='primary'>
                        {userHandle}
                    </Typography>
                    {deleteButton}
                    <Typography variant='body2' color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1" className={classes.mainText}>
                        {body}
                    </Typography>
                    <Grid container >
                        <Grid item xs={12} sm={5}>
                        {likeButton}
                        <span>{likeCount} Likes</span>
                        </Grid>
                        
                        <Grid item sm={6} xs={12}>
                            <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                            <span>{commentCount} comments</span>
                        </Grid>
                        
                        
                        
                    </Grid>
                    
                </CardContent>
            </Card>
            
        )
    }
}

Scream.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = (state) => ({
    user: state.user

})
const mapActionsToProps =  {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Scream))
