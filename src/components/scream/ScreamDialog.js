import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../../util/MyButton' 
import dayjs from 'dayjs'
import {Link} from 'react-router-dom'
import Comments from './Comments'
import CommentForm from './CommentForm'

//MUI STUFF
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'

import  Typography  from '@material-ui/core/Typography'
//ICON
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import ChatIcon from '@material-ui/icons/Chat'

import {connect} from 'react-redux'
import {getScream,likeScream, unlikeScream, clearErrors} from '../../redux/actions/dataActions'
import formCss from '../../styles/form.json'

const styles = {
    ...formCss,
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
    // body: {marginBottom: 20}

}

class ScreamDialog extends Component {
    state = {
        open: false,
        oldPath:'',
        newPath: ''
    }
    componentDidMount(){
        if(this.props.openDialog){
            this.handleOpen()
        }
    }
    handleOpen = () => {
        let oldPath = window.location.pathname
        const {userHandle, screamId} = this.props
        const newPath = `/users/${userHandle}/scream/${screamId}`

        if(oldPath === newPath) oldPath=`/users/${userHandle}`

        window.history.pushState(null, null, newPath)



        this.setState({open: true, oldPath, newPath})
        this.props.getScream(this.props.screamId)
    }
    handleClose = () => {
        window.history.pushState(null,null,this.state.oldPath)
        // this.props.clearErrors()
        this.setState({open: false})
        this.props.clearErrors()
    }
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
    // handleChange = (event) => {
    //     this.setState({[event.target.name]: event.target.value})
    // }
    render() {
        const {classes, 
            scream:{ body,createdAt,likeCount,commentCount,userImage, userHandle,comments},
            UI: {loading}, user: {authenticated}
        } =this.props

        const likeButton = !authenticated ? (
            <MyButton tip='Like'>
                <Link to='/login'>
                    <FavoriteBorder color='primary'/>
                </Link>
            </MyButton>
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

        const dialogMurkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={100} thickness={2}/>
            </div>
        ) : (
            <Grid container spacing={1}>
                <Grid item sm={5}>
                    <img src={userImage} alt='Propfile' className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography
                    component={Link}
                    color='primary'
                    variant='h5'
                    to={`/users/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant='body2' color='textSecondary'>
                        {dayjs(createdAt).format(`h:mm a, MMMM DD YYYY`)}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant='body1' className={classes.body}>
                        {body}
                    </Typography>
                    {likeButton}
                    <span>{likeCount} Likes</span>
                    <MyButton tip='comments' >
                        <ChatIcon color='primary'/>
                    </MyButton>
                    <span>{commentCount} comments</span>


                </Grid>
                <hr className={classes.visibleSeparator}/> 
                <CommentForm screamId={this.props.screamId} />
                <Comments comments={comments} />
            </Grid>
        )

        return(
            <Fragment>
                <MyButton onClick={this.handleOpen} tip='Expand Scream' tipClassName={classes.expandButton}>
                    <UnfoldMore color='primary'/>
                </MyButton>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth='sm'>
                    <MyButton tip='Close' onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMurkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}
ScreamDialog.propsTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI,
    user: state.user
})
const mapActionsToProps ={
    getScream,
    likeScream,
    unlikeScream,
    clearErrors
}
export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(ScreamDialog)) 
