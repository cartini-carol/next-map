import { prisma } from "utils/db";
import { MapHeaders } from "./_components/headers";
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
      id: true,
      displayName: true,
      repairShopFranchiseType: true,
      RepairShopOption: {
        select: {
          options: true,
        },
      },
      lat: true,
      lng: true,
    },
  });

  return (
    <div className="w-full h-full">
      {/* <MapHeaders /> */}

      <Maps data={repairShop} />
    </div>
  );
}
