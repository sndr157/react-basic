import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  List,
  ListItem,
  Divider,
} from "@chakra-ui/react";

export const RecipePage = () => {
  const location = useLocation();
  const recipe = location?.state?.recipe;

  console.log("Recipe:", recipe);

  // Disable caching for this component
  React.useEffect(() => {
    window.history.replaceState({}, document.title, location.pathname);
  }, [location.pathname]);

  if (!recipe) {
    // Recipe not found, navigate back to recipes overview
    return null;
  }

  const {
    label,
    image,
    dishType,
    totalTime,
    dietLabels,
    healthLabels,
    cautions,
    ingredientLines,
    yield: servings,
    totalNutrients,
  } = recipe;

  return (
    <Box p={4} bg="blue.300" minHeight="100vh">
      <Button bg="green.100" as={Link} to="/" mb={4}>
        Back to Recipes Overview
      </Button>
      <Heading as="h2" size="xl" mb={4} color="purple.900">
        {label}
      </Heading>
      <Image src={image} alt={label} borderRadius="md" mb={4} maxWidth="50%" />

      {dietLabels.length > 0 && (
        <Text fontSize="md" color="green.100">
          {dietLabels.join(", ")}
        </Text>
      )}

      <Divider my={4} />
      <Text fontSize="lg" fontWeight="semibold">
        Dish Type: {dishType.join(", ")}
      </Text>

      <Text>Total Cooking Time: {totalTime} minutes</Text>

      <Text>Health Labels: {healthLabels.join(", ")}</Text>

      {cautions.length > 0 && (
        <Text fontSize="md" color="pink.100" mb={3}>
          {cautions.join(", ")}
        </Text>
      )}

      <Heading as="h3" size="md" mt={4} mb={3}>
        Ingredients:
      </Heading>
      <List>
        {ingredientLines.map((ingredient, index) => (
          <ListItem key={index}>{ingredient}</ListItem>
        ))}
      </List>

      <Text>Servings: {servings}</Text>

      <Heading as="h3" size="md" mt={4} mb={2}>
        Total Nutrients:
      </Heading>
      <List>
        {Object.entries(totalNutrients).map(([key, nutrient]) => (
          <ListItem key={key}>
            {nutrient.label}: {nutrient.quantity.toFixed(2)} {nutrient.unit}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RecipePage;

