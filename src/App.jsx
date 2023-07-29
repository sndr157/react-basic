import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import RecipeListPage from "./pages/RecipeListPage";
import RecipePage from "./pages/RecipePage";
import { data } from "./utils/data.js"; // Import the recipe data directly from data.js

export const App = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(data.hits);
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      // If the search term is empty, show all recipes from the original data
      setRecipes(data.hits);
    } else {
      // Filter the recipes based on the search term
      const filteredRecipes = data.hits.filter((recipe) => {
        return (
          recipe.recipe.label
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          recipe.recipe.healthLabels.some((label) =>
            label.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      });
      setRecipes(filteredRecipes);
    }
  };

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RecipeListPage recipes={recipes} handleSearch={handleSearch} />
            }
          />
          <Route path="/recipe/:id" element={<RecipePage data={recipes} />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
