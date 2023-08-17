import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function App() {
  const APP_ID = "963a15a3";
  const APP_KEY = "40b302181f915b8862858d2eead11d65";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <Container
      style={{ width: "100vh", margin: "0", padding: "0" }}
    >
      <Container style={{width: "90%", padding: "4rem", marginLeft: "50vh"}} >
        <Form style={{display: "flex"}} onSubmit={getSearch}>
              <Form.Control
                type="text"
                id="full-name"
                name="full-name"
                placeholder="Search for a recipe!"
                value={search}
                onChange={updateSearch}
              />
              <Container>
              <Button
                type="submit"
                class="border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Search
              </Button>
              </Container>
        </Form>
      </Container>
      <Container>
        <section class="text-gray-600 body-font">
          <div class="container">
            <div class="flex flex-wrap -m-4 w-4/5 mx-auto">
              {recipes.map((recipe) => (
                <Recipe key={recipe.recipe.label} recipe={recipe.recipe} />
              ))}
            </div>
          </div>
        </section>
      </Container>
    </Container>
  );
}

export default App;
