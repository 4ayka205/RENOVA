from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from .forms import CustomUserCreationForm, CustomAuthenticationForm
from .models import CustomUser


def register_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        password_confirm = request.POST.get('password_confirm')

        if password != password_confirm:
            messages.error(request, "Пароли не совпадают.")
            return redirect('register')

        if CustomUser.objects.filter(email=email).exists():
            messages.error(request, "Пользователь с таким email уже существует.")
            return redirect('register')

        user = CustomUser.objects.create_user(email=email, password=password)
        user.save()
        messages.success(request, "Вы успешно зарегистрированы!")
        return redirect('lk')

    return render(request, 'index.html')

def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('lk')
        else:
            messages.error(request, "Неверный email или пароль.")
            return redirect('home')

    return render(request, 'index.html')

def index_view(request):
    return render(request, 'index.html')

def lk_view(request):
    if request.user.is_authenticated:
        return render(request, 'profile.html')
    else:
        return render(request, 'index.html')


def logout_view(request):
    logout(request)
    return redirect('home')