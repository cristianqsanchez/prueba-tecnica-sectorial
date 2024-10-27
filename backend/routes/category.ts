import express from 'express';
import {
    createCategory,
    listCategories,
    deleteCategory,
    desactivateCategory
} from '../controllers/category';

const router = express.Router();

router.post('/categories', createCategory);
router.get('/categories', listCategories);
router.delete('/categories/:id', deleteCategory);
router.patch('/categories/:id/desactivate', desactivateCategory);

export default router;

