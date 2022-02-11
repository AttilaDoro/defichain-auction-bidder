import React from 'react';
import Checkboxes from './Checkboxes';

const LeftColumn = ({
  auctions,
  isGetAuctionsLoading,
  tokens,
  selectedTokens,
  setSelectedTokens,
  nonTokenCheckboxes,
  setNonTokenCheckboxes,
}) => (
  <div className="left-column">
    {
      auctions.length > 1 && !isGetAuctionsLoading && (
        <Checkboxes
          items={tokens}
          selectedItems={selectedTokens}
          setSelectedItems={setSelectedTokens}
          universalCheckboxes={nonTokenCheckboxes}
          setUniversalCheckboxes={setNonTokenCheckboxes}
          auctions={auctions}
          filterFunction={({ bidToken }, item) => bidToken === item}
        />
      )
    }
  </div>
);

export default LeftColumn;
