import React, { useEffect, useState } from "react";
import { Input, CircularProgress, Typography, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/redux-store";
import { fetchAllRecipes, searchLocalRecipes } from "../../Redux/recipe-reducer";

const InputField: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.recipes);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllRecipes());
    }
  }, [status, dispatch]);

  useEffect(() => {
    dispatch(searchLocalRecipes(searchTerm));
  }, [searchTerm, dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Input
        placeholder="Search for a recipe..."
        sx={{ width: { xs: '200px', md: '400px' }, marginLeft: { md: '200px' } }}
        value={searchTerm}
        onChange={handleInputChange}
      />

      {status === 'loading' && <CircularProgress />}
      {status === 'failed' && <Typography>{error}</Typography>}
    </Box>
  );
};

export default InputField;

