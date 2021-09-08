from Acquisition import aq_base
from plone import api
from plone.dexterity.interfaces import IDexterityContent
from plone.indexer.decorator import indexer
from ploneconf.core.behaviors.session import IConferenceSession
from ploneconf.core.content.person import IPerson


@indexer(IDexterityContent)
def image_field_indexer(obj):
    """Indexer for knowing in a catalog search if a content has any image."""
    base_obj = aq_base(obj)
    image_field = ""
    if getattr(base_obj, "preview_image"):
        image_field = "preview_image"
    elif getattr(base_obj, "image"):
        image_field = "image"
    return image_field


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
