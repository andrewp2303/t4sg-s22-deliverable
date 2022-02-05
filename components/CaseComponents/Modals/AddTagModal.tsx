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
import { CaseData, TagData } from "../CaseCard";

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

type AddTagModalProps = {
  open: boolean;
  onClose: () => void;
};

// This query will get all of the cases and tags
const CasesAndTagsQuery = `
query QueryCasesAndTags {
    cases {
      name
      id
    }
    tags {
      name
      id
    }
  }
`;

/* 
  ALTERNATE FEATURE 2:
  Mutation inserts (adds) a new tag given the
  tag_id and case_id.
  FUNCTIONAL
*/
const InsertTagMutation = `
mutation AddTagMutation($case_id: Int = 2, $tag_id: Int = 1) {
  insert_cases_tags_one(object: {case_id: $case_id, tag_id: $tag_id}) {
    id
    case_id
    tag_id
  }
}
`;

const AddTagModal: React.FC<AddTagModalProps> = (props) => {
  const classes = useStyles();
  const [name, setName] = useState<string>("");
  const [caseID, setCaseID] = useState<number | null>(null);
  const [tagID, setTagID] = useState<number | null>(null);
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: CasesAndTagsQuery,
  });

  const [result, executeMutation] = useMutation(InsertTagMutation);

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <Typography variant="h4" align="center">
        Add New Tag
      </Typography>
      <Box>
        {data ? (
          <>
            <FormControl fullWidth>
              <InputLabel id="category-select-label">Case</InputLabel>
              <Select
                labelId="category-select-label"
                fullWidth
                value={caseID}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  setCaseID(event.target.value as number);
                }}
              >
                {/*
                ALTERNATE FEATURE 2:
                Use the data from the result of the query CasesAndTagsQuery
                to render a MenuItem with cases.id as the value, and 
                cases.name as the text.
                FUNCTIONAL
                */}
                {data
              ? data.cases.map((c: CaseData) => {
                  return <MenuItem value={c.id}>
                  {c.name}
                </MenuItem>;
                })
              : "Something went wrong"}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="category-select-label">Tag</InputLabel>
              <Select
                labelId="category-select-label"
                fullWidth
                value={tagID}
                onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                  setTagID(event.target.value as number);
                }}
              >
                {/*
                ALTERNATE FEATURE 2 TODO:
                Use the data from the result of the query CasesAndTagsQuery
                to render a MenuItem with tags.id as the value, and 
                tags.name as the text.
                FUNCTIONAL
                */}
                {data
              ? data.tags.map((c: TagData) => {
                  return <MenuItem value={c.id}>
                  {c.name}
                </MenuItem>;
                })
              : "Something went wrong"}
              </Select>
            </FormControl>
          </>
        ) : fetching ? (
          "Loading Cases and Tags"
        ) : null}
      </Box>
      <Box mt="10px" display="flex" justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => {
            executeMutation({
              case_id: caseID,
              tag_id: tagID,
            });
            props.onClose();
          }}
        >
          Submit
        </Button>
      </Box>
    </StyledModal>
  );
};
export default AddTagModal;
