import { useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";

export const ExpressionInput = ({ handleSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(inputValue);
  };

  return (
    <Card>
      <form onSubmit={handleFormSubmit}>
        <CardContent>
          <TextField
            fullWidth={true}
            label="Expression"
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
          />
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};