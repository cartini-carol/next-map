import { prisma } from "utils/db";
import { Maps } from "./_components/map";

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
    <div className="relative w-screen h-screen box-border flex flex-col">
      <div className="basis-16 flex flex-row justify-between items-center pr-10 pl-10">
        <div className="">hihi</div>
        <div className="">bye</div>
      </div>
      <div className="w-full h-full">
        <Maps data={repairShop} />
      </div>
    </div>
  );
}
