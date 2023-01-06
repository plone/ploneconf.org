import csv
from io import StringIO
from plone import api
from Products.Five.browser import BrowserView


class ScheduleCSV(BrowserView):
    """ view to produce the CSV exports
    """

    def __call__(self):
        talks = api.content.find(portal_type="presentation")
        buffer = StringIO()

        writer = csv.writer(buffer)
        header = [
            'Speaker Name',
            'Speaker Email',
            'Speaker Social Media',
            'Speaker Headshot',
            'Speaker Bio',
            'Speaker Title / Employer',
            'Session Title',
            'Session Abstract',
            'Session Date / Time',
            'Session Track',
        ]
        writer.writerow(header)

        for talk in talks:
            obj = talk.getObject()
            for speakeruid in obj.speaker:
                row = []
                speaker = api.content.get(UID=speakeruid)
                row.append(speaker.Title())
                row.append(speaker.email)

                social_media = ''
                if speaker.twitter_handle:
                    social_media += 'https://twitter.com/' + speaker.twitter_handle + '\n'
                if speaker.github_handle:
                    social_media += 'https://github.com/' + speaker.github_handle + '\n'
                row.append(social_media)

                photo = speaker.headshot
                if photo:
                    row.append(speaker.absolute_url() + '/@@images/headshot')
                else:
                    row.append('')
                if speaker.bio:
                    row.append(speaker.bio.output)
                else:
                    row.append('')
                row.append('')  # we don't have speaker title

                # talk properties
                row.append(obj.Title())
                if obj.body:
                    row.append(obj.body.output)
                else:
                    row.append('')
                row.append(obj.start.strftime('%Y-%m-%d %H:%M:%S %z'))
                row.append(obj.track)

                writer.writerow(row)
        value = buffer.getvalue()

        encoding = 'UTF-8'
        self.request.response.setHeader('Content-type',
                                        'text/csv;charset='+encoding)
        self.request.response.setHeader('Content-Disposition',
                                        'attachment; filename=schedule.csv')

        return value
