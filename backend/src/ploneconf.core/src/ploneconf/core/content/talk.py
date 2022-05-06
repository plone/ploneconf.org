from ploneconf.core.content.slot import ISlot
from ploneconf.core.content.slot import Slot
from zope.interface import implementer


class ITalk(ISlot):
    """Plone Conference Talk."""


@implementer(ITalk)
class Talk(Slot):
    """Convenience subclass for ``Talk`` portal type."""
