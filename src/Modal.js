import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { DataGrid } from "@material-ui/data-grid";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 1000,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal(props) {
  const { dataFromParent, openPopUp, handleClose } = props;

  const { sha, files } = dataFromParent
    ? dataFromParent
    : { sha: "", files: [] };

  console.log(dataFromParent);

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

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

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h3 id="simple-modal-title">Modified Files</h3>
      <h3 id="simple-modal-title">Commit: {sha}</h3>
      <p id="simple-modal-description">
        <DataGrid autoHeight rows={files} columns={columnsModal} pageSize={5} />
      </p>
      <button onClick={handleClose}>Exit</button>
    </div>
  );
  return (
    <div>
      <Modal
        open={openPopUp}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
