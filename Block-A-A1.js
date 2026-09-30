const items = [  { id: 1, name: "Basic", category: "Beginner", price: 800, stock: 30 },
  { id: 2, name: "Pro", category: "Advanced", price: 1500, stock: 10 },
  { id: 3, name: "Yoga Flow", category: "Wellness", price: 1000, stock: 0 },
  { id: 4, name: "Cardio Blast", category: "Beginner", price: 900, stock: 15 },
  { id: 5, name: "Strength+", category: "Advanced", price: 1800, stock: 5 },];


  const answer1 = items.filter(({ price, stock }) => price > 1000 && stock > 0).map(({ name }) => name);


const sum = items.reduce((total, { price, stock }) => total + price * stock, 0);

const answer3 = items.find(({ id }) => id === 5);
 const answer4 = { ...answer1, stock: answer1.stock + 1 };


const { name, price, ...others } = items[0];

console.log(answer1);
console.log(sum);
console.log(answer3);
console.log(answer4);
