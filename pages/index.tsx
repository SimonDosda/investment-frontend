import { fetchAPI } from "../lib/api";
import { StrapiData } from "../lib/models/api";
import { Asset } from "../lib/models/asset";

interface Inputs {
  assets: { id: number; attributes: { name: string } }[];
}

export default function Home({ assets }: Inputs) {
  return (
    <div>
      {assets.map(({ id, attributes }) => (
        <p key={id}>{attributes.name}</p>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await fetchAPI<StrapiData<Asset>[]>(`assets`);

  return {
    props: { assets: data },
  };
}
