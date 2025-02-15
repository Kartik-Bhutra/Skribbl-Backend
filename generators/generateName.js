export default function () {
  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Eve",
    "Frank",
    "Grace"
  ];
  return names[Math.floor(Math.random() * names.length)];
}