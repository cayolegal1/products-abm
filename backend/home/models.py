from random import choices
from unittest.util import _MAX_LENGTH
from django.conf import settings
from django.db import models
from model_utils.models import TimeStampedModel, SoftDeletableModel


class BaseModel(TimeStampedModel, SoftDeletableModel):
    """
        This way I can access all the objects by saying MyModel.all_objects.all()
        MyModel.objects.all() will provide only the non soft deleted ones in both cases.
    """

    class Meta:
        abstract = True

    def __str__(self):
        return str(self.id)


class Feedback(models.Model):
    COMPLAINT = 10
    SUGGESTION = 20
    PAYMENT = 30
    FINPLAN = 40
    OTHER = 50

    FEEDBACK_TOPICS = (
        (COMPLAINT, "Complaint"),
        (SUGGESTION, "Suggestion"),
        (PAYMENT, "Payment"),
        (FINPLAN, "Finplan"),
        (OTHER, "Other"),
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='feedbacks')
    feedback_topic = models.IntegerField(choices=FEEDBACK_TOPICS)
    feedback_description = models.TextField()

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return '{} - {}'.format(self.pk, self.user.username)


class Product(models.Model):

    product_state_choices = [

        ("In stock", "In stock"),
        ("Off stock", "Off stock")
    ]

    code = models.CharField(unique = True, max_length = 500)
    name = models.CharField(max_length = 25, default = 'Actualizar')
    description = models.TextField()
    price = models.IntegerField(default = 0)
    currency = models.CharField(max_length = 3, default = 'USD')
    state = models.CharField(choices = product_state_choices, max_length = 10)
    primaryImage = models.ImageField(upload_to = 'product-images', null = True)

class ProductImage(models.Model):

    product = models.ForeignKey(Product, on_delete = models.CASCADE, null = True, related_name='imagenes')
    image = models.ImageField(upload_to = 'product-images', null = True)


