import axios from "axios";
import React, { useState } from "react";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  console.log(title, description);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/create",
        {
          title: title,
          description: description,
        }
      );
      console.log(response.data);
      setTodo([...todo, response.data]);
      setDescription("");
      setTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="enter title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        type="text"
        placeholder="enter description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Create;
