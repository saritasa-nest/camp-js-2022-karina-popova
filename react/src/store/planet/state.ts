import { Planet } from 'src/models/planet';

/**
 * Planets state.
 */
export interface PlanetsState {
  /** Planets. */
  readonly planets: Planet[];
  /** Planets loading status. */
  readonly isLoading: boolean;
}

export const initialPlanetsState: PlanetsState = {
  planets: [],
  isLoading: false,
};
