import React from "react";
import "./CategoryFilter.scss";
import {
  GiHoneyJar,
  GiCheeseWedge,
  GiButter,
  
  GiPieSlice,  
  GiOlive,
 
} from "react-icons/gi";
 
import { FaBreadSlice } from "react-icons/fa";
import { PiJarThin } from "react-icons/pi";
import { PiBreadBold } from "react-icons/pi";
const categories = [
  { name: "عسل", icon: <GiHoneyJar color="#D97706" /> },
  { name: "جبنه", icon: <GiCheeseWedge color="#FACC15" /> },
  { name: "طحينه", icon: <PiJarThin color="#A16207" /> },
  { name: "سمنه", icon: <GiButter color="#FCD34D" /> },
  { name: "منين", icon: <FaBreadSlice color="#92400E" /> },

  { name: "فطير", icon: <GiPieSlice color="#FBBF24" /> },
  { name: "خبز", icon: <PiBreadBold color="#78350F" /> },
  { name: "زيت زيتون", icon: <GiOlive color="#65A30D" /> },
];

const CategoryFilter = ({ selectedCategory, onCategorySelect }) => {
  return (
    <div className="category-filter">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`category-item ${
            selectedCategory === category.name ? "active" : ""
          }`}
          // onClick={() => onCategorySelect(category.name)}
        >
          <div className="icon">{category.icon}</div>
          <span>{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
