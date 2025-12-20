from django.urls import path
from . import views
from django.contrib.auth.views import LogoutView



urlpatterns = [
    path('', views.citiesoft_home, name='citiesoft_home'),
    path('abrir_chamado/', views.abrir_chamado, name='abrir_chamado'),
    path('cadastro-ativo/', views.cadastro_ativo, name='cadastro_ativo'),   
    path("logout/", LogoutView.as_view(next_page="login"), name="logout"),
    path('cadastro_contrato/', views.cadastro_contrato, name='cadastro_contrato'),
    path('relatorios_atendimento/', views.relatorios_atendimento, name='relatorios_atendimento'),
    path('relatorio_ativos/', views.relatorio_ativos, name='relatorio_ativos'),
    path('autorizacao_usuarios/', views.autorizacao_usuarios, name='autorizacao_usuarios'),
    path('pessoas_ativas/', views.pessoas_ativas, name='pessoas_ativas'),
    
]