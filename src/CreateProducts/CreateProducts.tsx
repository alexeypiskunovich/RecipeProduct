import React, { useState, useRef } from 'react';
import { Box, Button, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Redux/redux-store';
import { addRecipe } from '../Redux/recipe-reducer';

const CreateProducts: React.FC = () => {
    const [name, setName] = useState('');
    const [instructions, setInstructions] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [open, setOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch<AppDispatch>();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !instructions) {
            alert('Please fill out all fields.');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const newRecipe = {
                idMeal: Date.now().toString(),
                strMeal: name,
                strInstructions: instructions,
                strMealThumb: reader.result as string,
            };

            dispatch(addRecipe(newRecipe));

            setName('');
            setInstructions('');
            setImage(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            setOpen(true);
        };

        if (image) {
            reader.readAsDataURL(image);
        } else {
            alert('Please upload an image.');
        }
    };

    return (
        <Box sx={{ padding: 2, marginTop: '80px' }}>
            <Typography variant="h4" component="div" sx={{ mb: 2 }}>
                Create Recipe
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Dish Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Preparation"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    required
                    sx={{ mb: 2 }}
                />
                <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    ref={fileInputRef}
                    required
                />
                <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                    Create Recipe
                </Button>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Recipe successfully added!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CreateProducts;

