import { Container } from "unstated";

const cleanQuote = quote => {
  if (!quote) {
    return "";
  }
  quote = quote.trim();

  // Remove certain characters
  const punctuationRegex = new RegExp(
    "" +
      // Start
      // " - Double quote
      // “ - u201c - left double quotation mark
      // ‘ - u2018 - left single quotation mark
      /^"|/.source +
      /^\u201c|/.source +
      /^\u2018|/.source +
      // Any
      // • - u2022 - bullet
      // ✽ - u273d - heavy teardrop-spoked asterisk
      /\u2022|/.source +
      /\u273d|/.source +
      // End
      // " - Double quote
      // , - Comma
      // . - Dot
      // ” - u201d - right double quotation mark
      // ’ - u2019 - right single quotation mark
      /"$|/.source +
      /,$|/.source +
      /.$|/.source +
      /\u201d$|/.source +
      /\u2019$|/.source,
    "g"
  );

  const dashRegex = new RegExp(
    "" +
      // - - u2014 — em dash (U + 2014)
      /(-|\u2014)/.source +
      "g"
  );

  quote = quote.replace(punctuationRegex, "").replace(dashRegex, " - ");

  return quote.trim();
};

const parseData = data => {
  const sections = data.split("==========");
  const parsedData = sections.map(lines => {
    const splitLines = lines.trim().split("\n");
    if (!splitLines[3]) {
      return splitLines;
    }
    return {
      title: splitLines[0],
      explanation: splitLines[1],
      quote: cleanQuote(splitLines[3])
    };
  });
  return parsedData;
};

class DataContainer extends Container {
  state = {
    loading: false,
    data: [],
    parsedData: []
  };

  load = data => {
    return this.setState({ data });
  };

  parse = data => {
    console.log(data);
  };

  setFile = files => {
    const file = files[0];
    const reader = new FileReader();

    this.setState({ loading: true });

    if (file.type !== "text/plain") {
      return this.setState({
        error: "Please make sure to select a text file.",
        loading: false
      });
    }

    reader.addEventListener(
      "load",
      () => {
        this.setState({
          loading: false,
          parsedData: parseData(reader.result)
        });
      },
      false
    );

    if (file) {
      reader.readAsText(file);
    }
  };
}

export default DataContainer;
