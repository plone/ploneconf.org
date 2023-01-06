from plone import api
from plone.app.uuid.utils import uuidToObject
from plone.memoize.view import memoize
from plone.supermodel import model
from plone.tiles import Tile


class IKeynotersTile(model.Schema):
    """"""


class KeynotersTile(Tile):
    """Keynoters content tile
    """

    def get_keynoters(self):
        pc = api.portal.get_tool('portal_catalog')
        results = pc.searchResults(portal_type="keynoter")

        # Yeah I know... no time for fancy indexers!
        return [result.getObject() for result in results]

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
        if speaker_uids:
            speakers = [uuidToObject(u) for u in speaker_uids]
            return ', '.join(s.title for s in speakers if s)
