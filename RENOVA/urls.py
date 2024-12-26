from django.contrib import admin
from django.urls import path, include
from mainapp.views import index_view, login_view, register_view, lk_view, logout_view, json_receive, save_workout

urlpatterns = [
    path('admin/', admin.site.urls),
    path('mainapp/', include('mainapp.urls')),
    path('', index_view, name='home'),
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('profile/', lk_view, name='lk'),
    path('logout/', logout_view, name='logout'),
    path('json-receive/', json_receive, name='json_receive'),
    path('save-workout/', save_workout, name='save_workout'),
]
