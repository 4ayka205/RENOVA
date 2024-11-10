from django.urls import path
from .views import register_view, login_view, index_view, lk_view, logout_view

urlpatterns = [
    path('', index_view, name='home'),
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login'),
    path('lk/', lk_view, name='lk'),
    path('logout/', logout_view, name='logout'),
]
