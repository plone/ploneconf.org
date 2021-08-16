/**
 * Sponsors actions
 * @module actions/sponsors/sponsors
 */

import { LIST_SPONSORS } from '../../constants/ActionTypes';

/**
 * List Sponsors function.
 * @function listSponsors
 * @returns {Object} List Sponsors action.
 */
export function listSponsors() {
  return {
    type: LIST_SPONSORS,
    request: {
      op: 'get',
      path: '@sponsors',
    },
  };
}
