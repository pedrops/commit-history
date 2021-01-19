import React from "react";
import axios from "axios";
import config from "./environment";
import { DataGrid } from "@material-ui/data-grid";
import Modal from "@material-ui/core/Modal";

class Diff extends React.Component {

  constructor(props) {
    super(props);
    console.log("Estos son los props"+this.props);
  }

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
        `https://api.github.com/repos/${config.gitUserName}/${config.gitRepoName}/commits/${this.props.dataFromParent}`
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
      <div>
        <Modal open={this.props.openModal}>
          <DataGrid
            autoHeight
            rows={this.state.fileDiffs}
            columns={this.state.columns}
            pageSize={5}
          />
        </Modal>
      </div>
    );
  }
}

export default Diff;
