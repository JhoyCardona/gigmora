import type { Category } from "../types";

interface Props {
  categories: Category[];
  selected: string | null;
  onSelect: (name: string | null) => void;
}

export default function CategoryFilter({ categories, selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2 justify-center px-4">
      <button
        onClick={() => onSelect(null)}
        className={`text-sm px-4 py-2 rounded-full border transition ${
          selected === null
            ? "bg-amber-500 text-white border-amber-500"
            : "bg-white text-slate-600 border-slate-200 hover:border-amber-300"
        }`}
      >
        Todas
      </button>
      {categories.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c.name)}
          className={`text-sm px-4 py-2 rounded-full border transition ${
            selected === c.name
              ? "bg-amber-500 text-white border-amber-500"
              : "bg-white text-slate-600 border-slate-200 hover:border-amber-300"
          }`}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}