from plone import api
from ploneconf.core import logger


def update_permissions(setup_tool=None):
    """Update permissions."""
    logger.info("Running upgrade (Python): 20210908001")
    portal = api.portal.get()

    # Adjust permisions on /schedule
    roles = ["Site Manager", "Manager", "Editor"]
    permissions = [
        "ploneconf.core: Add Slot",
        "ploneconf.core: Add Training",
        "ploneconf.core: Add Talk",
        "ploneconf.core: Add Keynote",
    ]
    content = portal.schedule
    for permission_id in permissions:
        logger.info(f"-- Update {permission_id} permission in /schedule")
        content.manage_permission(permission_id, roles=roles)

    # Adjust permisions on /speakers
    permissions = [
        "ploneconf.core: Add Person",
    ]
    content = portal.speakers
    for permission_id in permissions:
        logger.info(f"-- Update {permission_id} permission in /speakers")
        content.manage_permission(permission_id, roles=roles)
