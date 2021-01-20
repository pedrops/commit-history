import React from "react";
import axios from "axios";
import config from "./environment";
import { DataGrid } from "@material-ui/data-grid";
import Modal from "@material-ui/core/Modal";
import { Button, makeStyles, Paper } from "@material-ui/core";




class Diff extends React.Component {

  constructor(props) {
    super(props);
    console.log("Estos son los props"+this.props);

    function rand() {
      return Math.round(Math.random() * 20) - 10;
    }
    
    function getModalStyle() {
      const top = 50 + rand();
      const left = 50 + rand();
    
      return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
      };
    }
    
    const useStyles = makeStyles((theme) => ({
      paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    }));

    // const styles = useStyles();
    // const modalstate = styles.paper;
    // this.setState({modalstate});
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
  };
  
  onClickClose = () => {
    //const openModal = false;
    this.setState({openModal:false});
    console.log("prueba");
  };

  render() {
    
    const body = (
      <div >
            <h1>TITULO DEL MODAL</h1>
            <br/>
            <DataGrid
              autoHeight
              rows={this.state.fileDiffs}
              columns={this.state.columns}
              pageSize={5}
            />
            <br/>
            <Button variant="contained" onClick={this.onClickClose}>Close</Button>
      </div>
    )
    return (
        <Modal open={this.props.openModal}>
            
        </Modal>
    );
  }
}

export default Diff;
