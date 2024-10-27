import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['category', 'subcategory', 'topic'],
        required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    active: {
        type: Boolean,
        default: true
    }
});

export const Category = mongoose.model('Category', categorySchema);

