import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { giveAllCheckboxesTheSameValue } from '../utils';

const handleTokenChange = ({ target }, selectedTokens, setSelectedTokens, setNonTokenCheckboxes) => {
  setSelectedTokens({
    ...selectedTokens,
    [target.name]: target.checked,
  });
  setNonTokenCheckboxes({ all: false, none: false });
};

const TokenCheckboxes = ({
  tokens,
  selectedTokens,
  setSelectedTokens,
  nonTokenCheckboxes,
  setNonTokenCheckboxes,
}) => (
  <>
    <div>
      <FormControlLabel
        key="Összes"
        control={(
          <Checkbox
            checked={nonTokenCheckboxes.all}
            onChange={({ target }) => {
              if (target.checked) {
                setNonTokenCheckboxes({ all: true, none: false });
                setSelectedTokens(giveAllCheckboxesTheSameValue(tokens, true));
              } else {
                setNonTokenCheckboxes({ all: false, none: false });
              }
            }}
            name="Összes"
          />
        )}
        label="Összes"
      />
      <FormControlLabel
        key="Egyik sem"
        control={(
          <Checkbox
            checked={nonTokenCheckboxes.none}
            onChange={({ target }) => {
              if (target.checked) {
                setNonTokenCheckboxes({ all: false, none: true });
                setSelectedTokens(giveAllCheckboxesTheSameValue(tokens, false));
              } else {
                setNonTokenCheckboxes({ all: false, none: false });
              }
            }}
            name="Egyik sem"
          />
        )}
        label="Egyik sem"
      />
    </div>
    <div>
      {
        Object.entries(selectedTokens).map(([token, isSelected]) => (
          <FormControlLabel
            key={token}
            control={(
              <Checkbox
                checked={isSelected}
                onChange={event => handleTokenChange(event, selectedTokens, setSelectedTokens, setNonTokenCheckboxes)}
                name={token}
              />
            )}
            label={token}
          />
        ))
      }
    </div>
  </>
);

export default TokenCheckboxes;
