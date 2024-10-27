import mongoose from 'mongoose';
import { Category } from '../models/category';

export const createCategory = async (req, res) => {
  try {
    const { name, type, parent } = req.body;

    if (type === 'subcategory' && !parent) {
      return res.status(400).json({ error: 'A subcategory must have a parent category' });
    }

    if (type === 'topic' && !parent) {
      return res.status(400).json({ error: 'A topic must have a parent subcategory' });
    }

    const parentId = parent ? new mongoose.Types.ObjectId(parent) : null;
    const category = new Category({ name, type, parent: parentId });
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listCategories = async (req, res) => {
  try {
    const categories = await Category.find({ active: true }).populate('parent');
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    const hasChildren = await Category.exists({ parent: id });
    if (hasChildren) return res.status(400).json({ error: 'Cannot delete a category that has children' });
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const desactivateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    await desactivateChildren(category._id);

    res.status(200).json({ message: 'Category and its children desactivated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const desactivateChildren = async (parentId) => {
  const children = await Category.find({ parent: parentId });
  for (const child of children) {
    child.active = false;
    await child.save();
    await desactivateChildren(child._id);
  }
};

