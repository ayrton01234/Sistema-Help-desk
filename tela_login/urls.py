from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

# Import das views
from tickets.views import (
    CategoriaTicketViewSet, StatusTicketViewSet, UrgenciaTicketViewSet,
    TicketViewSet, InteracaoTicketViewSet, CampoPersonalizadoViewSet
)
from ativos.views import (
    TipoAtivoViewSet, FabricanteViewSet, LocalizacaoViewSet, AtivoViewSet,
    SoftwareViewSet, InstalacaoSoftwareViewSet, ContratoViewSet, ContratoAtivoViewSet
)

router = routers.DefaultRouter()

# Tickets
router.register(r'categorias-tickets', CategoriaTicketViewSet)
router.register(r'status-tickets', StatusTicketViewSet)
router.register(r'urgencias-tickets', UrgenciaTicketViewSet)
router.register(r'tickets', TicketViewSet)
router.register(r'interacoes-tickets', InteracaoTicketViewSet)
router.register(r'campos-personalizados', CampoPersonalizadoViewSet)

# Ativos
router.register(r'tipos-ativos', TipoAtivoViewSet)
router.register(r'fabricantes', FabricanteViewSet)
router.register(r'localizacoes', LocalizacaoViewSet)
router.register(r'ativos', AtivoViewSet)
router.register(r'softwares', SoftwareViewSet)
router.register(r'instalacoes-software', InstalacaoSoftwareViewSet)
router.register(r'contratos', ContratoViewSet)
router.register(r'contratos-ativos', ContratoAtivoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('authentication.urls')),
    path('api/', include('users.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('api/', include(router.urls)),
]
