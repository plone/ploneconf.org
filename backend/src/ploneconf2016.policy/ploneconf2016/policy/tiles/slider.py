from plone import api
from plone.app.z3cform.interfaces import IPloneFormLayer
from plone.app.z3cform.widget import RelatedItemsWidget as BaseRelatedItemsWidget
from plone.autoform import directives as form
from plone.supermodel import model
from plone.tiles import PersistentTile
from zope import schema
from zope.schema.vocabulary import SimpleVocabulary

import json
import z3c.form.interfaces
import z3c.form.widget
import zope.interface
import zope.schema.interfaces


class ImagesRelatedItemsWidget(BaseRelatedItemsWidget):

    def _base_args(self):
        args = super(ImagesRelatedItemsWidget, self)._base_args()
        args['pattern_options']['selectableTypes'] = ['Image']
        args['pattern_options']['baseCriteria'] = [{
            'i': 'portal_type',
            'o': 'plone.app.querystring.operation.selection.any',
            'v': ['Image', 'Folder']
        }]
        return args


@zope.component.adapter(zope.schema.interfaces.IField,
                        IPloneFormLayer)
@zope.interface.implementer(z3c.form.interfaces.IFieldWidget)
def ImagesRelatedItemsFieldWidget(field, request):
    widget = z3c.form.widget.FieldWidget(field, ImagesRelatedItemsWidget(request))
    widget.vocabulary = 'plone.app.vocabularies.Catalog'
    return widget


class SliderTile(PersistentTile):

    @property
    def pattern_options(self):
        opts = {
            'animation': self.data.get('animation', 'fade'),
            'controlNav': self.data.get('controlNav', True),
            'directionNav': self.data.get('directionNav', True),
            'slideshowSpeed': self.data.get('slideshowSpeed', 7000),
            'animationSpeed': self.data.get('animationSpeed', 600)
        }
        return json.dumps(opts)

    def render(self):
        return self.index()

    @property
    def height(self):
        return self.data.get('height', 250)

    def get_image_data_from_brain(self, brain):
        base_url = brain.getURL()
        return {
            'large': '%s/@@images/image/large' % base_url,
            'medium': '%s/@@images/image/mini' % base_url,
            'thumb': '%s/@@images/image/thumb' % base_url,
            'original': base_url,
            'title': brain.Title,
            'description': brain.Description,
            'link': '%s/view' % base_url
        }

    def get_image_data(self, im):
        base_url = im.absolute_url()
        related = self.get_related(im) or im
        return {
            'large': '%s/@@images/image/large' % base_url,
            'medium': '%s/@@images/image/mini' % base_url,
            'thumb': '%s/@@images/image/thumb' % base_url,
            'original': base_url,
            'title': im.Title(),
            'description': im.Description(),
            'link': '%s/view' % related.absolute_url()
        }

    def get_images_in_folder(self, brain):
        if brain.portal_type == 'Folder':
            # get contents
            folder = brain.getObject()
            images = folder.getFolderContents()
            results = []
            for image in images:
                if image.portal_type == 'Image':
                    results.append(self.get_image_data_from_brain(image))
                else:
                    obj = image.getObject()
                    if hasattr(obj, 'image') and hasattr(obj.image, 'contentType'):
                        results.append(self.get_image_data(obj))
            return results
        else:
            return [self.get_image_data_from_brain(brain)]

    @property
    def images(self):
        results = []
        catalog = api.portal.get_tool('portal_catalog')
        brains = list(catalog(UID=self.data.get('images', [])))
        # we need to order this since catalog results are not ordered
        for uid in self.data['images']:
            found = False
            for brain in brains:
                if brain.UID == uid:
                    found = brain
                    break
            if not found:
                continue
            brains.remove(found)
            if found.is_folderish:
                results.extend(self.get_images_in_folder(brain))
            else:
                results.append(self.get_image_data_from_brain(found))
        return results


class ISliderTileSchema(model.Schema):

    form.widget(images=ImagesRelatedItemsFieldWidget)
    images = schema.List(
        title=u"Images",
        description=u"Select images or folders of images to display in slider."
                    u" If the image has a related item selected, that "
                    u"related item will be used for the link and description "
                    u"for the slide display",
        value_type=schema.Choice(
            vocabulary='plone.app.vocabularies.Catalog'
        )
    )

    animation = schema.Choice(
        title=u'Animation',
        vocabulary=SimpleVocabulary([
            SimpleVocabulary.createTerm('fade', 'fade', 'Fade'),
            SimpleVocabulary.createTerm('slide', 'slide', 'Slide'),
        ]),
        default='fade'
    )

    controlNav = schema.Bool(
        title=u'Control nav',
        default=True)

    directionNav = schema.Bool(
        title=u'Direction nav',
        default=True)

    slideshowSpeed = schema.Int(
        title=u'Cycle speed',
        description=u'In milliseconds',
        default=7000)

    animationSpeed = schema.Int(
        title=u'Animation speed',
        description=u'In milliseconds',
        default=600)
