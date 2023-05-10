import * as React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
  styled,
  Paper,
} from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";

import { useQuery } from "@apollo/client";
import { QUERY_QUEST } from "../utils/queries";

const Riddle = ({ user, onSave, renderMap }) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Choose wisely");

  const tierInfo = user.currentQuest.tierName || [];

  const { loading, data } = useQuery(QUERY_QUEST, {
    variables: { tierName: tierInfo },
  });

  const riddle = data?.quest.riddle || [];
  const option1 = data?.quest.riddle.options[0];
  const option2 = data?.quest.riddle.options[1];
  const option3 = data?.quest.riddle.options[2];
  const answer = data?.quest.riddle.answer;

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === answer) {
      setHelperText("You got it!");
      setError(false);
      renderMap(true);
    } else if (value !== answer) {
      setHelperText("Sorry, wrong answer!");
      setError(true);
    } else {
      setHelperText("Please select an option.");
      setError(true);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <Item>
        <Typography gutterBottom variant="h5">
          My Riddle
        </Typography>
        <hr />
        <form onSubmit={handleSubmit}>
          <FormControl sx={{ m: 3 }} error={error} variant="standard">
            <FormLabel id="demo-error-radios">{riddle.question}</FormLabel>
            <RadioGroup
              aria-labelledby="demo-error-radios"
              name="quiz"
              value={value}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value={option1}
                control={<Radio />}
                label={option1}
              />
              <FormControlLabel
                value={option2}
                control={<Radio />}
                label={option2}
              />
              <FormControlLabel
                value={option3}
                control={<Radio />}
                label={option3}
              />
            </RadioGroup>
            <FormHelperText>{helperText}</FormHelperText>
            <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
              Check Answer
            </Button>
          </FormControl>
        </form>
      </Item>
    </div>
  );
};

export default Riddle;
