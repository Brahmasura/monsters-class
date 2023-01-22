import { Component } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  // componentDidMount method, basically it loads up the stuff we need at the beginning
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(() => {
          return { monsters: users };
        })
      );
  }

  // optimization 1: initializing a function to the input change, for the purpose of optimization, as keeping this whole anonymous function inside
  // 'onChange' is just gonna make the function again n again, but now whenever that event gets triggered, it'll only have referrence
  // to this 'onSearchChange' function and will be executed quickly

  onSearchChange = (e) => {
    const searchField = e.target.value.toLocaleLowerCase();

    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    //optimization 2: destructuring the properties, so that we don't have to write this. again n again in front of the properties field
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    //  doing the filtering outside the 'onChange' function so that our original 'monsters' array won't get affected
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        
        <h1 className="app-title">Raakchasss...</h1>
        <SearchBox
          className="monster-search-box"
          onChangeHandler={onSearchChange}
          placeholder="search monsters"
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
