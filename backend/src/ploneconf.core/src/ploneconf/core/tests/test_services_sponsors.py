from plone import api
from plone.restapi.testing import RelativeSession
from ploneconf.core.testing import PLONECONF_CORE_FUNCTIONAL_TESTING

import transaction
import unittest


SPONSORS = (
    ("diamond-1", "Sponsor 1", "diamond"),
    ("platinum-1", "Sponsor 2", "platinum"),
    ("gold-1", "Sponsor 3", "gold"),
    ("silver-1", "Sponsor 4", "silver"),
    ("bronze-1", "Sponsor 5", "bronze"),
    ("supporting-1", "Sponsor 6", "supporting"),
    ("platinum-2", "Sponsor 7", "platinum"),
    ("gold-2", "Sponsor 8", "gold"),
    ("silver-2", "Sponsor 9", "silver"),
    ("bronze-2", "Sponsor 10", "bronze"),
    ("supporting-2", "Sponsor 11", "supporting"),
    ("gold-3", "Sponsor 12", "gold"),
    ("silver-3", "Sponsor 13", "silver"),
    ("bronze-3", "Sponsor 14", "bronze"),
    ("supporting-3", "Sponsor 15", "supporting"),
    ("supporting-4", "Sponsor 16", "supporting"),
    ("supporting-5", "Sponsor 17", "supporting"),
)


class TestSponsorsService(unittest.TestCase):

    layer = PLONECONF_CORE_FUNCTIONAL_TESTING

    endpoint = "/@sponsors"

    def setUp(self):
        self.app = self.layer["app"]
        self.portal = self.layer["portal"]
        self.portal_url = self.portal.absolute_url()
        self.api_session = RelativeSession(self.portal_url)
        self.api_session.headers.update({"Accept": "application/json"})
        self.sponsors_root = self.portal.sponsors.organizations
        with transaction.manager:
            self.create_sponsors()

    def create_sponsors(self):
        with api.env.adopt_roles(["Manager"]):
            for sponsor_id, title, level in SPONSORS:
                content = api.content.create(
                    container=self.sponsors_root,
                    type="Sponsor",
                    id=sponsor_id,
                    title=title,
                    level=level,
                )
                api.content.transition(content, "publish")

    def test_get_sponsors_as_anonymous(self):
        response = self.api_session.get(self.endpoint)
        self.assertEqual(200, response.status_code)

    def test_get_sponsors_values(self):
        response = self.api_session.get(self.endpoint)
        response = response.json()
        self.assertEqual(len(response["levels"]), 7)
        levels = response["levels"]
        diamond = levels[0]
        self.assertEqual(len(diamond["items"]), 1)
        platinum = levels[1]
        self.assertEqual(len(platinum["items"]), 2)
        gold = levels[2]
        self.assertEqual(len(gold["items"]), 3)
        silver = levels[3]
        self.assertEqual(len(silver["items"]), 3)
        bronze = levels[4]
        self.assertEqual(len(bronze["items"]), 3)
        supporting = levels[5]
        self.assertEqual(len(supporting["items"]), 5)
        organizer = levels[6]
        self.assertEqual(len(organizer["items"]), 1)
