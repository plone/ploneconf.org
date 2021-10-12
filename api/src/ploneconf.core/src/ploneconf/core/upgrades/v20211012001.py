from plone import api
from ploneconf.core import logger
from pytz import timezone


def fix_tz(setup_tool=None):
    """Set correct time zone on events"""
    logger.info("Running upgrade (Python): 20211012001")
    portal = api.portal.get()

    results = api.content.find(portal, portal_type=["Talk", "Keynote"])
    for brain in results:
        talk = brain.getObject()
        talk.start = talk.start.replace(tzinfo=timezone("Europe/Berlin"))
        talk.end = talk.end.replace(tzinfo=timezone("Europe/Berlin"))
        talk.reindexObject()
        logger.info(f"-- Reindexed {talk.title}")
