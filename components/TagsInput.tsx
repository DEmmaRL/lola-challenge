import { useFormContext } from "react-hook-form";
import { useState, KeyboardEvent } from "react";
import { TagsInputProps } from "@/types/form";

const TagsInput: React.FC< TagsInputProps > = ({ name, errors, initialTags = [] }) => {
  const { setValue } = useFormContext(); 
  const [tags, setTags] = useState<string[]>(
    Array.isArray( initialTags ) ? initialTags : []
  );
  const [ inputValue , setInputValue ] = useState("") ;

  const updateTags = (newTags: string[]) => {
    setTags(newTags);
    setValue(name, newTags);
  };

  const handleFocusOut = () => {
    if (inputValue.trim() !== "") {
      const cleanInput = inputValue.replace(/,$/, "").trim();
      if (cleanInput !== "") {
        updateTags([...tags, cleanInput]);
      }
    }
    setInputValue("");
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Enter") {
      handleFocusOut();
    }
  };

  const removeTag = (index: number) => {
    if (confirm("¿Realmente deseas eliminar esta etiqueta?")) {
      updateTags(tags.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium text-gray-700">
        Etiquetas
      </label>
      <div
        className={`tags-container flex flex-wrap items-center border p-2 rounded ${
          errors ? "border-red-500" : "border-gray-300"
        }`}
      >
        {tags.map((tag, index) => (
          <span
            key={index}
            className="tag bg-blue-300 text-gray-700 px-3 py-1 mr-2 mb-2 rounded cursor-pointer relative"
            onClick={() => removeTag(index)}
          >
            {tag}
            <span className="tag-close absolute right-1 top-0.5 text-xs text-red-500">
              ×
            </span>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          placeholder="Add a skill"
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleFocusOut}
          onKeyUp={handleKeyUp}
          className="bg-gray-200 p-2 rounded outline-none flex-grow"
        />
      </div>
      {errors?.message && <p className="text-red-500 text-sm">{errors.message}</p>}
    </div>
  );
};

export default TagsInput;
