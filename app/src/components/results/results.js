import React, { useEffect, useState } from "react";
import { graphql } from "react-apollo";
import Highlighter from "react-highlight-words";
import Empty from "../empty/empty";

import { searchUserAndProperty } from "../../queries/queries";

const Results = (props) => {
  const [results, setResults] = useState(null);
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    if (!props.data.loading) {
      setResults([...props.data.searchUser, ...props.data.searchProperty]);
      setLoading(props.data.loading);

      if (props.keyword) {
        props.data.refetch();
      }
    }
  }, [props.data.loading, props.keyword]);

  return (
    <div>
      <div className="results__header">
        {isloading
          ? "Loading..."
          : props.keyword
          ? `Results: ${results.length}`
          : `Search from ${results.length} entries`}
      </div>
      {isloading ? (
        "Loading"
      ) : results.length !== 0 ? (
        results.map((item) => {
          const card = item.firstName ? (
            <div key={item.id} className="result__item">
              User:{" "}
              <Highlighter
                searchWords={[props.keyword]}
                textToHighlight={`${item.firstName} ${item.lastName}`}
              />
              <div>
                {item.property && item.property.length > 0
                  ? item.property.map((prop, i) => {
                      return (
                        <div key={prop.id} className="result__item-property">
                          User Property {i + 1}: {prop.street} {prop.city}{" "}
                          {prop.state} {prop.zip}
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          ) : (
            <div key={item.id} className="result__item">
              Property:{" "}
              <Highlighter
                searchWords={[props.keyword]}
                textToHighlight={`${item.street} ${item.city} ${item.state} ${item.zip} `}
              />
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "5px" }}>Rent:</div>
                <Highlighter
                  searchWords={[props.keyword]}
                  textToHighlight={`$${item.rent}`}
                />
              </div>
            </div>
          );

          return card;
        })
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default graphql(searchUserAndProperty, {
  options: (props) => {
    return {
      variables: {
        key: props.keyword,
      },
    };
  },
})(Results);
