import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  CONCENTRATED_LIQUIDITY_POOL_FACTORY_ADDRESS,
  MASTER_DEPLOYER_ADDRESS,
} from "../constants";
import {
  ConcentratedLiquidityPool,
  ConcentratedLiquidityPoolFactory,
} from "../../generated/schema";

import { getOrCreateMasterDeployer } from "./master-deployer";

export function getOrCreateConcentratedLiquidityPoolFactory(): ConcentratedLiquidityPoolFactory {
  let factory = ConcentratedLiquidityPoolFactory.load(
    CONCENTRATED_LIQUIDITY_POOL_FACTORY_ADDRESS.toHex()
  );

  if (factory === null) {
    factory = new ConcentratedLiquidityPoolFactory(
      CONCENTRATED_LIQUIDITY_POOL_FACTORY_ADDRESS.toHex()
    );
    factory.masterDeployer = MASTER_DEPLOYER_ADDRESS.toHex();
    factory.save();

    const masterDeployer = getOrCreateMasterDeployer(MASTER_DEPLOYER_ADDRESS);
    masterDeployer.factoryCount = masterDeployer.factoryCount.plus(
      BigInt.fromI32(1)
    );
    masterDeployer.save();
  }

  return factory as ConcentratedLiquidityPoolFactory;
}

export function getOrCreateConcentratedLiquidityPool(
  id: Address
): ConcentratedLiquidityPool {
  let pool = ConcentratedLiquidityPool.load(id.toHex());

  if (pool === null) {
    const factory = getOrCreateConcentratedLiquidityPoolFactory();

    pool = new ConcentratedLiquidityPool(id.toHex());
    pool.masterDeployer = MASTER_DEPLOYER_ADDRESS.toHex();
    pool.factory = factory.id;
    pool.save();

    factory.poolCount = factory.poolCount.plus(BigInt.fromI32(1));
    factory.save();
  }

  return pool as ConcentratedLiquidityPool;
}
