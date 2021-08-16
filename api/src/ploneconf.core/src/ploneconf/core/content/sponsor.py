from plone.dexterity.content import Container
from plone.supermodel import model
from zope.interface import implementer


class ISponsor(model.Schema):
    """Plone Conference Sponsor."""


@implementer(ISponsor)
class Sponsor(Container):
    """Convenience subclass for ``Sponsor`` portal type."""
