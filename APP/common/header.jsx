import React,{Component} from 'react';
import style from '../public/css/header.scss';
import {connect}  from 'react-redux';
import PropTypes from 'prop-types';
import config from '../../config/default';

function LeftDOM(props) {
    let {left, user, avatar, that} = props;
    avatar = `${config.domainName}/public/img/avatar/${avatar}`;
    if (left.avatar && user.Email) {
        return (
            <div className={style.avatar}>
                <img onClick={that.sideAppear.bind(that)} src={avatar} />
            </div>
        )
    } else if (left.back) {
        return (<span onClick={that.navigateBack.bind(that)} className={style.signIn}>关闭</span>)
    } else {
        return (<span onClick={that.navigateTo.bind(that,  left.src)} className={style.signIn}>{left.content}</span>)
    }
}

function RightDOM (props) {
    const {right, navigateTo} = props;
    const {callback, content, src, notSelect_icons, icons, state, callbackState} = right;
    if (icons && notSelect_icons && callbackState) {
        let icon = state ? icons : notSelect_icons;
        const backgroundImg = {
            background: `url(${require('../public/img/' + icon)}) no-repeat`,
            backgroundSize: '0.6rem',
            backgroundPosition: '0 0'
        };
        return <span style={backgroundImg} onClick={callback} className={style.icons}></span>;
    } else if (icons && src) {
        const backgroundImg = {
            background: `url(${require('../public/img/' + icons)}) no-repeat`,
            backgroundSize: '0.6rem',
            backgroundPosition: '0 0'
        };
        return <span onClick={() => {navigateTo(src)}} style={backgroundImg} className={style.icons}></span>;
    } else if (callback) {
        return <span onClick={() => {callback()}} className={style.collection}>{content}</span>;
    } else {
        return <span onClick={() => {navigateTo(src)}}>{content}</span>
    }
}

class Header extends Component{
    constructor (props) {
        super(props);
        this.state = {
            user: false
        }
    }
    componentWillMount () {
        const {userInit} = this.props;
        /*setTimeout(() => {
            userInit(JSON.parse(localStorage.getItem('user')))
            this.setState({
                user: true
            });
        },1000);*/
        App.api.post('/user/init').then((res) => {
            if (res.code === 0) {
                userInit(res.data);
            }
            this.setState({
                user: true
            });
        });
    }
    componentDidUpdate () {
        this.userCallback(this.props)
    }
    render () {
        const location = this.context.router.route.location;
        const pathname = location.pathname + location.search;
        let {user, path} = this.props;
        user = user || {};
        path = path[pathname] || path.init;
        const data = path.header;
        let left = data.left;
        let right = data.right;
        const avatar = user.avatar ? user.avatar : (user.gender === 'm' ? 'm.jpg' : 'w.jpg');
        return (
            data.show && <div>
                <div className={style.placeHolder}></div>
                <header>
                    <LeftDOM left={left} user={user} that={this} avatar={avatar}  />
                    <h2>{data.content}</h2>
                    <RightDOM that={this} navigateTo={this.navigateTo.bind(this)} right={right} />
                </header>
            </div>
        )
    }
    userCallback (nextProps) {
        const location = this.context.router.route.location;
        const pathname = location.pathname + location.search;
        const path = nextProps.path[pathname];
        const {changePage} = nextProps;
        if (path) {
            if (path.header.userCallbackState === 1 && this.state.user) {
                path.header.userCallback();
                path.header.userCallbackState = 101;
                changePage(path)
            } else if (path.header.userCallbackState === 2 && this.state.user && path.header.userCallback) {
                path.header.userCallback();
            }
        }
    }
    navigateTo (src) {
        this.context.router.history.push(src)
    }
    navigateBack () {
        this.context.router.history.goBack()
    }
    sideAppear () {
        const {pathname} = this.context.router.history.location;
        const {changePage, path} = this.props;
        path[pathname].side = {
            show: true
        };
        changePage(path)
    }
}
Header.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    path: state.path
});

function mapDispatchToProps(dispatch) {
    return {
        userInit (data) {
            dispatch({
                type: 'userInit',
                user: data
            })
        },
        changePage (data) {
            dispatch({
                type: 'pageChange',
                path: data
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)