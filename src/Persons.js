import React from "react";
import axios from "axios";
import { DataGrid } from '@material-ui/data-grid';

class Persons extends React.Component {
  state = {
    persons: [],
    columns : [
        {field: "id", headerName: "ID", with: 70},
        {field: "name", headerName: "NAME", with: 70},
        {field: "username", headerName: "USERNAME", with: 70},
        {field: "email", headerName: "EMAIL", with: 70},
    ]
  };

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      const persons = res.data;
      this.setState({ persons });
    });
  }

  render() {
    return (
        <DataGrid
          rows={this.state.persons}
          columns={this.state.columns}
          pageSize={5}
          checkboxSelection
        />
    );
  }
}

export default Persons;
