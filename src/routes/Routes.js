import React from 'react'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import RecoverPass from '../pages/auth/RecoverPass'
import RedefinePass from '../pages/auth/RedefinePass'
import Home from '../pages/Home'
import CreateGroup from '../pages/group/CreateGroup'
import UpdateGroup from '../pages/group/UpdateGroup'
import GroupInfo from '../pages/group/GroupInfo'
import Feed from '../pages/group/Feed'
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
                <Route path="/create-group">
                    <CreateGroup />
                </Route>
                <Route path="/group/:id/config">
                    <UpdateGroup />
                </Route>
                <Route path="/group/:id/">
                    <Feed />
                </Route>
                <Route path="/group-info/:id">
                    <GroupInfo />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes