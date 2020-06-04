import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import logo from "./Images/logo.png";
import { Tab, Tabs, Paper } from "@material-ui/core";

import "./App.css";
import JoinEvent from "./components/JoinEvent";
import CreateEvent from "./components/CreateEvent";

function App() {
  const [tabValue, setTabValue] = useState(0);
  return (
    <Router>
      <h1 className="head">Events Manager</h1>
      <div className="tab-bar">
        <Paper>
          <Tabs value={tabValue} centered>
            <Tab
              label="Home"
              onClick={() => {
                setTabValue(0);
              }}
            ></Tab>
            <Tab
              label="Tournaments"
              onClick={() => {
                setTabValue(1);
              }}
            ></Tab>
            <Tab
              label="Create events"
              onClick={() => {
                setTabValue(2);
              }}
            ></Tab>
          </Tabs>
        </Paper>
        <TabPanel value={tabValue} index={0}>
          <div className="content-body">
            <img width="100%" height="100%" src={logo} alt="Logo" />
          </div>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <JoinEvent></JoinEvent>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <CreateEvent></CreateEvent>
        </TabPanel>
      </div>
    </Router>
  );
}
export default connect()(App);

function TabPanel({ children, value, index }) {
  return <div>{value === index && <div>{children}</div>}</div>;
}
