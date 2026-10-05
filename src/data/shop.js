// Mock data for Products, Orders and Customers (30 rows each, generated from small lists)
const productNames = ['MacBook Pro 15 Retina Touch Bar MV902', 'Apple Watch Series 5 Edition GPS + Cellular', 'Apple iPhone 11 Pro Max 256GB Space Gray', 'Apple iPhone 11 Pro Max 64GB Midnight Green']
const categories = ['Notebook', 'Watch', 'iPhone', 'iPhone']

export const products = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1, name: productNames[i % 4], number: '#790841', category: categories[i % 4],
  date: '12.09.20', price: '$2.500', status: i % 5 === 4 ? 'Disabled' : 'Available',
}))

const customerNames = ['Regina Cooper', 'Judith Black', 'Ronald Robertson', 'Dustin Williamson', 'Calvin Flores', 'Robert Edwards', 'Colleen Warren', 'Nathan Fox']
const locations = ['Sochi, Russia', 'France, Paris', 'Sydney, Australia', 'Germany, Berlin', 'New York, USA', 'Shanghai, China', 'Canada, Ottawa', 'London, UK']

export const customers = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1, name: customerNames[i % 8], email: customerNames[i % 8].split(' ')[0].toLowerCase() + '@example.com',
  location: locations[i % 8], phone: '+1 (070) 123-4567', date: '12.09.20', status: i % 8 === 2 ? 'Blocked' : 'Active',
}))

const payments = ['PayPal', 'Credit Card', 'Payoneer']
const orderStatuses = ['Shipped', 'Processing', 'Cancelled']

export const orders = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1, number: '#790841', customer: customerNames[(i + 3) % 8], date: '12.09.20',
  total: '$' + (145 + i * 37) + '.65', payment: payments[i % 3], status: orderStatuses[i % 7 === 0 ? 2 : i % 2],
}))

export const transactions = [
  { name: 'Devon Williamson', time: '08:00 AM - 12 August', amount: '+$1.400', type: 'Payment' },
  { name: 'Debra Wilson', time: '09:45 AM - 12 August', amount: '-$650', type: 'Refund' },
  { name: 'Judith Black', time: '10:15 AM - 12 August', amount: '+$2.050', type: 'Payment' },
  { name: 'Philip Henry', time: '10:50 AM - 12 August', amount: '+$900', type: 'Payment' },
]
