from urllib.parse import urljoin


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def email_verified(user):
    return user.emailaddress_set.get(primary=True).verified


def full_image_url(url, request):
    if url.startswith('http'):
        return url
    else:
        new_url = request.build_absolute_uri(url)
        return new_url
