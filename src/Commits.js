import React from "react";
import axios from "axios";
import config from "./environment";
import { DataGrid } from "@material-ui/data-grid";

class Commits extends React.Component {
  state = {
    commits: [],
    columns : [
        {field: "sha", headerName: "COMMIT", flex:1, headerClassName:"Grid-Header"},
        {field: "authorName", headerName: "AUTHOR NAME", flex:1, headerClassName:"Grid-Header"},
        {field: "authorEmail", headerName: "AUTHOR EMAIL", flex:1, headerClassName:"Grid-Header"},
        {field: "message", headerName: "COMMIT MESSAGE", flex:1, headerClassName:"Grid-Header"},
        {field: "date", headerName: "DATE", flex:1, headerClassName:"Grid-Header"},
    ]
  };

  componentDidMount() {
    axios.get(`https://api.github.com/repos/${config.gitUserName}/${config.gitRepoName}/commits`).then((res) => {
      const commits = res.data;
      commits.forEach(element => {
        element.id = Math.random();
        element.authorName = element.commit.author.name;
        element.authorEmail = element.commit.author.email;
        element.date = element.commit.author.date;
        element.message = element.commit.message;
      });
      this.setState({ commits });
    });
  }

  render() {
    return (
      <div className="Grid-Style">
        <DataGrid autoHeight 
          rows={this.state.commits}
          columns={this.state.columns}
          pageSize={5}          
        />
      </div>
    );
  }
}

export default Commits;
