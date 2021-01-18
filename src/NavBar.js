import React from "react";
import config from "./environment";
import { Paper } from '@material-ui/core';

class NavBar extends React.Component { 

  render() {
    return (
        <div>
            <h1>Commit History</h1>
            <Paper elevation={2}>
                <h2>Git User Name: {config.gitUserName}</h2>
                <h2>Repository: {config.gitRepoName}</h2>
            </Paper>
      </div>
    );
  }
}

export default NavBar;
