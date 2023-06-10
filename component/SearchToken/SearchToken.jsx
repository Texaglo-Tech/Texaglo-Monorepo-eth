import React, { useState } from "react";
import Image from "next/image";

//iNTERNAL IMPORT
import Style from "./SearchToken.module.css";

const SearchToken = () => {
  //USESTATE
  const [active, setActive] = useState(1);

  return (
    <div className={Style.SearchToken}>
      <div className={Style.SearchToken_box}>
        <div className={Style.SearchToken_box_heading}>
          <h4>Select a token</h4>
        </div>
      </div>
    </div>
  );
};

export default SearchToken;
