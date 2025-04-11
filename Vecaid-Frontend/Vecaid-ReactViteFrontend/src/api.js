const BASE_URL = import.meta.env.VITE_API_URL;

fetch(`${BASE_URL}/account`, {
  method: "POST",
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
