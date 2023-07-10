import {
  RepairShop,
  RepairShop_repairshopstatustype_enum,
} from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { prisma } from "utils/db";

interface IRepairShopResponse {
  repairShopList?: RepairShop[];
}

interface getQuery {
  repairShopStatusType: keyof typeof RepairShop_repairshopstatustype_enum;
}

/**
 *
 * @param param0
 * @returns
 */
export const GET = async (query?: getQuery) => {
  const repairShopList = await prisma.repairShop.findMany({
    where: {
      ...(query && { ...query }),
    },
  });

  return NextResponse.json({
    repairShopList: repairShopList.length > 0 ? repairShopList : undefined,
  });
};
