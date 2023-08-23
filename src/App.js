import { useState } from "react";
import { convertArrayToCSV } from 'convert-array-to-csv';
import "./App.css";
import { createFile } from "./service/file";
import { generate } from "./service/generator";

function App() {
  const [links, setLinks] = useState({});
  
  const handleClick = () => {
    const [titles, credits] = generate();

    const titlesFile = createFile(convertArrayToCSV(titles));
    const creditsFile = createFile(convertArrayToCSV(credits));
  
    setLinks({ "titles.csv": titlesFile, "credits.csv": creditsFile });
  };

  const linksEntries = Object.entries(links);

  return (
    <div className="App">
      <button onClick={handleClick}>Generate</button>

      {linksEntries.length ? (
        <div>
          Download files:
          {linksEntries.map(([name, link]) => (
            <div key={link}>
              <a download={name} href={link} key={name}>
                {name}
              </a>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
