from plone.app.standardtiles import PloneMessageFactory as _
from plone.app.uuid.utils import uuidToObject
from plone.app.vocabularies.catalog import CatalogSource as CatalogSourceBase
from plone.memoize.view import memoize
from plone.supermodel import model
from plone.tiles import Tile
from plone.uuid.interfaces import IUUID
from Products.Five import BrowserView
from zope import schema
from zope.schema.vocabulary import SimpleVocabulary


class CatalogSource(CatalogSourceBase):
    """ExistingContentTile specific catalog source to allow targeted widget
    """


class IPresentationTile(model.Schema):

    content_uid = schema.Choice(
        title=_(u"Select an existing content"),
        required=True,
        source=CatalogSource(portal_type=['presentation', 'training_class']),
    )


class PresentationTile(Tile):
    """Existing content tile
    """

    @property
    @memoize
    def content_context(self):
        uuid = self.data.get('content_uid')
        item = uuidToObject(uuid)
        if item is not None:
            return item
        return None

    @property
    def length(self):
        return self.data.get('talk_length')

    @property
    @memoize
    def speaker(self):
        content = self.content_context
        speaker_uids = getattr(content, 'speaker', None)
        if speaker_uids is None:
            # We have a training
            speaker_uids = getattr(content, 'instructor', None)
        if speaker_uids:
            return [uuidToObject(u) for u in speaker_uids]

    def duration(self):
        content = self.content_context
        duration = getattr(content, 'duration', None)
        if duration:
            if duration == 'TwoDay':
                return '2 days'
            elif duration == 'OneDay':
                return '1 day'
            elif duration == 'HalfDay':
                return '1/2 day'
            elif duration == 'LongTalk':
                return 'Long Talk'
            elif duration == 'ShortTalk':
                return 'Short Talk'
            elif duration == 'Demo':
                return 'Demo'
        return ''

    def tracks(self):
        subjects = self.content_context.subject
        track_subjects = [s for s in subjects if s in ['Plone', 'Python Web', 'Modern JavaScript']]
        return track_subjects

    def get_track_color(self):
        subjects = self.content_context.subject
        track_subjects = [s for s in subjects if s in ['Plone', 'Python Web', 'Modern JavaScript']]
        class_name = ''
        if 'Plone' in track_subjects:
            class_name = class_name + 'blue'
        if 'Python Web' in track_subjects:
            if len(class_name) > 0:
                class_name = class_name + ' '
            class_name = class_name + 'red'
        if 'Modern JavaScript' in track_subjects:
            if len(class_name) > 0:
                class_name = class_name + ' '
            class_name = class_name + 'green'

        return class_name


class Utils(BrowserView):

    def __init__(self, context, request):
        self.context = context
        self.request = request

    def pres_speakers(self, item):
        speaker_uids = getattr(item, 'speaker', None)
        if speaker_uids:
            return [uuidToObject(u) for u in speaker_uids]
