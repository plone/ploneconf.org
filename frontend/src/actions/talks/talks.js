/**
 * Sponsors actions
 * @module actions/sponsors/sponsors
 */

import { LIST_TALKS } from '../../constants/ActionTypes';

/**
 * List Sponsors function.
 * @function listSponsors
 * @returns {Object} List Sponsors action.
 */
export function listTalks() {
  return {
    type: LIST_TALKS,
    request: {
      op: 'get',
      path: '@talks',
    },
  };
}
