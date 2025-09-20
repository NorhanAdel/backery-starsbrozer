import { categories } from "../../Constant/cat";
import "./Categories.scss";

 

export default function Categories() {
  return (
    <section className="categories">
      <h2 className="title">الأقسام الأخرى</h2>
      <div className="grid">
        {categories.map((cat, i) => (
          <div className="category-card" key={i}>
            <img src={cat.image} alt={cat.name} />
            <div className="label">{cat.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
