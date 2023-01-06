# -*- coding: utf-8 -*-
from plone.app.upgrade.utils import loadMigrationProfile


PROFILE_ID = "profile-ploneconf2016.policy:default"


def reload_gs_profile(context):
    loadMigrationProfile(
        context, PROFILE_ID,
    )
