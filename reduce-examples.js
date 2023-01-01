// Reduce
// iterates, callback function
// reduces to a single value - number, array, object
// 1st parameter ('acc') - total of all calculations
// 2nd parameter ('curr') - current iteration/value

const staff = [
  { name: 'bob', age: 20, position: 'developer', salary: 100 },
  { name: 'peter', age: 25, position: 'designer', salary: 300 },
  { name: 'john', age: 30, position: 'the boss', salary: 400 },
  { name: 'anna', age: 25, position: 'intern', salary: 10 },
];

const dailyTotal = staff.reduce((acc, curr) => {
  acc += curr.salary;
  console.log(acc);
  console.log(curr.salary);
  return acc;
}, 0);

console.log(dailyTotal);

// 2 EXERCISE
const cart = [
  {
    title: 'Samsung',
    price: 599.99,
    amount: 1,
  },
  {
    title: 'Google',
    price: 499.99,
    amount: 2,
  },
  {
    title: 'Apple',
    price: 699.99,
    amount: 4,
  },
  {
    title: 'Orange',
    price: 399.99,
    amount: 3,
  },
];

let { totalItems, cartTotal } = cart.reduce(
  (total, item) => {
    const { amount, price } = item;
    // count items
    total.totalItems += amount;
    // count sum
    total.cartTotal += price * amount;
    return total;
  },
  {
    totalItems: 0,
    cartTotal: 0,
  }
);

cartTotal = parseFloat(cartTotal.toFixed(2));
console.log(totalItems, cartTotal);

// 2 EXERCISE

// const url = 'https://api.github.com/users/john-smilga/repos?per_page=10'
// let arr = []
// fetch(url).then(response => response.json())
// .then(response=> console.log(response))

// console.log(arr);

// returning obj from an array
let stats = [
  {
    _id: 'interview',
    count: 26,
  },
  {
    _id: 'declined',
    count: 20,
  },
  {
    _id: 'pending',
    count: 29,
  },
];

let bo = stats.reduce((acc, curr) => {
  const { _id: status, count } = curr;
  acc[status] = count;
  return acc;
}, {});

console.log(bo);

// DYNAMIC OBJECTS KEYS
const person = {
  name: 'matteo',
};
person.age = 20;

const items = {
  'list-of-items': ['item1', 'item2'],
  price: 253,
};

console.log(items['list-of-items']);
console.log(person['name']);

let appState = 'loading';
const keyName = 'nome';
const app = {
  [appState]: true,
};
app[keyName] = 'matteo';

console.log(app);

// PRACTICAL EXAMPLE

const state = {
  loading: true,
  name: '',
  job: '',
};

const updateState = (key, value) => {
  state[key] = value;
};

updateState('name', 'matteo');
updateState('totalProjects', 10);

console.log(state);
