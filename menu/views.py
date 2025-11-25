from django.shortcuts import render
from django.http import HttpResponse


def menu_home(request):
    return render(request, 'menu/menu_home.html')

def index2(request):
    return render(request, 'menu/index2.html')

def cadastrar_ativo(request):
    return render(request, 'menu/cadastrar_ativo.html')

