import React from "react";
import Button from "react-bootstrap/Button";
import { Container } from "reactstrap";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import "../../styles/casemanagement.module.css";
import Footer from "./Footer";
import CaseCategory from "./CaseCategory";
import AddCaseModal from "./Modals/AddCaseModal";
import DeleteCaseModal from "./Modals/DeleteCaseModal";
import EditCaseModal from "./Modals/EditCaseModal";
import { useQuery } from "urql";
import AddCategoryModal from "./Modals/AddCategoryModal";
import AddTagModal from "./Modals/AddTagModal";
import { Autorenew } from "@material-ui/icons";

/* 
  FEATURE 1:
  Queries to get the name and id of every category in the Hasura database
*/
export const ManagementContainerQuery = `
query MyQuery {
  category {
    name
    id
  }
}
`;
// END TODO

export type ManagementCategory = {
  id: number;
  name: string;
};

const CaseManagementContainer: React.FC = (props) => {
  const [addCaseModalOpen, setAddCaseModalOpen] =
    React.useState<boolean>(false);
  const [addCategoryModalOpen, setAddCategoryModalOpen] =
    React.useState<boolean>(false);
  const [addTagModalOpen, setAddTagModalOpen] = React.useState<boolean>(false);
  const [deleteCaseModalOpen, setDeleteCaseModalOpen] =
    React.useState<boolean>(false);
  const [editCaseModalOpen, setEditCaseModalOpen] =
    React.useState<boolean>(false);

  /* NOTE: This uses */
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: ManagementContainerQuery,
  });
  console.log(data)

  const categories: ManagementCategory[] = data ? data?.category: [];

  return (
    <>
      <h5 className="title">Home Page</h5>
      <AddCaseModal
        onClose={() => setAddCaseModalOpen(false)}
        open={addCaseModalOpen}
      />

      <AddCategoryModal
        onClose={() => setAddCategoryModalOpen(false)}
        open={addCategoryModalOpen}
      />

      <AddTagModal
        onClose={() => setAddTagModalOpen(false)}
        open={addTagModalOpen}
      />
      
      <DeleteCaseModal
        onClose={() => setDeleteCaseModalOpen(false)}
        open={deleteCaseModalOpen}
      />

      <EditCaseModal
        onClose={() => setEditCaseModalOpen(false)}
        open={editCaseModalOpen}
      />


      <Container
        style={{
          width: "100%",
          borderStyle: "solid",
          padding: "0.75rem",
          marginTop: "0.75rem",
        }}
      >
        <Button variant="dark" onClick={() => setAddCategoryModalOpen(true)}>
          Add Category
        </Button>
        <Button variant="dark" onClick={() => setAddTagModalOpen(true)}>
          Add Tag To A Case
        </Button>
        <Button variant="dark" onClick={() => setAddCaseModalOpen(true)}>
          Add Case
        </Button>
        <Button variant="dark" onClick={() => setDeleteCaseModalOpen(true)}>
          Delete Case
        </Button>
        <Button variant="dark" onClick={() => setEditCaseModalOpen(true)}>
          Edit Case
        </Button>
      </Container>
      <Grid container spacing={3}>
          {/*
          FEATURE 1:
          Uses the data from the result of the query to render 
          a CaseCategory for every category in the response
          */}
          {categories
          ? categories.map((c: ManagementCategory, index: number) => {
              return <Grid item xs={4}>
                <CaseCategory key={index} category_id={c.id} />
                </Grid>;
            })
          : "Something went wrong"}
      </Grid>
    </>
  );
};
export default CaseManagementContainer;
