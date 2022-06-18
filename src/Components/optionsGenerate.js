import { GET } from "../API/api";
export default async function OptionGenerate(props) {
  let url = props.data.url;
  let id = props.data.id;
  let value = props.data.value;
  let options = props.data.options;
  let Finalvalue = [];
  url !== "nourl"
    ? await GET(url).then((response) => {
        if (response.status === 500) {
          return "";
        }
        response.map(
          (item, i) =>
            (Finalvalue[i] = {
              id: item[id],
              value: item[value],
            })
        );
      })
    : options.map(
        (item, i) =>
          (Finalvalue[i] = {
            id: item[id],
            value: item[value],
          })
      );

  return Finalvalue;
}
