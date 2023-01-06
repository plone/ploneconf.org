from plone.supermodel import model
from Products.Five import BrowserView
from AccessControl import getSecurityManager
from Products.CMFCore.permissions import ModifyPortalContent


class IKeynoter(model.Schema):
    model.load('models/keynoter.xml')


class KeynoterView(BrowserView):

    def twitter_url(self):
        if self.context.twitter_handle is not None:
            return 'https://twitter.com/%s' % self.context.twitter_handle
        return ''

    def twitter(self):
        if self.context.twitter_handle is not None:
            return '@%s' % self.context.twitter_handle
        return ''

    def github_url(self):
        if self.context.github_handle is not None:
            return 'https://github.com/%s' % self.context.github_handle
        return ''

    def github(self):
        if self.context.github_handle is not None:
            return self.context.github_handle
        return ''

    def twitter_and_github_exist(self):
        if self.context.twitter_handle and self.context.github_handle:
            return True
        return False

    def twitter_or_github_exist(self):
        if self.context.twitter_handle or self.context.github_handle:
            return True
        return False

    def can_view_email(self):
        sm = getSecurityManager()
        return sm.checkPermission(ModifyPortalContent, self.context)

