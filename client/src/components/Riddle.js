import * as React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";

import { useQuery } from "@apollo/client";
import { QUERY_QUEST } from "../utils/queries";

const Riddle = ({ onSave, renderMap }) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Choose wisely");

  const { loading, data } = useQuery(QUERY_QUEST, {
    variables: { tierName: "Pedestrian" },
  });

  console.log("AAAAAAA", data);

  const quest = data?.quest;

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === "map") {
      setHelperText("You got it!");
      setError(false);
      renderMap(true);
    } else if (value === "island") {
      setHelperText("Sorry, wrong answer!");
      setError(true);
    } else if (value === "country") {
      setHelperText("Sorry, wrong answer!");
      setError(true);
    } else {
      setHelperText("Please select an option.");
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ m: 3 }} error={error} variant="standard">
        <FormLabel id="demo-error-radios">{quest.riddle.question}</FormLabel>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="map" control={<Radio />} label="A Map!" />
          <FormControlLabel
            value="island"
            control={<Radio />}
            label="An Island!"
          />
          <FormControlLabel
            value="country"
            control={<Radio />}
            label="A country."
          />
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
          Check Answer
        </Button>
      </FormControl>
    </form>
  );
};

export default Riddle;
