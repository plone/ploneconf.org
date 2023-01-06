# -*- coding: utf-8 -*-
from plone import api
from ploneconf2016.policy.content.vocabularies import SPONSORSHIP_LEVELS
from plone.app.layout.viewlets import ViewletBase
from plone.memoize.view import memoize

from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile


LOGO_SIZES = {
    "diamond": 450,
    "platinum": 390,
    "gold": 300,
    "silver": 240,
    "bronze": 150,
    "supporting": 120,
}


class SponsorsViewlet(ViewletBase):
    """Viewlet that displays Conference sponsors."""

    index = ViewPageTemplateFile("templates/sponsors.pt")

    sponsors = None

    @staticmethod
    def get_sponsors_by_level():
        sponsors = {
            term.token: {
                "title": term.title,
                "size": LOGO_SIZES[term.token],
                "items": []
            } for term in SPONSORSHIP_LEVELS
        }
        brains = api.content.find(portal_type="sponsor", review_state="published")
        for brain in brains:
            content = brain.getObject()
            level = content.level
            sponsors[level]["items"].append(content)
        # Filter empty categories
        sponsors = {k: v for k, v in sponsors.items() if v["items"]}
        return sponsors

    def update(self):
        """Update viewlet information."""
        self.sponsors = self.get_sponsors_by_level()
