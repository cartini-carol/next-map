import { NextPage } from "next";
import { Maps } from "./_components/map";

export const metadata = {
  title: "캐지도",
};

const MapPage: NextPage = () => {
  return <Maps />;
};

export default MapPage;
