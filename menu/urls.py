from django.urls import path
from . import views


urlpatterns = [
    path('', views.menu_home, name='menu_home'),
    path('index2/', views.index2, name='index2'),
    path('menu/cadastrar-ativo/', views.cadastrar_ativo, name='cadastrar_ativo'),   
]