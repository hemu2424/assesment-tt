import { useEffect, useMemo, useState } from 'react';

const initialBooks = [
  { id: 1, name: 'Basic', category: 'Beginner', stock: 30, price: 800 },
  { id: 2, name: 'Pro', category: 'Advanced', stock: 10, price: 1500 },
  { id: 3, name: 'Yoga Flow', category: 'Wellness', stock: 0, price: 1000 },
  { id: 4, name: 'Cardio Blast', category: 'Beginner', stock: 15, price: 900 },
  { id: 5, name: 'Strength+', category: 'Advanced', stock: 5, price: 1800 },
];

function BookList({ items }) {
  return (
    <div>
      {items.length === 0 ? (
        <p>No books found</p>
      ) : (
        items.map((book) => (
          <div key={book.id}>
            <div>
              <h3>{book.name}</h3>
              {book.stock === 0 && <span>Out of stock</span>}
            </div>
            <p>₹{book.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default function App() {
  const [books, setBooks] = useState(initialBooks);
  const [query, setQuery] = useState('');
  const [formData, setFormData] = useState({ name: '', price: '' });

  const filteredBooks = useMemo(() => {
    const searchText = query.trim().toLowerCase();

    if (!searchText) {
      return books;
    }

    return books.filter((book) => book.name.toLowerCase().includes(searchText));
  }, [books, query]);

  useEffect(() => {
    document.title = `Library (${filteredBooks.length})`;
  }, [filteredBooks.length]);

  const nameError = formData.name.trim().length > 0 && formData.name.trim().length < 3;
  const priceError = formData.price !== '' && Number(formData.price) <= 0;
  const isSubmitDisabled =
    formData.name.trim().length < 3 || formData.price === '' || Number(formData.price) <= 0;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = formData.name.trim();
    const price = Number(formData.price);

    if (name.length < 3 || price <= 0) {
      return;
    }

    const newBook = {
      id: Date.now(),
      name,
      category: 'General',
      stock: 10,
      price,
    };

    setBooks((prevBooks) => [newBook, ...prevBooks]);
    setFormData({ name: '', price: '' });
  };

  return (
    <div>
      

      <section>
        <label htmlFor="search">
          Search
          <input
            id="search"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            
          />
        </label>
      </section>

      <section>
        <h2>Add book</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter book name"
            />
            {nameError && <small>Name must be at least 3 characters.</small>}
          </label>

          <label>
            Price
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
            />
            {priceError && <small>Price must be greater than 0.</small>}
          </label>

          <button type="submit" disabled={isSubmitDisabled}>
            Add book
          </button>
        </form>
      </section>

      <section>
        <h2>Available books</h2>
        <BookList items={filteredBooks} />
      </section>
    </div>
  );
}
