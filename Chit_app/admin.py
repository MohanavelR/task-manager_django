from django.contrib import admin
from . import models
# Register your models here.
admin.site.register(models.User_Login)
admin.site.register(models.Company_model)
admin.site.register(models.Branch_model)
admin.site.register(models.Agent_model)
admin.site.register(models.Customer_model)
admin.site.register(models.Chit_group)