export const customStyles = {
  control: (styles: any) => ({
    ...styles,
    width: "100%",
    maxWidth: "14rem",
    minWidth: "12rem",
    borderRadius: "5px",
    color: "black",
    fontSize: "0.8rem",
    lineHeight: "1.5rem",
    backgroundColor: "#102a4c",
    cursor: "pointer",
    // boxShadow: "5px 5px 0px 0px rgba(0,0,0);",
    // ":hover": {
    //   border: "2px solid #000000",
    //   boxShadow: "none",
    // },
  }),
  option: (styles: any) => {
    return {
      ...styles,
      color: "white",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
      width: "100%",
      background: "#102a4c",
      ":hover": {
        backgroundColor: "rgb(243 244 246)",
        color: "#000",
        cursor: "pointer",
      },
    };
  },
  menu: (styles: any) => {
    return {
      ...styles,
      backgroundColor: "#fff",
      maxWidth: "14rem",
      borderRadius: "5px",
    };
  },

  placeholder: (defaultStyles: any) => {
    return {
      ...defaultStyles,
      color: "#fff",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
    };
  },
  singleValue: (styles: any) => {
    return {
      ...styles,
      color: "white",
    };
  },
};
