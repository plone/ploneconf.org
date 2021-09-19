from plone import api
from ploneconf.core import logger


def reindex_persons(setup_tool=None):
    """Reindex Person content."""
    logger.info("Running upgrade (Python): 20210919001")
    portal = api.portal.get()

    results = api.content.find(portal, portal_type="Person")
    for brain in results:
        person = brain.getObject()
        labels = person.labels
        person.reindexObject(idxs=["labels"])
        logger.info(f"-- Reindexed {person.title} with labels {labels}")
