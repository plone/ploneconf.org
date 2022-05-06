from plone.dexterity.content import Container
from plone.supermodel import model
from zope.interface import implementer


class ISlot(model.Schema):
    """Plone Conference Slot."""


@implementer(ISlot)
class Slot(Container):
    """Convenience subclass for ``Slot`` portal type."""
