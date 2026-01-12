from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.admin.views.decorators import staff_member_required
from django.db.models import Q
from django.utils import timezone
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.apps import apps
import json

# ===== Models do próprio app =====
from .models import Categoria, Artigo

# ===== Models do app tickets (forma segura) =====
Ticket = apps.get_model('tickets', 'Ticket')
CategoriaTicket = apps.get_model('tickets', 'CategoriaTicket')
StatusTicket = apps.get_model('tickets', 'StatusTicket')


# ========== VIEWS ADMINISTRATIVAS ==========

def citiesoft_home(request):
    status_fechado = StatusTicket.objects.filter(nome__iexact='Fechado').first()

    tickets_abertos = Ticket.objects.exclude(status=status_fechado).count()
    tickets_totais = Ticket.objects.count()

    return render(request, 'menu/citiesoft_home.html', {
        'tickets_abertos': tickets_abertos,
        'tickets_totais': tickets_totais,
    })


def abrir_chamado(request): return render(request, 'menu/abrir_chamado.html')
def cadastro_ativo(request): return render(request, 'menu/cadastro_ativo.html')
def cadastro_contrato(request): return render(request, 'menu/cadastro_contrato.html')
def relatorios_atendimento(request): return render(request, 'menu/relatorios_atendimento.html')
def relatorio_ativos(request): return render(request, 'menu/relatorio_ativos.html')
def autorizacao_usuarios(request): return render(request, 'menu/autorizacao_usuarios.html')
def pessoas_ativas(request): return render(request, 'menu/pessoas_ativas.html')
def metricas_kpi(request): return render(request, 'menu/metricas_kpi.html')
def atribuicao_tickets(request): return render(request, 'menu/atribuicao_tickets.html')
def cadastro_usuario(request): 
    return render(request, 'menu/admin/cadastro_usuario.html') # Adicionado /admin/


# ========== CLIENTE ==========


def template_cliente(request):
    return render(request, 'menu/cliente/template_cliente.html')


@login_required
def abrir_chamado_cliente(request):

    if request.method == 'POST':
        assunto = request.POST.get('assunto', '').strip()
        area = request.POST.get('area', '').strip()
        categoria_id = request.POST.get('categoria')
        prioridade = request.POST.get('prioridade')
        descricao = request.POST.get('descricao', '').strip()
        anexo = request.FILES.get('anexos')

        if not all([assunto, area, categoria_id, prioridade, descricao]):
            messages.error(request, 'Preencha todos os campos obrigatórios.')
            return redirect('abrir_chamado_cliente')

        try:
            categoria = CategoriaTicket.objects.get(id=categoria_id)
        except CategoriaTicket.DoesNotExist:
            messages.error(request, 'Categoria inválida.')
            return redirect('abrir_chamado_cliente')

        ticket = Ticket.objects.create(
            titulo=assunto,
            descricao=descricao,
            categoria=categoria,
            criado_por=request.user
        )

        messages.success(request, f'Chamado {ticket.numero_ticket} criado com sucesso.')
        return redirect('meus_chamados')

    categorias = CategoriaTicket.objects.filter(ativo=True).order_by('nome')

    return render(request, 'menu/cliente/abrir_chamado_cliente.html', {
        'categorias': categorias
    })


@login_required
def meus_chamados(request):
    tickets = Ticket.objects.filter(criado_por=request.user).order_by('-data_criacao')
    return render(request, 'menu/cliente/meus_chamados.html', {'tickets': tickets})


# ========== BASE DE CONHECIMENTO (ADMIN) ==========

@staff_member_required
def admin_base_conhecimento(request):
    categorias = Categoria.objects.filter(ativo=True).order_by('ordem')
    return render(request, 'menu/admin/admin_base_conhecimento.html', {'categorias': categorias})


@staff_member_required
def api_artigos_list(request):
    artigos = Artigo.objects.select_related('categoria', 'autor')
    return JsonResponse([
        {
            'id': a.id,
            'titulo': a.titulo,
            'slug': a.slug,
            'categoria': a.categoria.nome,
            'ativo': a.ativo
        } for a in artigos
    ], safe=False)


@staff_member_required
@csrf_exempt
def api_artigo_save(request, artigo_id=None):
    if request.method != 'POST':
        return JsonResponse({'error': 'Método não permitido'}, status=405)

    data = json.loads(request.body)

    artigo = get_object_or_404(Artigo, id=artigo_id) if artigo_id else Artigo(autor=request.user)

    artigo.titulo = data['titulo']
    artigo.slug = data['slug']
    artigo.resumo = data['resumo']
    artigo.conteudo = data['conteudo']
    artigo.categoria_id = data['categoria_id']
    artigo.tipo = data['tipo']
    artigo.tags = data.get('tags', '')
    artigo.ativo = data.get('ativo', False)

    if artigo.ativo and not artigo.data_publicacao:
        artigo.data_publicacao = timezone.now()

    artigo.save()
    return JsonResponse({'success': True})


