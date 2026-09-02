export interface Pet {
  id: number;
  name: string;
  breed: string;
  age?: string;
  image: string;
}

export const pets: Pet[] = [
  { id: 1, name: "Yuki",  breed: "Scottish Fold", age: "5 Months (Kitten)", image: "/images/pets/yuki.png" },
  { id: 2, name: "Snow",  breed: "Scottish Fold", age: "6 Months (Kitten)", image: "/images/pets/snow.png" },
  { id: 3, name: "Haru",  breed: "Scottish Fold", image: "/images/pets/haru1.png" },
  { id: 4, name: "Lara",  breed: "Scottish Fold", image: "/images/pets/lara.png" },
  { id: 5, name: "Chewy", breed: "Scottish Fold", image: "/images/pets/chewy.png" },
  { id: 6, name: "Patch", breed: "Scottish Fold", image: "/images/pets/patch.png" },
  { id: 7, name: "Nidra", breed: "Scottish Fold", image: "/images/pets/nidra.png" },
  { id: 8, name: "Kyomie",breed: "Scottish Fold", image: "/images/pets/kyomie.png" },
  { id: 9, name: "Iris",  breed: "Scottish Fold", image: "/images/pets/iris.png" },
];

export const categories = [
  { label: "Cat",       image: "/images/categories/cat.png" },
  { label: "Guinea Pig",image: "/images/categories/guinea-pig.png" },
  { label: "Dog",       image: "/images/categories/dog.png" },
  { label: "Rabbit",    image: "/images/categories/rabbit.png" },
];

export const popularFriends = [
  { name: "Kaki",   breed: "", image: "/images/pets/kaki.png" },
  { name: "Yanna",  breed: "", image: "/images/pets/yanna.png" },
  { name: "Lebron", breed: "", image: "/images/pets/lebron.png" },
  { name: "Haru",   breed: "", image: "/images/pets/haru1.png" },
  { name: "Mimi",   breed: "", image: "/images/pets/mimi.png" },
];