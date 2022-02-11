import React from 'react';
import Checkboxes from './Checkboxes';

const RightColumn = ({
  auctions,
  isGetAuctionsLoading,
  blockNumbers,
  selectedBlocks,
  setSelectedBlocks,
  nonBlockCheckboxes,
  setNonBlockCheckboxes,
}) => (
  <div className="right-column">
    {
      auctions.length > 1 && !isGetAuctionsLoading && (
        <Checkboxes
          items={blockNumbers}
          selectedItems={selectedBlocks}
          setSelectedItems={setSelectedBlocks}
          universalCheckboxes={nonBlockCheckboxes}
          setUniversalCheckboxes={setNonBlockCheckboxes}
          auctions={auctions}
          filterFunction={({ maxBlockNumber }, item) => maxBlockNumber === parseInt(item, 10)}
        />
      )
    }
  </div>
);

export default RightColumn;
