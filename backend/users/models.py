import os
import uuid

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.db import models
from django.db.models import Q
from django.db.models.aggregates import Sum
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField

# from financial.models import Transaction
from home.models import BaseModel


def profile_upload_dir(instance, filename):
    ext = filename.split(".")[-1]
    filename = "%s.%s" % (str(uuid.uuid4()).replace("-", ""), ext)
    return os.path.join("profile_images", filename)


class User(AbstractUser):
    # WARNING!
    """
    Some officially supported features of Crowdbotics Dashboard depend on the initial
    state of this User model (Such as the creation of superusers using the CLI
    or password reset in the dashboard). Changing, extending, or modifying this model
    may lead to unexpected bugs and or behaviors in the automated flows provided
    by Crowdbotics. Change it at your own risk.


    This model represents the User instance of the system, login system and
    everything that relates with an `User` is represented by this model.
    """

    # First Name and Last Name do not cover name patterns
    # around the globe.


    name = models.CharField(_("Name of User"), blank=True, null=True, max_length=255)
    profile_picture = models.ImageField(
        _("Profile Picture"),
        blank=True,
        null=True,
        upload_to=profile_upload_dir
    )
    phone_number = PhoneNumberField(_("Phone Number"), max_length=100, null=True)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})


class PasswordReset(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    pass_reset_token = models.CharField(_("Password Reset Token"), max_length=10, null=True)
    expires_on = models.DateTimeField(_("Expires On"), null=True)
    timestamp = models.DateTimeField(_("Timestamp"), auto_now_add=True)
