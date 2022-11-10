import {
  DeployPool
} from '../../generated/MasterDeployer/MasterDeployer'
import { CONSTANT_PRODUCT_POOL_FACTORY_ADDRESS, PairType, STABLE_POOL_FACTORY_ADDRESS } from '../constants'
import { createPair } from '../functions/pair'



export function onDeployPool(event: DeployPool): void {

  if (event.params.factory == CONSTANT_PRODUCT_POOL_FACTORY_ADDRESS) {
    createPair(event, PairType.CONSTANT_PRODUCT_POOL)
  } else if (event.params.factory == STABLE_POOL_FACTORY_ADDRESS) {
    createPair(event, PairType.STABLE_POOL)
  }

}