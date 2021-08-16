"""Installer for the ploneconf.core package."""

from setuptools import find_packages
from setuptools import setup


long_description = "\n\n".join(
    [
        open("README.md").read(),
        open("CONTRIBUTORS.md").read(),
        open("CHANGES.md").read(),
    ]
)


setup(
    name="ploneconf.core",
    version="1.0a1",
    description="Plone Conference configuration package.",
    long_description=long_description,
    classifiers=[
        "Environment :: Web Environment",
        "Framework :: Plone",
        "Framework :: Plone :: Addon",
        "Framework :: Plone :: 5.2",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Operating System :: OS Independent",
        "License :: OSI Approved :: GNU General Public License v2 (GPLv2)",
    ],
    keywords="Python Plone CMS",
    author="Plone Foundation",
    author_email="conf@plone.org",
    url="https://github.com/plone/2021.ploneconf.org",
    project_urls={
        "PyPI": "https://pypi.python.org/pypi/ploneconf.core",
        "Source": "https://github.com/plone/2021.ploneconf.org",
        "Tracker": "https://github.com/plone/2021.ploneconf.org/issues",
    },
    license="GPL version 2",
    packages=find_packages("src", exclude=["ez_setup"]),
    namespace_packages=["ploneconf"],
    package_dir={"": "src"},
    include_package_data=True,
    zip_safe=False,
    python_requires=">=3.7",
    install_requires=[
        "setuptools",
        # -*- Extra requirements: -*-
        "prettyconf",
        "collective.folderishtypes",
        "collective.volto.formsupport",
        "kitconcept.volto",
        "plone.api",
        "plone.restapi",
        "plone.app.dexterity",
    ],
    extras_require={
        "test": [
            "towncrier",
            "zestreleaser.towncrier",
            "zest.releaser[recommended]",
            "plone.app.testing",
            "plone.testing",
            "plone.app.contenttypes",
            "plone.app.robotframework[debug]",
            "plone.restapi[test]",
            "collective.MockMailHost",
        ],
    },
    entry_points="""
    [z3c.autoinclude.plugin]
    target = plone
    [console_scripts]
    update_locale = ploneconf.core.locales.update:update_locale
    """,
)