@staff_member_required
@csrf_exempt
def api_artigo_delete(request, artigo_id):
    if request.method != 'POST':
        return JsonResponse({'error': 'Método não permitido'}, status=405)

    artigo = get_object_or_404(Artigo, id=artigo_id)
    artigo.delete()
    return JsonResponse({'success': True})


# ========== BASE DE CONHECIMENTO (CLIENTE) ==========

def base_conhecimento(request):
    categorias = Categoria.objects.filter(ativo=True)
    artigos_populares = Artigo.objects.filter(ativo=True).order_by('-visualizacoes')[:6]

    return render(request, 'menu/cliente/base_conhecimento.html', {
        'categorias': categorias,
        'artigos_populares': artigos_populares
    })


def categoria_artigos(request, slug):
    categoria = get_object_or_404(Categoria, slug=slug, ativo=True)
    artigos = Artigo.objects.filter(categoria=categoria, ativo=True)

    return render(request, 'menu/cliente/categoria_artigos.html', {
        'categoria': categoria,
        'artigos': artigos
    })


def artigo_detalhe(request, slug):
    artigo = get_object_or_404(Artigo, slug=slug)

    # 🔒 cliente NÃO acessa artigo inativo
    if not artigo.ativo:
        return redirect('base_conhecimento')

    artigo.visualizacoes += 1
    artigo.save(update_fields=['visualizacoes'])

    return render(request, 'menu/cliente/artigo_detalhe.html', {
        'artigo': artigo,
        'preview_admin': False
    })



def busca_resultados(request):
    query = request.GET.get('q', '')
    artigos = Artigo.objects.filter(
        Q(titulo__icontains=query) | Q(resumo__icontains=query),
        ativo=True
    ) if query else []

    return render(request, 'menu/cliente/busca_resultados.html', {
        'query': query,
        'results': artigos,
        'total_results': len(artigos)
    })
@csrf_exempt
def registrar_visualizacao(request, slug):
    if request.method == 'POST':
        try:
            artigo = get_object_or_404(Artigo, slug=slug)
            artigo.visualizacoes = (artigo.visualizacoes or 0) + 1
            artigo.save(update_fields=['visualizacoes'])
            return JsonResponse({'success': True})
        except Artigo.DoesNotExist:
            return JsonResponse({'success': False}, status=404)

    return JsonResponse({'error': 'Método não permitido'}, status=405)
@csrf_exempt
def avaliar_artigo(request, slug):
    if request.method != 'POST':
        return JsonResponse(
            {'error': 'Método não permitido'},
            status=405
        )

    try:
        data = json.loads(request.body)
        artigo = get_object_or_404(Artigo, slug=slug)

        if data.get('helpful') is True:
            artigo.avaliacoes_positivas = (artigo.avaliacoes_positivas or 0) + 1
        else:
            artigo.avaliacoes_negativas = (artigo.avaliacoes_negativas or 0) + 1

        artigo.save(update_fields=[
            'avaliacoes_positivas',
            'avaliacoes_negativas'
        ])

        return JsonResponse({'success': True})

    except Exception as e:
        return JsonResponse(
            {'success': False, 'error': str(e)},
            status=400
        )
@csrf_exempt
def api_busca(request):
    if request.method != 'POST':
        return JsonResponse(
            {'error': 'Método não permitido'},
            status=405
        )

    try:
        data = json.loads(request.body)
        query = data.get('q', '').strip()

        resultados = Artigo.objects.filter(
            Q(titulo__icontains=query) |
            Q(resumo__icontains=query) |
            Q(conteudo__icontains=query) |
            Q(tags__icontains=query),
            ativo=True
        ).order_by('-visualizacoes')[:20]

        resultados_data = [
            {
                'id': artigo.id,
                'titulo': artigo.titulo,
                'slug': artigo.slug,
                'categoria': artigo.categoria.nome,
                'categoria_slug': artigo.categoria.slug,
                'visualizacoes': artigo.visualizacoes or 0
            }
            for artigo in resultados
        ]

        return JsonResponse({'results': resultados_data})

    except Exception as e:
        return JsonResponse(
            {'success': False, 'error': str(e)},
            status=400
        )
from django.contrib.admin.views.decorators import staff_member_required
@staff_member_required
def artigo_preview_admin(request, slug):
    artigo = get_object_or_404(Artigo, slug=slug)

    return render(request, 'menu/cliente/artigo_detalhe.html', {
        'artigo': artigo,
        'preview_admin': True
    })

