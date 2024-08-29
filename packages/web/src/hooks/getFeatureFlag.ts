import useFeatureFlagStore, {
  AvailableFeatureFlags,
  parsedFeatureFlagState,
} from "@sparcs-clubs/web/common/providers/store/useFeatureFlagStore";

/**
 * Javascript function to get feature flag from .env
 * In SSR or constant declarations, use this.
 * In React Components, use useGetFlag instead.
 *
 * @param key (use NO_RELEASE as default) Feature Flag, As defined in AvailableFeatureFlags (loaded from .env)
 * @returns boolean
 * @author Jiho Park (night@sparcs.org)
 */
export const getFeatureFlag = (key: (typeof AvailableFeatureFlags)[number]) => {
  const interalFlagState = parsedFeatureFlagState;

  if (interalFlagState.DEV_MODE) return true;
  return interalFlagState.FLAGS[key];
};

/**
 * getFlag, but without key type check
 *
 * @param key string
 * @returns boolean
 * @author Jiho Park (night@sparcs.org)
 */
export const getFeatureFlagString = (key: string) => {
  const interalFlagState = parsedFeatureFlagState;

  if (interalFlagState.DEV_MODE) return true;
  if (
    interalFlagState.FLAGS[key as (typeof AvailableFeatureFlags)[number]] ===
    undefined
  ) {
    throw new Error(`Feature Flag ${key} not found.`);
  }
  return interalFlagState.FLAGS[key as (typeof AvailableFeatureFlags)[number]];
};

/**
 * React Hook to get feature flag. ONLY USE IN CLIENT COMPONENTS (USES LOCALSTORAGE)
 * In Client-Side React Components, use this.
 * In SSR or constant declarations, use getFlag instead.
 *
 * @param key (use NO_RELEASE as default) Feature Flag, As defined in AvailableFeatureFlags (loaded from .env)
 * @returns boolean
 * @author Jiho Park (night@sparcs.org)
 */
export const useGetFeatureFlag = () => {
  const interalFlagState = useFeatureFlagStore();

  return (key: (typeof AvailableFeatureFlags)[number]) => {
    if (interalFlagState.DEV_MODE) return true;
    return interalFlagState.FLAGS[key];
  };
};

/**
 * useGetFlag, but without key type check
 *
 * @param key string
 * @returns boolean
 */
export const useGetFeatureFlagString = () => {
  const interalFlagState = useFeatureFlagStore();

  return (key: string) => {
    if (interalFlagState.DEV_MODE) return true;
    if (
      interalFlagState.FLAGS[key as (typeof AvailableFeatureFlags)[number]] ===
      undefined
    ) {
      throw new Error(`Feature Flag ${key} not found.`);
    }
    return interalFlagState.FLAGS[
      key as (typeof AvailableFeatureFlags)[number]
    ];
  };
};
