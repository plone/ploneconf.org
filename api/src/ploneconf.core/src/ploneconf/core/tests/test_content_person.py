from plone import api
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from plone.dexterity.interfaces import IDexterityFTI
from ploneconf.core.content.person import IPerson
from ploneconf.core.content.person import Person
from ploneconf.core.testing import PLONECONF_CORE_INTEGRATION_TESTING
from z3c.relationfield import RelationValue
from zope.component import createObject
from zope.component import getUtility
from zope.component import queryUtility
from zope.intid.interfaces import IIntIds

import unittest


class PersonIntegrationTest(unittest.TestCase):

    layer = PLONECONF_CORE_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        setRoles(self.portal, TEST_USER_ID, ["Manager"])

    def create_person(self) -> Person:
        person = api.content.create(
            container=self.portal.speakers,
            type="Person",
            id="ada-lovelace",
            title="Ada Lovelace",
        )
        return person

    def create_activity(self, portal_type: str, person: Person):
        container = self.portal.schedule
        intids = getUtility(IIntIds)
        person_value = RelationValue(intids.getId(person))
        return api.content.create(
            container=container,
            type=portal_type,
            id=f"a-{portal_type.lower()}",
            title=f"A {portal_type}",
            presenters=[
                person_value,
            ],
        )

    def test_fti(self):
        fti = queryUtility(IDexterityFTI, name="Person")
        self.assertTrue(fti)

    def test_factory(self):
        fti = queryUtility(IDexterityFTI, name="Person")
        factory = fti.factory
        obj = createObject(factory)
        self.assertTrue(IPerson.providedBy(obj))

    def test_adding(self):
        folder = self.portal.speakers
        folder.invokeFactory("Person", "Person")
        self.assertTrue(IPerson.providedBy(folder["Person"]))

    def test_activities(self):
        person = self.create_person()
        self.assertEqual(len(person.activities), 0)

        self.create_activity("Keynote", person)
        self.assertEqual(len(person.activities), 1)

        self.create_activity("Talk", person)
        self.assertEqual(len(person.activities), 2)

        self.create_activity("Training", person)
        self.assertEqual(len(person.activities), 3)

    def test_labels(self):
        person = self.create_person()
        self.assertEqual(len(person.activities), 0)

        self.create_activity("Keynote", person)
        self.create_activity("Talk", person)
        self.create_activity("Training", person)
        self.assertEqual(len(person.labels), 3)

        self.assertIn("keynote-speaker", person.labels)
        self.assertIn("speaker", person.labels)
        self.assertIn("instructor", person.labels)
