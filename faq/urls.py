from rest_framework.routers import DefaultRouter
from .views import FAQViewSet

router = DefaultRouter()
router.register(r'faq', FAQViewSet)

urlpatterns = router.urls
