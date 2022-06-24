import logging
import json

from django.conf import settings
from django.db.models.query import QuerySet
from onesignal_sdk.client import Client
from onesignal_sdk.error import OneSignalHTTPError
from django.core.mail import EmailMultiAlternatives


LOGGER = logging.getLogger('django')

#
# def send_notifications(users, title, message, extra_data, from_user, notification_type, finplan=None, transaction=None):
#     if not isinstance(users, QuerySet) and not isinstance(users, list):
#         push_users = [users]
#     else:
#         push_users = users
#     for user in push_users:
#         notification = Notification.objects.create(
#             target=user,
#             from_user=from_user,
#             title=title,
#             description=message,
#             type=notification_type,
#             extra_data=extra_data,
#             finplan=finplan,
#             transaction=transaction
#         )
#         devices = user.devices.filter(active=True)
#         if not devices.exists():
#             error_message = 'The user {} doesnt have any active devices '.format(user.username)
#             LOGGER.warning(error_message)
#             notification.error_on_send = error_message
#             notification.save()
#             continue
#         send_push(title, message, extra_data, list(devices.values_list('device_id', flat=True)), notification)
#
#
# def send_push(title, message, extra_data, devices_ids=None, notification_object=None):
#     if devices_ids is not None and not len(devices_ids):
#         return
#     osclient = Client(
#         rest_api_key=settings.ONESIGNAL_REST_API_KEY,
#         app_id=settings.ONESIGNAL_APP_ID,
#         user_auth_key=settings.ONESIGNAL_USER_AUTH_KEY
#     )
#     notification = {
#         "headings": {"en": title, "es": title},
#         "contents": {"en": message, "es": message},
#         "content_available": True,
#         "data": json.loads(json.dumps(extra_data)) if extra_data != '' else {}
#     }
#     if devices_ids:
#         notification.update({"include_player_ids": devices_ids})
#     else:
#         notification.update({"included_segments": ['Subscribed Users']})
#     LOGGER.info('Sending process start')
#     try:
#         osclient.send_notification(notification)
#         notification_object.sent = True
#         notification_object.save()
#         LOGGER.info('Notification sent. notification: {}'.format(json.dumps(notification)))
#     except Exception as e:
#         print('print Push sending failed: {}'.format(e))
#         LOGGER.info('logger Push sending failed: {}'.format(e))
#         LOGGER.info('logger message Push sending failed: {}'.format(e.message))
#         notification_object.sent = False
#         notification_object.error_on_send = e.message
#         notification_object.save()
#         return False
#     LOGGER.info('Sending process finished')
#     return True
#
#
def send_email(user_email, subject, text_content):
    try:
        from_email, to = settings.DEFAULT_FROM_EMAIL, user_email
        html_content = text_content
        msg = EmailMultiAlternatives(subject, text_content, from_email, to)
        msg.attach_alternative(html_content, "text/html")
        msg.send()

    except Exception as e:
        LOGGER.exception('Push sending failed: {}'.format(e))
