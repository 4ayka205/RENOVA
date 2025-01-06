from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from .models import CustomUser, UserTraining


def register_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        password_confirm = request.POST.get('password_confirm')

        if CustomUser.objects.filter(email=email).exists():
            return render(request, 'index.html',{'error': 'Пользователь с таким email уже существует.', 'error_type': 'register'})

        if password != password_confirm:
            return render(request, 'index.html', {'error': 'Пароли не совпадают.', 'error_type': 'register'})

        user = CustomUser.objects.create_user(email=email, password=password)
        user.save()
        login(request, user)
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
            return render(request, 'index.html', {'error': 'Неверный email или пароль.', 'error_type': 'login'})

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


def json_receive(request):
    objects = UserTraining.objects.all()
    data = [{'id': item.id, 'json_data': item.json_data} for item in objects]
    return JsonResponse(data, safe=False)


def save_workout(request):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return JsonResponse({'success': False, 'message': 'Пользователь не авторизован'}, status=401)

        current_user = request.user
        workout_id = getattr(current_user, 'id_workout', None)  # Получаем id тренировки, если она есть
        if workout_id is not None:
            return JsonResponse({'success': True, 'workout_id': workout_id})
        else:
            return JsonResponse({'success': False, 'message': 'Тренировка не выбрана'})

    if request.method == 'POST':
        if not request.user.is_authenticated:
            return JsonResponse({'success': False, 'message': 'Пользователь не авторизован'}, status=401)

        current_user = request.user
        value = request.POST.get('button_value')

        current_user.id_workout = value
        current_user.save()
        return JsonResponse({'success': True, 'message': 'Тренировка сохранена'})

    if request.method == 'DELETE':
        if not request.user.is_authenticated:
            return JsonResponse({'success': False, 'message': 'Пользователь не авторизован'}, status=401)

        current_user = request.user
        try:
            current_user.id_workout = None  # Сбрасываем id тренировки
            current_user.save()
            return JsonResponse({'success': True, 'message': 'Тренировка сброшена'})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=500)

    return JsonResponse({'success': False, 'message': 'Метод не поддерживается'}, status=405)
