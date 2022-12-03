import Link from "next/link";
import { fetchAPI } from "../lib/api";
import { StrapiData } from "../lib/models/api";
import { Asset } from "../lib/models/asset";

interface Inputs {
  assets: { id: number; attributes: { name: string } }[];
}

export default function Home({ assets }: Inputs) {
  return (
    <div>
      <Link href="assets">Assets</Link>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await fetchAPI<StrapiData<Asset>[]>(`assets`);

  return {
    props: { assets: data },
  };
}
