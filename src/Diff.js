import React from "react";
import axios from "axios";
import config from "./environment";
import { DataGrid } from "@material-ui/data-grid";

class Diff extends React.Component {
  state = {
    fileDiffs: [],
    columns: [
      {
        field: "filename",
        headerName: "FILE NAME",
        flex: 1,
        headerClassName: "Grid-Header",
      },
      {
        field: "status",
        headerName: "STATUS",
        flex: 1,
        headerClassName: "Grid-Header",
      },
      {
        field: "additions",
        headerName: "ADDITIONS",
        flex: 1,
        headerClassName: "Grid-Header",
      },
      {
        field: "deletions",
        headerName: "DELETIONS",
        flex: 1,
        headerClassName: "Grid-Header",
      },
      {
        field: "changes",
        headerName: "CHANGES",
        flex: 1,
        headerClassName: "Grid-Header",
      },
    ],
  };

  componentDidMount() {
    axios
      .get(
        `https://api.github.com/repos/${config.gitUserName}/${config.gitRepoName}/commits/27d8dbe94b99d4f355f7b74109063dab514e4432`
      )
      .then((res) => {
        const fileDiffs = res.data.files;
        fileDiffs.forEach((element) => {
          element.id = Math.random();
        });
        this.setState({ fileDiffs });
      });
  }

  render() {
    return (
      <div className="Grid-Style">
        <DataGrid
          autoHeight
          rows={this.state.commits}
          columns={this.state.columns}
          pageSize={5}
        />
      </div>
    );
  }
}

export default Diff;
