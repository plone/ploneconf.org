from plone.restapi.interfaces import ISerializeToJsonSummary
from plone.restapi.serializer.converters import json_compatible
from ploneconf.core.content.keynote import IKeynote
from ploneconf.core.content.talk import ITalk
from ploneconf.core.content.training import ITraining
from zope.component import adapter
from zope.interface import implementer
from zope.interface import Interface


class JSONSummarySerializer:
    """ISerializeToJsonSummary adapter for the Session contents."""

    def __init__(self, context, request):
        self.context = context
        self.request = request

    def __call__(self):
        summary = json_compatible(
            {
                "@id": self.context.absolute_url(),
                "@type": self.context.portal_type,
                "title": self.context.title,
                "description": self.context.description,
                "level": self.context.session_level,
                "audience": self.context.session_audience,
            }
        )
        return summary


@implementer(ISerializeToJsonSummary)
@adapter(IKeynote, Interface)
class KeynoteJSONSummarySerializer(JSONSummarySerializer):
    """ISerializeToJsonSummary adapter for the Keynote."""


@implementer(ISerializeToJsonSummary)
@adapter(ITalk, Interface)
class TalkJSONSummarySerializer(JSONSummarySerializer):
    """ISerializeToJsonSummary adapter for the Talk."""


@implementer(ISerializeToJsonSummary)
@adapter(ITraining, Interface)
class TrainingJSONSummarySerializer(JSONSummarySerializer):
    """ISerializeToJsonSummary adapter for the Training."""
