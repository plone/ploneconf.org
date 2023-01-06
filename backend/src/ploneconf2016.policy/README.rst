.. This README is meant for consumption by humans and pypi. Pypi can render rst files so please do not use Sphinx features.
   If you want to learn more about writing documentation, please check out: http://docs.plone.org/about/documentation_styleguide.html
   This text does not appear on pypi or github. It is a comment.

====================
ploneconf2016.policy
====================

Developed for use on Plone Conference sites.

Installs add-ons needed for the site, primarily:

- easyform
- Mosaic
- social networking sharing

Defines Dexterity content types for:

- presentations
- speakers
- training classes

We hope that future Plone Conferences will use this or a derived add-on!

Examples
--------

This add-on can be seen in action at the following sites:

- https://2016.ploneconf.org
- https://2017.ploneconf.org
- https://2018.ploneconf.org


Documentation
-------------

Full documentation for end users can be found in the "docs" folder.


Translations
------------

This product has not yet been translated.



Installation
------------

Install ploneconf2016.policy by adding it to your buildout::

    [buildout]

    ...

    eggs =
        ploneconf2016.policy


and then running ``bin/buildout``


Contribute
----------

- Issue Tracker: https://github.com/plone/ploneconf2016.policy/issues
- Source Code: https://github.com/plone/ploneconf2016.policy


Support
-------

If you are having issues, please let us know at the Plone forum, https://community.plone.org

License
-------

The project is licensed under the GPLv2.
