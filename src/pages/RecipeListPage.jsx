import { useState, useMemo } from "react";
import {
  Box,
  Center,
  Heading,
  Input,
  SimpleGrid,
  AspectRatio,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { SearchIcon } from "@chakra-ui/icons";

export const RecipeListPage = ({ recipes, handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };

  const filteredRecipes = useMemo(() => {
    if (searchTerm.trim() === "") {
      return recipes;
    } else {
      return recipes.filter((hit) => {
        const recipe = hit.recipe;
        const lowercasedRecipeName = recipe.label.toLowerCase();
        const healthLabels = recipe.healthLabels.map((label) =>
          label.toLowerCase()
        );

        return (
          lowercasedRecipeName.includes(searchTerm.toLowerCase()) ||
          healthLabels.includes(searchTerm.toLowerCase())
        );
      });
    }
  }, [recipes, searchTerm]);

  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${encodeURIComponent(recipe.uri)}`, {
      state: { recipe },
    });
  };

  return (
    <Box p={4} bg="blue.300" minHeight="100vh">
      <Box textAlign="center" mb={4}>
        <Heading color="white" mb={2}>
          Sandra Recipe App
        </Heading>
        <Input
          type="text"
          placeholder="Search by recipe name or health label"
          value={searchTerm}
          onChange={handleSearchChange}
          maxWidth="400px"
          mx="auto"
          mb={2}
        />
        <IconButton
          icon={<SearchIcon />}
          aria-label="Search"
          colorScheme="blue"
          size="lg"
        />
      </Box>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
        {filteredRecipes.map((hit) => {
          const recipe = hit.recipe;
          console.log("2nd recipe:", recipe);
          console.log("recipe.uri:", recipe.uri);

          return (
            <Box
              key={recipe.uri}
              as={Link}
              to={`/recipe/${encodeURIComponent(recipe.uri)}`}
              style={{ textDecoration: "none" }}
              height="auto"
              borderWidth="2px"
              borderRadius="md"
              p={5}
              overflow="hidden"
              _hover={{ cursor: "pointer", backgroundColor: "gray.100" }}
              onClick={() => handleRecipeClick(recipe)}
            >
              <AspectRatio ratio={4 / 3}>
                <Box
                  background={`url(${recipe.image}) no-repeat center center`}
                  bgSize="cover"
                />
              </AspectRatio>
              <Center>
                <Heading as="h4" size="md" my={4}>
                  <Text color="purple.900">{recipe.label}</Text>
                </Heading>
              </Center>
              {recipe.dietLabels.length > 0 && (
                <Center>
                  <Text color="gray.700" mb={2}>
                    Diet Label: {recipe.dietLabels.join(", ")}
                  </Text>
                </Center>
              )}
              {recipe.cautions.length > 0 && (
                <Center>
                  <Text color="pink.600" mb={2}>
                    Cautions: {recipe.cautions.join(", ")}
                  </Text>
                </Center>
              )}
              {recipe.mealType && recipe.mealType.length > 0 && (
                <Center>
                  <Text color="gray.800" mb={2}>
                    Meal Type: {recipe.mealType.join(", ")}
                  </Text>
                </Center>
              )}

              {recipe.dishType && recipe.dishType.length > 0 && (
                <Center>
                  <Text color="gray.800">
                    Dish Type: {recipe.dishType.join(", ")}
                  </Text>
                </Center>
              )}
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default RecipeListPage;
