import logging
from Acquisition import aq_base
from Products.CMFCore.utils import getToolByName


def replace_summaries(context):
    # Only run step if a flag file is present
    if getattr(context, 'getSite', None):
        if context.readDataFile('ploneconf2016policy_marker.txt') is None:
            return
        logger = context.getLogger('ploneconf.policy')
        site = context.getSite()
    else:
        logger = logging.getLogger('ploneconf.policy')
        site = context

    catalog = getToolByName(site, 'portal_catalog')
    brains = catalog(portal_type=['person', 'presentation', 'training_class'])
    count = 0
    for b in brains:
        if not b.Description:
            obj = b.getObject()
            if getattr(aq_base(obj), 'summary', None) is not None:
                obj.description = obj.summary
                del obj.summary
                catalog.catalog_object(obj,
                                       idxs=['Description', 'SearchableText'],
                                       update_metadata=True)
                logger.info(
                    'Replaced description for {}'.format(b.getPath())
                )
                count += 1
    logger.info('Replaced description for {} objects'.format(count))
