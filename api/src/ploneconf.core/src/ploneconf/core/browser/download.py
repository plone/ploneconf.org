from io import StringIO
from plone import api
from Products.Five.browser import BrowserView

import csv


class SpeakersCSV(BrowserView):
    """view to produce the CSV exports"""

    def __call__(self):
        people = api.content.find(portal_type="Person")
        buffer = StringIO()

        writer = csv.writer(buffer)
        header = [
            "attendee_email",
            "bio",
            "job_title",
            "company_name",
            "linkedin_url",
            "github_url",
            "twitter_url",
            "youtube_url",
            "display_email",
        ]
        writer.writerow(header)

        for person in people:
            speaker = person.getObject()
            row = []

            # row.append(speaker.Title())
            row.append(speaker.email)
            if speaker.text:
                row.append(speaker.text.output)
            else:
                row.append("")

            row.append("")  # job title
            row.append("")  # company name
            row.append("")  # linkedin

            if speaker.github:
                row.append("https://github.com/" + speaker.github + "\n")
            else:
                row.append("")
            if speaker.twitter:
                row.append("https://twitter.com/" + speaker.twitter + "\n")
            else:
                row.append("")

            row.append("")  # youtube

            writer.writerow(row)
        value = buffer.getvalue()

        encoding = "UTF-8"
        self.request.response.setHeader("Content-type", "text/csv;charset=" + encoding)
        self.request.response.setHeader(
            "Content-Disposition", "attachment; filename=schedule.csv"
        )

        return value


class TalksCSV(BrowserView):
    """view to produce the CSV exports"""

    def __call__(self):
        talks = api.content.find(portal_type="Talk")
        buffer = StringIO()

        writer = csv.writer(buffer)
        header = [
            "name",
            "track_name",
            "description",
            "presenter_emails",
            "start",
            "end",
            "banner_name",
        ]
        writer.writerow(header)

        for talk in talks:
            obj = talk.getObject()
            row = []

            row.append(obj.Title())
            row.append("")  # track name
            if obj.text:
                row.append(obj.text.output)
            else:
                row.append("")

            # get presenter emails as a list
            row.append("")

            row.append("")  # start
            row.append("")  # end
            row.append("")  # banner name

            writer.writerow(row)
        value = buffer.getvalue()

        encoding = "UTF-8"
        self.request.response.setHeader("Content-type", "text/csv;charset=" + encoding)
        self.request.response.setHeader(
            "Content-Disposition", "attachment; filename=schedule.csv"
        )

        return value
