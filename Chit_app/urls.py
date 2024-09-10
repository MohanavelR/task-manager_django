from django.urls import path
from . import views

app_name='chit'
urlpatterns=[
   path('',views.Index,name='index'),
   path('api/login_view',views.Login_view,name='company'),
   path('api/over_view',views.All_data,name='datas'),
   path('api/active_data',views.Active_data,name='active'),
   path('api/post',views.Post_data,name='post'),
    path('api/branches/<int:company_id>/', views.Get_branch, name='get_branches'),
    path('api/user',views.userCheck,name='user')
]
