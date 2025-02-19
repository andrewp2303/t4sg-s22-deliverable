import React, { useState } from "react";
import StyledModal from "./StyledModal";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useMutation, useQuery } from "urql";
import {
  ManagementCategory,
  ManagementContainerQuery,
} from "../CaseManagementContainer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "25ch",
    },
  })
);

type DeleteCaseModalProps = {
  open: boolean;
  onClose: () => void;
};

/* 
  FEATURE 2:
  Adds a new case given the description, name, status, and category_id
*/
const InsertCaseMutation = `
mutation AddCaseMutation($name: String = "", $description: String = "", $status: String = "", $category_id: Int = 2) {
  insert_cases_one(object: {name: $name, description: $description, status: $status, category_id: $category_id}){
    id
    name
    description
    status
    category_id
  }
}
`;

const DeleteCaseModal: React.FC<DeleteCaseModalProps> = (props) => {
  const classes = useStyles();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [category, setCategory] = useState<number | null>(null);
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: ManagementContainerQuery,
  });

  const [result, executeMutation] = useMutation(InsertCaseMutation);

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <Typography variant="h4" align="center">
        Feature In Progress
      </Typography>
      {/* <Box>
        <TextField
          id="standard-full-width"
          label="Name"
          placeholder="Example Case Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="standard-full-width"
          label="Description"
          placeholder="Example Case Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(event.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            fullWidth
            value={status}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              setStatus(event.target.value as string);
            }}
          >
            <MenuItem value={"To Do"}>To Do</MenuItem>
            <MenuItem value={"In Progress"}>In Progress</MenuItem>
            <MenuItem value={"Done"}>Done</MenuItem>
          </Select>
        </FormControl>
        {data ? (
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              fullWidth
              value={category}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setCategory(event.target.value as number);
              }}
            >
              {data
              ? data.category.map((c: ManagementCategory) => {
                  return <MenuItem value={c.id}>
                  {c.name}
                </MenuItem>;
                })
              : "Something went wrong"}
            </Select>
          </FormControl>
        ) : fetching ? (
          "Loading Categories"
        ) : null}
      </Box> */}
      {/* <Box mt="10px" display="flex" justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => {
            executeMutation({
              case_id: category,
            });
            props.onClose();
          }}
        >
          Submit
        </Button>
      </Box> */}
    </StyledModal>
  );
};
export default DeleteCaseModal;
