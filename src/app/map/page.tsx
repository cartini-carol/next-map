import { prisma } from "utils/db";
import { Maps } from "./_components/map";
import { SearchForm } from "./_components/search";

export const metadata = {
  title: "캐지도",
};

export default async function MapPage() {
  let repairShop = await prisma.repairShop.findMany({
    where: {
      repairShopStatusType: "OPERATION",
    },
    select: {
      displayName: true,
      repairShopFranchiseType: true,
      RepairShopOption: true,
      lat: true,
      lng: true,
    },
  });

  return (
    <>
      <Maps data={repairShop} />
      <SearchForm />
    </>
  );
}
