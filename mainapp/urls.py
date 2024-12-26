from django.urls import path
from .views import register_view, login_view, index_view, lk_view, logout_view, json_receive

urlpatterns = [
    path('', index_view, name='home'),
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login'),
    path('profile/', lk_view, name='lk'),
    path('logout/', logout_view, name='logout'),
    path('json-receive/', json_receive, name='json_receive'),
    path('save-workout/', json_receive, name='save_workout'),
]
