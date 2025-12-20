from django.shortcuts import render
from tickets.models import Ticket, StatusTicket

def citiesoft_home(request):
    status_fechado = StatusTicket.objects.filter(nome__iexact='Fechado').first()
    
    tickets_abertos = Ticket.objects.exclude(status=status_fechado).count()
    tickets_totais = Ticket.objects.count()
    
    context = {
        'tickets_abertos': tickets_abertos,
        'tickets_totais': tickets_totais,
    }
    
    return render(request, 'menu/citiesoft_home.html', context)

def abrir_chamado(request):
    return render(request, 'menu/abrir_chamado.html')

def cadastro_ativo(request):
    return render(request, 'menu/cadastro_ativo.html')

def cadastro_contrato(request):
    return render(request, 'menu/cadastro_contrato.html')

def relatorios_atendimento(request):
    return render(request, 'menu/relatorios_atendimento.html.html')

def relatorio_ativos(request):
    return render(request, 'menu/relatorio_ativos.html')

def autorizacao_usuarios(request):
    return render(request, 'menu/autorizacao_usuarios.html')

def pessoas_ativas(request):
    return render(request, 'menu/pessoas_ativas.html')
