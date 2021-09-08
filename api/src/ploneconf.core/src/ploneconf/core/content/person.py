from plone.dexterity.content import Container
from plone.supermodel import model
from zope.interface import implementer


class IPerson(model.Schema):
    """Plone Conference Person."""


@implementer(IPerson)
class Person(Container):
    """Convenience subclass for ``Person`` portal type."""
