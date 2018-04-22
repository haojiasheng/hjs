import React,{Component} from 'react';
import style from '../public/css/header.scss';
import {connect}  from 'react-redux';
import PropTypes from 'prop-types';
import api from '../lib/api';

function LeftDOM(props) {
    const {left, user, avatar, that} = props;
    if (left.avatar && user.Email) {
        return (
            <div className={style.avatar}>
                <img onClick={that.sideAppear.bind(that)} src={require(`../public/img/avatar/${avatar}`)} />
            </div>
        )
    } else if (left.back) {
        return (<span onClick={that.navigateBack.bind(that)} className={style.signIn}>关闭</span>)
    } else {
        return (<span onClick={that.navigateTo.bind(that,  left.src)} className={style.signIn}>{left.content}</span>)
    }
}

function RightDOM(props) {
    const {that, right} = props;
    if (right.icons) {
        const backgroundImg = {
            background: `url(${require('../public/img/' + right.notSelect_icons)}) no-repeat`,
            backgroundSize: '0.6rem'
        };
        return <span style={backgroundImg} className={style.collection}></span>;
    } else {
        return <span onClick={that.navigateTo.bind(that, right.src)}>{right.content}</span>
    }
}

class Header extends Component{
    componentWillMount () {
        const {userInit} = this.props;
        api.get('/user/init').then((res) => {
            if (res.code === 0) {
                userInit(res.data);
            }
        });
        userInit(JSON.parse(localStorage.getItem('user')));
    }
    render () {
        const {pathname} = this.context.router.route.location;
        let {path, user} = this.props;
        user = user || {};
        let data = path[pathname] || path.init;
        data = data.header;
        let left = data.left;
        let right = data.right;
        const avatar = user.avatar ? user.avatar : (user.gender === 'm' ? 'm.jpg' : 'w.jpg');
        return (
            data.show && <div>
                <div className={style.placeHolder}></div>
                <header>
                    <LeftDOM left={left} user={user} that={this} avatar={avatar}  />
                    <h2>{data.content}</h2>
                    <RightDOM that={this} right={right} />
                </header>
            </div>
        )
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
                type: 'changePage',
                path: data
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)