import json
import urllib
from urllib.request import urlopen

from django.contrib.auth import user_logged_in, user_login_failed
from django.db import transaction
from django.dispatch import receiver
from django.db.models.signals import post_save

from .helpers import get_client_ip
from .models import PasswordReset, UserLoginActivity
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.core.mail import EmailMultiAlternatives


@receiver(post_save, sender=PasswordReset)
def password_reset_token_saved(sender, instance, created, **kwargs):
    try:
        if created is True:
            user = instance.user
            print(user)
            print(instance.pass_reset_token)
            subject, from_email, to = 'Password Reset', settings.DEFAULT_FROM_EMAIL, str(user.email)
            text_content = f"""<h5>Hello!</h5><br/>
            Please use the OTP bellow to complete the password reset process<br/>
            <b>{instance.pass_reset_token}</b><br/>
            Thank you."""
            html_content = text_content
            msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            print("email sent")
            with transaction.atomic():
                # Create notification
                content_type = ContentType.objects.get_for_model(instance)
                # instance.notifications.create(
                #     target=user,
                #     redirect_path=reverse("token_obtain_pair"),
                #     verb="Password reset request has been created successfully. Please use the OTP sent to you your email to complete the process",
                #     content_type=content_type,
                # )
                # print("notification sent")

    except Exception as e:
        print(e)


@receiver(user_logged_in)
def log_user_logged_in_success(sender, user, request, **kwargs):
    try:
        user_agent_info = request.META.get('HTTP_USER_AGENT', '<unknown>')[:255],
        base_geo_url = 'http://ip-api.com/json/'
        user_ip = get_client_ip(request)
        req = urllib.request.Request(base_geo_url + user_ip)
        response = urllib.request.urlopen(req).read()
        json_response = json.loads(response.decode('utf-8'))
        data = request.data
        region = ''
        city = ''
        country = ''
        device_model = data.get('deviceModel', None)
        device_id = data.get('deviceId', None)
        if json_response['status'] == 'success':
            region = json_response['regionName']
            city = json_response['city']
            country = json_response['country']
        user_login_activity_object = UserLoginActivity.objects.filter(device_id=device_id, login_username=user.email).first()
        if not user_login_activity_object:
            user_login_activity_log = UserLoginActivity(
                login_IP=user_ip,
                login_username=user.email,
                user_agent_info=user_agent_info,
                status=UserLoginActivity.SUCCESS,
                region=region,
                country=country,
                city=city,
                device_model=device_model,
                device_id=device_id
            )
            user_login_activity_log.save()
    except Exception as e:
        # log the error
        print("log_user_logged_in request: %s, error: %s" % (request, e))


@receiver(user_login_failed)
def log_user_logged_in_failed(sender, credentials, request, **kwargs):
    try:
        user_agent_info = request.META.get('HTTP_USER_AGENT', '<unknown>')[:255],
        base_geo_url = 'http://ip-api.com/json/'
        user_ip = get_client_ip(request)
        req = urllib.request.Request(base_geo_url + user_ip)
        response = urllib.request.urlopen(req).read()
        json_response = json.loads(response.decode('utf-8'))
        region = ''
        city = ''
        country = ''
        if json_response['status'] == 'success':
            region = json_response['regionName']
            city = json_response['city']
            country = json_response['country']
        user_login_activity_log = UserLoginActivity(
            login_IP=get_client_ip(request),
            login_username=credentials['email'],
            user_agent_info=user_agent_info,
            status=UserLoginActivity.FAILED,
            region=region,
            country=country,
            city=city
        )
        user_login_activity_log.save()
    except Exception as e:
        # log the error
        print("log_user_logged_in request: %s, error: %s" % (request, e))
