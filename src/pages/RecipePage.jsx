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
  const { recipe } = location.state;

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
    <div>
      <Box p={4}>
        <Button as={Link} to="/">
          Back to Recipes Overview
        </Button>
        <Heading as="h2" size="xl" mb={4}>
          {label}
        </Heading>
        <Image src={image} alt={label} borderRadius="md" mb={4} />

        {dietLabels.length > 0 && (
          <Text fontSize="md" color="green.500">
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
          <Text fontSize="md" color="pink.500">
            {cautions.join(", ")}
          </Text>
        )}

        <Heading as="h3" size="md" mt={4} mb={2}>
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
    </div>
  );
};

export default RecipePage;
