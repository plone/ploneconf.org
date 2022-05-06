from ploneconf.core.content.slot import ISlot
from ploneconf.core.content.slot import Slot
from zope.interface import implementer


class ITraining(ISlot):
    """Plone Conference Training Session."""


@implementer(ITraining)
class Training(Slot):
    """Convenience subclass for ``Training`` portal type."""
