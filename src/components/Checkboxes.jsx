import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { giveAllCheckboxesTheSameValue } from '../utils';
import './Checkboxes.css';

const handleChange = ({ target }, selectedItems, setSelectedItems, setUniversalCheckboxes) => {
  setSelectedItems({
    ...selectedItems,
    [target.name]: target.checked,
  });
  setUniversalCheckboxes({ all: false, none: false });
};

const Checkboxes = ({
  items,
  selectedItems,
  setSelectedItems,
  universalCheckboxes,
  setUniversalCheckboxes,
  auctions,
  filterFunction,
}) => (
  <>
    <div className="checkboxes">
      <FormControlLabel
        key="Összes"
        control={(
          <Checkbox
            checked={universalCheckboxes.all}
            onChange={({ target }) => {
              if (target.checked) {
                setUniversalCheckboxes({ all: true, none: false });
                setSelectedItems(giveAllCheckboxesTheSameValue(items, true));
              } else {
                setUniversalCheckboxes({ all: false, none: false });
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
            checked={universalCheckboxes.none}
            onChange={({ target }) => {
              if (target.checked) {
                setUniversalCheckboxes({ all: false, none: true });
                setSelectedItems(giveAllCheckboxesTheSameValue(items, false));
              } else {
                setUniversalCheckboxes({ all: false, none: false });
              }
            }}
            name="Egyik sem"
          />
        )}
        label="Egyik sem"
      />
    </div>
    <div className="checkboxes">
      {
        Object.entries(selectedItems).map(([item, isSelected]) => (
          <FormControlLabel
            key={item}
            control={(
              <Checkbox
                checked={isSelected}
                onChange={event => handleChange(event, selectedItems, setSelectedItems, setUniversalCheckboxes)}
                name={item}
              />
            )}
            label={
              !auctions
                ? item
                : `${item} (${auctions.filter(auction => filterFunction(auction, item)).length} db)`
            }
          />
        ))
      }
    </div>
  </>
);

export default Checkboxes;
