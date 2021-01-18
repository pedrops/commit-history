import React from "react";
import axios from "axios";
import { DataGrid } from '@material-ui/data-grid';

class Commits extends React.Component {
  state = {
    commits: [],
    columns : [
        {field: "sha", headerName: "SHA", with: 90},
    ]
  };

  componentDidMount() {
    axios.get(`https://api.github.com/repos/pedrops/commit-history/commits`).then((res) => {
      const commits = res.data;
      commits.forEach(element => {
        element.id = Math.random();
      });
      this.setState({ commits });
    });
  }

  render() {
    return (
        <DataGrid
          rows={this.state.commits}
          columns={this.state.columns}
          pageSize={5}
          checkboxSelection
        />
    );
  }
}

export default Commits;
