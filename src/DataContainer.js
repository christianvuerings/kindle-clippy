import { Container } from 'unstated';

export const cleanQuote = quote => {
  if (!quote) {
    return '';
  }
  quote = quote.trim();

  // Remove certain characters
  // const punctuationRegex = new RegExp();
  // "" +
  //   // Start
  //   // " - Double quote
  //   // “ - u201c - left double quotation mark
  //   // ‘ - u2018 - left single quotation mark
  //   /^"|/.source +
  //   /^\u201c|/.source +
  //   /^\u2018|/.source +
  //   // Any
  //   // • - u2022 - bullet
  //   // ✽ - u273d - heavy teardrop-spoked asterisk
  //   /\u2022|/.source +
  //   /\u273d|/.source +
  //   // End
  //   // " - Double quote
  //   // , - Comma
  //   // . - Dot
  //   // ” - u201d - right double quotation mark
  //   // ’ - u2019 - right single quotation mark
  //   /"$|/.source +
  //   /,$|/.source +
  //   /.$|/.source +
  //   /\u201d$|/.source +
  //   /\u2019$|/.source,
  // "g"

  // Ends with: , - comma
  if (quote.match(/(,$).*/)) {
    quote = quote.slice(0, -1);
  }

  // Contains • - u2022 - bullet
  quote = quote.replace(/\u2022/g, '');

  // Contains ✽ - u273d - heavy teardrop-spoked asterisk
  quote = quote.replace(/\u273d/g, '');
  if (quote.match(/\u273d/g)) {
    console.log(quote.match(/\u273d/g));
    // quote = quote.slice(1, -1);
  }

  // Starts and ends with: () - left / right parentheses
  if (quote.match(/(^\().*(\)$)/)) {
    quote = quote.slice(1, -1);
  }

  // Starts with: ( and doesn't contain )
  if (quote.match(/^\(/) && !quote.match(/\)/g)) {
    quote = quote.slice(1, 0);
  }

  // Starts and ends with: " - Double quote
  if (quote.match(/(^").*("$)/)) {
    quote = quote.slice(1, -1);
  }

  // Starts and ends with: “” - left / right double quotation mark
  // and doesn't contain them within the quote
  if (
    quote.match(/(^\u201c).*(\u201d$)/) &&
    quote.match(/\u201c/g).length === 1 &&
    quote.match(/\u201d/g).length === 1
  ) {
    quote = quote.slice(1, -1);
  }

  // Ends with: ” - right double quotation mark
  // and doesn't contain “” within the quote
  if (
    quote.match(/\u201d$/) &&
    !quote.match(/\u201c/g) &&
    quote.match(/\u201d/g).length === 1
  ) {
    quote = quote.slice(0, -1);
  }

  // Starts and ends with: ‘’ - left / right single quotation mark
  // and doesn't contain the left quote more than once
  if (
    quote.match(/(^\u2018).*(\u2019$)/) &&
    quote.match(/\u2018/g).length === 1
  ) {
    quote = quote.slice(1, -1);
  }

  const dashRegex = new RegExp(
    '' +
      // - - u2014 — em dash (U + 2014)
      /(-|\u2014)/.source +
      'g'
  );
  quote = quote.replace(dashRegex, ' - ');

  // Replace multiple spaces with 1 space
  quote = quote.replace(/\s\s+/g, ' ');

  return quote.trim();
};

const parseData = data => {
  const sections = data.split('==========');
  const parsedData = sections.map(lines => {
    const splitLines = lines.trim().split('\n');
    if (!splitLines[3]) {
      return splitLines;
    }
    return {
      title: splitLines[0],
      explanation: splitLines[1],
      quote: cleanQuote(splitLines[3]),
    };
  });
  return parsedData;
};

class DataContainer extends Container {
  state = {
    loading: false,
    data: [],
    parsedData: [],
  };

  setFile = files => {
    const file = files[0];
    const reader = new FileReader();

    this.setState({ loading: true });

    if (file.type !== 'text/plain') {
      return this.setState({
        error: 'Please make sure to select a text file.',
        loading: false,
      });
    }

    reader.addEventListener(
      'load',
      () => {
        this.setState({
          loading: false,
          parsedData: parseData(reader.result),
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
