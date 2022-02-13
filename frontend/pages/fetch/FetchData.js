import axios from "axios";
const FetchData = async () => {
  var arr = [];
  const url = `http://localhost:8000/api/robots`;

  console.log("fetch");

  await axios
    .get(url)
    .then((res) => {
      arr = res.data.data;
    })
    .catch((errors) => {
      console.log(errors);
    });

  return arr;
};

export default FetchData;
