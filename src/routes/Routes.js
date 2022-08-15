import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import RecoverPass from '../pages/auth/RecoverPass'
import RedefinePass from '../pages/auth/RedefinePass'
import Home from '../pages/Home'
import CreateGroup from '../pages/group/CreateGroup'
import UpdateGroup from '../pages/group/UpdateGroup'
import GroupInfo from '../pages/group/GroupInfo'
import Feed from '../pages/group/Feed'
import UserConfig from '../pages/user/Config'
import GetGroups from '../pages/group/getGroups'
import Ranking from '../pages/Ranking'
import Membros from '../pages/group/getMembers'
import Files from '../pages/group/Files'
import Profile from '../pages/user/Profile'
import GetUsers from '../pages/user/getUsers'
import GetChats from '../pages/getChats'
import Chat from '../pages/Chat'
import FavoriteGroups from '../pages/FavoriteGroups'
import IndexPage from '../pages/index/IndexPage'
import HelpRequests from '../pages/HelpRequests'

function CustomRoute(props) {
	const userToken = localStorage.getItem('userToken')
    const emailRecover = localStorage.getItem('emailRecover')

    if(props.external && userToken) {
		return <Redirect to="/home" />
	}
	if(props.private && !userToken) {
		return <Redirect to="/login" />
	}
    if(props.restrict && !emailRecover) {
		return <Redirect to="/login" />
	} 
	else {
		return <Route {...props} />
	}
}


function Routes() {
    return (
        <Router>
            <Switch>
                <CustomRoute external path="/recover-pass">
                    <RecoverPass />
                </CustomRoute>
                <CustomRoute external restrict path="/redefine-pass">
                    <RedefinePass />
                </CustomRoute>
                <CustomRoute private path="/create-group">
                    <CreateGroup />
                </CustomRoute>
                <CustomRoute private path="/group/:id/config">
                    <UpdateGroup />
                </CustomRoute>
                <CustomRoute private path="/group/:id/members">
                    <Membros />
                </CustomRoute>
                <CustomRoute private path="/group/:id/files">
                    <Files />
                </CustomRoute>
                <CustomRoute private path="/group/:id/">
                    <Feed />
                </CustomRoute>
                <CustomRoute private path="/search/groups">
                    <GetGroups />
                </CustomRoute>
                <CustomRoute private path="/search/users">
                    <GetUsers />
                </CustomRoute>
                <CustomRoute private path="/chats/:id">
                    <Chat />
                </CustomRoute>
                <CustomRoute private path="/chats">
                    <GetChats />
                </CustomRoute>
                <CustomRoute private path="/help-requests">
                    <HelpRequests />
                </CustomRoute>
                <CustomRoute private path="/group-info/:id">
                    <GroupInfo />
                </CustomRoute>
                <CustomRoute private path="/user/config">
                    <UserConfig />
                </CustomRoute>
                <CustomRoute private path="/home">
                    <Home />
                </CustomRoute>
                <CustomRoute private path="/favorite-groups">
                    <FavoriteGroups />
                </CustomRoute>
                <CustomRoute private path="/ranking">
                    <Ranking />
                </CustomRoute>
                <CustomRoute external path="/login">
                    <Login />
                </CustomRoute>
                <CustomRoute external path="/register">
                    <Register />
                </CustomRoute>
                <CustomRoute private path="/:id">
                    <Profile />
                </CustomRoute>
                <CustomRoute external path="/">
                    <IndexPage />
                </CustomRoute>
            </Switch>
        </Router>
    )
}

export default Routes