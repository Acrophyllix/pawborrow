import { popularFriends } from "../assets/pets";

interface FilterGroupProps {
  title: string;
  items: { label: string; count: number }[];
  selected?: string;
  onSelect: (label: string) => void;
}

function CheckboxFilterGroup({ title, items, selected, onSelect }: FilterGroupProps) {
  return (
    <div className="filter-group">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.label}>
            <label>
              <input
                type="checkbox"
                checked={selected === item.label}
                onChange={() => onSelect(item.label)}
              />
              <span>{item.label}</span>
            </label>
            <span className="filter-count">{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const categoryItems = [
  { label: "Cat", count: 21 },
  { label: "Dog", count: 28 },
  { label: "Guinea Pig", count: 12 },
  { label: "Rabbits", count: 60 },
  { label: "Pet Food", count: 60 },
  { label: "Bed & Comfort", count: 60 },
  { label: "Pet Toys", count: 60 },
];

const breedItems = [
  { label: "Persian", count: 28 },
  { label: "Siamese", count: 18 },
  { label: "Scottish Fold", count: 16 },
  { label: "Domestic Shorthair Kitten", count: 40 },
  { label: "Japanese Bobtail", count: 28 },
  { label: "Sphynx", count: 18 },
];

const personalityTags = [
  "Friendly", "Playful", "Quiet", "Obedient", "Shy", "Loyal",
];

interface Props {
  selectedCategory: string;
  selectedBreed: string;
  onSelectCategory: (label: string) => void;
  onSelectBreed: (label: string) => void;
}

export default function PetsFilterSidebar({
  selectedCategory,
  selectedBreed,
  onSelectCategory,
  onSelectBreed,
}: Props) {
  return (
    <aside className="pets-filter-sidebar">
      <CheckboxFilterGroup
        title="Filter by categories"
        items={categoryItems}
        selected={selectedCategory}
        onSelect={onSelectCategory}
      />

      <CheckboxFilterGroup
        title="Filter by breed"
        items={breedItems}
        selected={selectedBreed}
        onSelect={onSelectBreed}
      />

      <div className="filter-group">
        <h3>Filter by personality</h3>
        <div className="personality-tags">
          {personalityTags.map((tag) => (
            <button key={tag} className="personality-tag">
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h3>Popular Paw Friend</h3>
            <ul className="popular-friends">
                {popularFriends.map((friend) => (
                <li key={friend.name}>
                <img src={friend.image} alt={friend.name} className="friend-thumb" />
                                <div>
                                <strong>{friend.name}</strong>
                                <span>Breed: {friend.breed || "—"}</span>
        </div>
    </li>
  ))}
</ul>
      </div>
    </aside>
  );
}