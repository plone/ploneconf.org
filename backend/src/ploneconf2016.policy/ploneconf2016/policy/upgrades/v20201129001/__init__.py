# -*- coding: utf-8 -*
from ploneconf2016.policy.upgrades import logger
from ploneconf2016.policy.upgrades.base import PROFILE_ID


def upgrade(setup_tool=None):
    """Upgrade Conference site to version 20201129001."""
    logger.info("Running upgrade (Python): 20201129001")

    # Update Registry
    setup_tool.runImportStepFromProfile(PROFILE_ID, "plone.app.registry")
    logger.info("  -- Updated Registry information")
