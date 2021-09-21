from collections import defaultdict
from plone import api
from plone.restapi.interfaces import ISerializeToJsonSummary
from plone.restapi.services import Service
from ploneconf.core.vocabularies.sponsorship import LEVELS
from typing import Any
from typing import Dict
from typing import List
from zope.component import getMultiAdapter


class Get(Service):
    """List Sponsors by level."""

    def _serialize_brain(self, brain) -> Dict[str, Any]:
        obj = brain.getObject()
        return getMultiAdapter((obj, self.request), ISerializeToJsonSummary)()

    def get_sponsors(self) -> Dict[str, List[Dict[str, str]]]:
        """Return all published sponsors, grouped by level."""
        response = defaultdict(list)
        results = api.content.find(
            portal_type="Sponsor",
            review_state="published",
            sort_on="getObjPositionInParent",
        )
        for brain in results:
            response[brain.level].append(self._serialize_brain(brain))
        return response

    def reply(self) -> Dict[str, List[Dict]]:
        """Published sponsors, grouped by level.

        :returns: Sponsors grouped by level.
        """
        all_sponsors = self.get_sponsors()
        levels = []
        for key, title in LEVELS:
            sponsors = all_sponsors.get(key, [])
            if sponsors:
                levels.append({"id": key, "title": title, "items": sponsors})
        return {
            "levels": levels,
        }
