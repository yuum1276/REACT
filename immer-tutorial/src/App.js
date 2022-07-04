import { useRef, useState, useCallback } from "react";
import produce from "immer"; //immer에서 제공하는 produce를 이용하여 불변성

function App() {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: "", username: "" });
  const [data, setData] = useState({
    array: [],
    uselessValue: null,
  });

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setForm(
        produce(form, (draft) => {
          draft[name] = value;
        })
      );
    },
    [form]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username,
      };

      setData({
        ...data,
        array: data.array.concat(info),
      });

      setForm({
        name: "",
        username: "",
      });

      nextId.current += 1;
    },
    [data, form.name, form.username]
  );

  const handleRemove = useCallback(
    (id) => {
      setData({
        ...data,
        array: data.array.filter((info) => info.id !== id),
      });
    },
    [data]
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        placeholder="아이디"
        value={form.username}
        onChange={handleChange}
      />
      <input
        name="name"
        placeholder="이름"
        value={form.name}
        onChange={handleChange}
      />
      <button type="submit">등록</button>
      <ul>
        {data.array.map((info) => (
          <li key={info.id} onClick={() => handleRemove(info.id)}>
            {info.username} {info.name}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default App;
