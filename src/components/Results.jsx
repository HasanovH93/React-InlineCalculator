import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ForwardIcon from "@material-ui/icons/Forward";

export const Results = ({ content, history }) => (
  <Card data-testid="results">
    <CardContent>
      <Typography variant="h5">Results</Typography>

      {content.expression && content.result && (
        <Typography variant="h5" >
          <ForwardIcon fontSize="small" />  {content.expression} = {content.result}
        </Typography>
      )}


      <List >
        {history.map((item, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${index + 1}. ${item.expression} = ${
                item.result
              }`}
            />
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);





