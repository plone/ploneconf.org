from plone import api
from plone.indexer.decorator import indexer
from ploneconf.core.behaviors.session import IConferenceSession
from ploneconf.core.content.person import IPerson


def rich_field_as_text(field) -> str:
    """Format a rich field as plain text."""
    tool = api.portal.get_tool("portal_transforms")
    text = field.raw if field else ""
    return tool.convertTo("text/plain", text, mimetype="text/html").getData()


@indexer(IConferenceSession)
@indexer(IPerson)
def summary(obj) -> str:
    """Index summary for a IConferenceSession."""
    description = obj.description
    if not description:
        text = rich_field_as_text(obj.text)
        # We display only the first paragraph
        description = text.split("\n")[0]
    return description
