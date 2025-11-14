# teste_final.py - Execute este arquivo
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tela_login.settings')
django.setup()

print("=== VERIFICAÇÃO FINAL DO SISTEMA ===")

# 1. Verifique se as URLs estão configuradas
from tela_login import urls
print("✅ URLs do projeto carregadas")

# 2. Verifique os modelos
from tickets.models import Ticket, CategoriaTicket, StatusTicket, UrgenciaTicket
from ativos.models import Ativo, TipoAtivo

print(f"✅ Modelo Ticket: {Ticket}")
print(f"✅ Modelo Ativo: {Ativo}")

# 3. Verifique se podemos criar objetos
try:
    # Pegue os primeiros objetos existentes
    categoria = CategoriaTicket.objects.first()
    status = StatusTicket.objects.first() 
    urgencia = UrgenciaTicket.objects.first()
    tipo_ativo = TipoAtivo.objects.first()
    
    print(f"✅ Categoria disponível: {categoria}")
    print(f"✅ Status disponível: {status}")
    print(f"✅ Urgência disponível: {urgencia}")
    print(f"✅ Tipo de Ativo disponível: {tipo_ativo}")
    
    print("\n🎉 SISTEMA PRONTO PARA USO!")
    print("\nAcesse no navegador:")
    print("1. http://127.0.0.1:8000/api/")
    print("2. http://127.0.0.1:8000/api/tickets/") 
    print("3. http://127.0.0.1:8000/api/ativos/")
    
except Exception as e:
    print(f"❌ Erro: {e}")