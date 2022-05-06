from plone.api import relation as relapi
from plone.dexterity.content import Container
from plone.supermodel import model
from typing import List
from zope.interface import implementer


ACTIVITIES_TO_LABELS = {
    "Keynote": "keynote-speaker",
    "Talk": "speaker",
    "Training": "instructor",
}


class IPerson(model.Schema):
    """Plone Conference Person."""


@implementer(IPerson)
class Person(Container):
    """Convenience subclass for ``Person`` portal type."""

    @property
    def activities(self):
        """Return a list of activities connected to this person.

        :returns: List of activities connected to this person.
        """
        return relapi.unrestricted_backrelations(self)

    @property
    def labels(self) -> List[str]:
        """Return a list of labels to be applied to this person.

        :returns: List of labels.
        """
        activities = self.activities
        labels = set()
        for activity in activities:
            portal_type = activity.portal_type
            if portal_type in ACTIVITIES_TO_LABELS:
                labels.add(ACTIVITIES_TO_LABELS[portal_type])
        return list(labels)
