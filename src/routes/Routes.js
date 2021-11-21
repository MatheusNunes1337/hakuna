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

function CustomRoute(props) {
	const userToken = localStorage.getItem('userToken')
	if(props.private && !userToken) {
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
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/recover-pass">
                    <RecoverPass />
                </Route>
                <Route path="/redefine-pass">
                    <RedefinePass />
                </Route>
                <CustomRoute private path="/create-group">
                    <CreateGroup />
                </CustomRoute>
                <CustomRoute private path="/group/:id/config">
                    <UpdateGroup />
                </CustomRoute>
                <CustomRoute private path="/group/:id/">
                    <Feed />
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
            </Switch>
        </Router>
    )
}

export default Routes