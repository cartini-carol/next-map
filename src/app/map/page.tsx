import { RepairShop } from "@prisma/client";
import { prisma } from "utils/db";
import { Maps } from "./_components/map";

export const metadata = {
  title: "캐지도",
};

export default async function MapPage() {
  let repairShop = await prisma.repairShop.findMany({});

  return <Maps data={repairShop} />;
}
