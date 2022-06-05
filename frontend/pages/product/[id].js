import { useRouter } from "next/router";
import SingleProduct from "../../components/SingleProduct.js";

export default function SingleProductPage({ query }) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <SingleProduct id={id} />;
    </div>
  );
}
