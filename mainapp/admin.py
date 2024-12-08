from django.contrib import admin
from .models import CustomUser, UserTraining

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(UserTraining)
