import React from "react";
import axios from "axios";
import config from "./environment";
import { DataGrid } from "@material-ui/data-grid";
import SimpleModal from "./Modal";

class Commits extends React.Component {
  state = {
    commits: [],
    columns: [
      {
        field: "sha",
        headerName: "COMMIT",
        flex: 1,
        headerClassName: "Grid-Header",
      },
      {
        field: "authorName",
        headerName: "AUTHOR NAME",
        flex: 1,
        headerClassName: "Grid-Header",
      },
      {
        field: "authorEmail",
        headerName: "AUTHOR EMAIL",
        flex: 1,
        headerClassName: "Grid-Header",
      },
      {
        field: "message",
        headerName: "COMMIT MESSAGE",
        flex: 1,
        headerClassName: "Grid-Header",
      },
      {
        field: "date",
        headerName: "DATE",
        flex: 1,
        headerClassName: "Grid-Header",
      },
    ],
    sha: "",
    openModal: false,
  };

  componentDidMount() {
    axios
      .get(
        `https://api.github.com/repos/${config.gitUserName}/${config.gitRepoName}/commits`
      )
      .then((res) => {
        const commits = res.data;
        commits.forEach((element) => {
          element.id = Math.random();
          element.authorName = element.commit.author.name;
          element.authorEmail = element.commit.author.email;
          element.date = element.commit.author.date;
          element.message = element.commit.message;
        });
        this.setState({ commits });
      });
  }

  onClickRow = (rowInfo) => {
    const sha = rowInfo.row.sha;
    const openModal = true;

    const columnsModal = [
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
    ];

    this.setState({ sha, openModal, columnsModal });
    axios
      .get(
        `https://api.github.com/repos/${config.gitUserName}/${config.gitRepoName}/commits/${this.state.sha}`
      )
      .then((res) => {
        const fileDiffs = res.data.files;
        const commitResult = res.data;
        fileDiffs.forEach((element) => {
          element.id = Math.random();
        });
        this.setState({ fileDiffs, commitResult });
      });
  };
  onClickModalClose = () => {
    const openModal = false;
    this.setState({ openModal });
  };

  render() {
    return (
      <div className="Grid-Style">
        <DataGrid
          autoHeight
          rows={this.state.commits}
          columns={this.state.columns}
          pageSize={5}
          onRowClick={this.onClickRow}
        />
        <SimpleModal
          dataFromParent={this.state.commitResult}
          openPopUp={this.state.openModal}
          handleClose={this.onClickModalClose}
        ></SimpleModal>
      </div>
    );
  }
}

export default Commits;
