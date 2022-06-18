import axios from "axios";
const url =
  "https://apps-right-away-admin-as1-dev-westus-001.azurewebsites.net/api/";
export async function GET(value) {
  const Data = axios
    .get(url + value)
    .then((response) => {
      if (response.status == 200) return response.data;
      return "";
    })
    .catch((error) => {
      return error.response;
    });
  return await Data;
}
export async function POST(value, data) {
  console.log(data);
  const Data = axios
    .post(url + value, data)
    .then((response) => {
      if (response.status == 200) return response;
      return "";
    })
    .catch((error) => {
      return error.response;
    });
  return await Data;
}
export async function PUT(value, data) {
  console.log(data);
  const Data = axios
    .put(url + value, data)
    .then((response) => {
      if (response.status == 200) return response;
      return "";
    })
    .catch((error) => {
      return error.response;
    });
  return await Data;
}
export async function DELETE(value) {
  const Data = axios
    .delete(url + value)
    .then((response) => {
      if (response.status == 200) return response;
      return "";
    })
    .catch((error) => {
      return error.response;
    });
  return await Data;
}
export async function AllApi(apiSet) {
  const Data = Promise.all(apiSet).then((response) => {
    return response;
  });
  return await Data;
}
export function UrlImage(value) {
  let Imageurl =
    "https://strightawaydev001.blob.core.windows.net/admincategoryblob/" +
    value;
  return <img src={Imageurl} alt="icon" width={50} height={50} />;
}
