from Acquisition import aq_base
from plone.dexterity.interfaces import IDexterityContent
from plone.indexer.decorator import indexer


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
