import React, { Component, Fragment } from 'react';
import './App.css';
import { Provider, Subscribe } from 'unstated';
import DataContainer from './DataContainer';

class FileUpload extends Component {
  render() {
    const { data } = this.props;
    return (
      <form>
        <input
          type="file"
          onChange={event => data.setFile(event.target.files)}
        />
        {/* <button type="submit">Upload</button> */}
      </form>
    );
  }
}

const Books = ({ parsedData }) => {
  console.log(parsedData);
  const parsedBooks = [...new Set(parsedData.map(item => item.title).sort())];

  return (
    <Fragment>
      <h3>Books ({parsedBooks.length})</h3>
      {parsedBooks.map(title => {
        return <div key={title}>{title}</div>;
      })}
    </Fragment>
  );
};

const Quotes = ({ parsedData }) => {
  const parsedQuotes = [...new Set(parsedData.map(item => item.quote).sort())];

  return (
    <Fragment>
      <h3>Quotes ({parsedQuotes.length})</h3>
      {parsedQuotes.map((quote, index) => {
        return <div key={index}>{quote}</div>;
      })}
    </Fragment>
  );
};

const App = () => (
  <Provider>
    <Subscribe to={[DataContainer]}>
      {data => (
        <Fragment>
          <header>
            <div className="wave" />
            <h1>
              Kindle Notes<br /> Visualiser
            </h1>
          </header>

          <h2>1) Select your notes</h2>
          <FileUpload data={data} />

          {data.state.parsedData && data.state.parsedData.length ? (
            <Fragment>
              <h2>2) Parsing options</h2>
              <Books parsedData={data.state.parsedData} />
              <Quotes parsedData={data.state.parsedData} />
            </Fragment>
          ) : null}
        </Fragment>
      )}
    </Subscribe>
  </Provider>
);

export default App;
