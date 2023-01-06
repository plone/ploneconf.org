# -*- coding: utf-8 -*
from ploneconf2016.policy.upgrades import logger
from ploneconf2016.policy.upgrades.base import PROFILE_ID


def upgrade(setup_tool=None):
    """Upgrade Conference site to version 20201116001."""
    logger.info("Running upgrade (Python): 20201116001")

    # Update Portal Types information
    setup_tool.runImportStepFromProfile(PROFILE_ID, "typeinfo")
    logger.info("  -- Updated Types information")

    # Update Viewlets information
    setup_tool.runImportStepFromProfile(PROFILE_ID, "viewlets")
    logger.info("  -- Updated Viewlets")
