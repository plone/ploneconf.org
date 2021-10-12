"""Setup tests for this package."""
from plone import api
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from ploneconf.core.testing import PLONECONF_CORE_INTEGRATION_TESTING  # noqa: E501
from Products.CMFPlone.utils import get_installer

import unittest


class TestSetup(unittest.TestCase):
    """Test that ploneconf.core is properly installed."""

    layer = PLONECONF_CORE_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        self.setup = self.portal.portal_setup
        if get_installer:
            self.installer = get_installer(self.portal, self.layer["request"])
        else:
            self.installer = api.portal.get_tool("portal_quickinstaller")

    def test_product_installed(self):
        """Test if ploneconf.core is installed."""
        self.assertTrue(self.installer.isProductInstalled("ploneconf.core"))

    def test_browserlayer(self):
        """Test that IPloneConfCoreLayer is registered."""
        from plone.browserlayer import utils
        from ploneconf.core.interfaces import IPloneConfCoreLayer

        self.assertIn(IPloneConfCoreLayer, utils.registered_layers())

    def test_latest_version(self):
        """Test latest version of default profile."""
        self.assertEqual(
            self.setup.getLastVersionForProfile("ploneconf.core:default")[0],
            "20211012001",
        )


class TestUninstall(unittest.TestCase):

    layer = PLONECONF_CORE_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer["portal"]
        if get_installer:
            self.installer = get_installer(self.portal, self.layer["request"])
        else:
            self.installer = api.portal.get_tool("portal_quickinstaller")
        roles_before = api.user.get_roles(TEST_USER_ID)
        setRoles(self.portal, TEST_USER_ID, ["Manager"])
        self.installer.uninstallProducts(["ploneconf.core"])
        setRoles(self.portal, TEST_USER_ID, roles_before)

    def test_product_uninstalled(self):
        """Test if ploneconf.core is cleanly uninstalled."""
        self.assertFalse(self.installer.isProductInstalled("ploneconf.core"))

    def test_browserlayer_removed(self):
        """Test that IPloneConfCoreLayer is removed."""
        from plone.browserlayer import utils
        from ploneconf.core.interfaces import IPloneConfCoreLayer

        self.assertNotIn(IPloneConfCoreLayer, utils.registered_layers())
