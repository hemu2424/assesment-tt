import express from 'express';
import { z } from 'zod';

const app = express();
const PORT = 4000;

const books = [
  { id: 1, name: 'Basic', category: 'Beginner', stock: 30, price: 800 },
  { id: 2, name: 'Pro', category: 'Advanced', stock: 10, price: 1500 },
  { id: 3, name: 'Yoga Flow', category: 'Wellness', stock: 0, price: 1000 },
  { id: 4, name: 'Cardio Blast', category: 'Beginner', stock: 15, price: 900 },
  { id: 5, name: 'Strength+', category: 'Advanced', stock: 5, price: 1800 },
];

const createBookSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  category: z.string().trim().min(1, 'Category is required'),
  stock: z
    .number({ invalid_type_error: 'Stock must be a number' })
    .int('Stock must be an integer')
    .min(0, 'Stock must be at least 0'),
  price: z
    .number({ invalid_type_error: 'Price must be a number' })
    .positive('Price must be positive')
    .max(2000, 'Price must not exceed 2000'),
});



app.use(express.json());

app.get('/books', (req, res) => {
  const { category } = req.query;

  if (!category) {
    return res.json(books);
  }

  const filter = String(category).toLowerCase();
  const filteredBooks = books.filter((book) => book.category.toLowerCase() === filter);

  return res.json(filteredBooks);
});

app.get('/books/:id', (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((item) => item.id === id);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  return res.json(book);
});

app.post('/books', (req, res) => {
  const result = createBookSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues.map((issue) => issue.message),
    });
  }

  const newBook = {
    id: books.length ? Math.max(...books.map((book) => book.id)) + 1 : 1,
    ...result.data,
  };

  books.push(newBook);

  return res.status(201).json(newBook);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
