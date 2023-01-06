from plone.supermodel import model
from Products.Five import BrowserView
from .vocabularies import SPONSORSHIP_LEVELS


class ISponsor(model.Schema):
    model.load('models/sponsor.xml')


class SponsorView(BrowserView):

    def levels(self):
        return SPONSORSHIP_LEVELS
