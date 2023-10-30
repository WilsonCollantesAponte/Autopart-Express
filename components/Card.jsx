import { Link } from "react-router-dom";
import { CardStyle } from "./cardStyles";

export default function Card(props) {
  return (
    <Link to={`/detail/${props.id}`} style={{ textDecoration: "none" }}>
      <CardStyle>
        <img src={props.img} alt="product" />
        <h1>{props.modelo}</h1>
        <h2>{props.precio}</h2>
      </CardStyle>
    </Link>
  );
}
