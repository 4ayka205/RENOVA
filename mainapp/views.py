from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from .forms import UserRegistrationForm, UserLoginForm

def register_view(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('lk')
    else:
        form = UserRegistrationForm()
    return render(request, 'reg.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = UserLoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('lk')
    else:
        form = UserLoginForm()
    return render(request, 'login.html', {'form': form})


def index_view(request):
    return render(request, 'index.html')

def lk_view(request):
    return render(request, 'lk.html')

def logout_view(request):
    logout(request)
    return redirect('login')
