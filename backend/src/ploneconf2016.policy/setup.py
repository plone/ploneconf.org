# -*- coding: utf-8 -*-
"""Installer for the ploneconf2016.policy package."""

from setuptools import setup, find_packages
import os


long_description = '\n\n'.join([
    open('README.rst').read(),
    open('CONTRIBUTORS.rst').read(),
    open('CHANGES.rst').read(),
])

setup(name='ploneconf2016.policy',
      version='1.0',
      description="Policy product for Plone Conference 2106 website",
      long_description=long_description,
      # Get more strings from
      # http://pypi.python.org/pypi?:action=list_classifiers
      classifiers=[
          "Environment :: Web Environment",
          "Framework :: Plone",
          "Framework :: Plone :: Addon",
          "Framework :: Plone :: 5.2",
          "Programming Language :: Python",
          "Programming Language :: Python :: 2.7",
          "Programming Language :: Python :: 3.6",
          "Programming Language :: Python :: 3.7",
          "Operating System :: OS Independent",
          "License :: OSI Approved :: GNU General Public License v2 (GPLv2)",
      ],
      keywords='Python Plone',
      author='T. Kim Nguyen',
      author_email='nguyen@plone.org',
      url='https://github.com/plone/ploneconf2016.policy',
      project_urls={
          'PyPI': 'https://pypi.python.org/pypi/ploneconf2016.policy',
          'Source': 'https://github.com/plone/ploneconf2016.policy',
          'Tracker': 'https://github.com/plone/ploneconf2016.policy/issues',
          # 'Documentation': 'https://ploneconf2016.policy.readthedocs.io/en/latest/',
      },
      license='GPL version 2',
      packages=find_packages(exclude=['ez_setup']),
      namespace_packages=['ploneconf2016'],
      include_package_data=True,
      zip_safe=False,
      python_requires=">=3.7",
      install_requires=[
          'setuptools',
          # -*- Extra requirements: -*-
          'z3c.jbot',
          'plone.api>=1.8.4',
          'plone.restapi',
          'plone.app.dexterity',
          'collective.easyform',
          'plone.app.mosaic',
      ],
      extras_require={
          'test': [
              'plone.app.testing',
              # Plone KGS does not use this version, because it would break
              # Remove if your package shall be part of coredev.
              # plone_coredev tests as of 2016-04-01.
              'plone.testing>=5.0.0',
              'plone.app.contenttypes',
              'plone.app.robotframework[debug]',
          ],
      },
      entry_points="""
      # -*- Entry points: -*-
      [z3c.autoinclude.plugin]
      target = plone
      [console_scripts]
      update_locale = ploneconf2016.policy.locales.update:update_locale
      """,
      setup_requires=["PasteScript"],
      paster_plugins=["ZopeSkel"],
      )
