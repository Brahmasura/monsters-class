import { useState, useEffect } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

// function based component
const App = () => {

  console.log("rendered");
  
  const [searchField, setSearchField] = useState("");
  const [title, setTitle] = useState('Rakshasss');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);

  // to fetch API in the beginning
  useEffect(() => {
    
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {setMonsters(users)});
     
  }, []);

  console.log("the users:", monsters);

  // to not assign the value everytime the whole component renders
  useEffect(() => {
    // filtering the initial array of monsters
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilterMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  // event binded function
  const onSearchChange = (e) => {
    const searchFieldString = e.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  // function for title change
  const onTitleChange = (e) => {
    const searchFieldString = e.target.value.toLocaleLowerCase();
    setTitle(searchFieldString);
  };

  return (
    <>
        
    <div className="App">
      <h1 className="app-title">{title} Functional</h1>
      <SearchBox
        className="monster-search-box"
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
      />
      <br />

      {/* the title box  */}
      {/* <SearchBox
        className="monster-search-box"
        onChangeHandler={onTitleChange}
        placeholder="change title"
      /> */}
      <CardList monsters={filteredMonsters} />
    </div>
    </>
  );
};

export default App;

