#CONFIGURAMOS LAS RUTAS PARA LAS VISTAS

from django.urls import path
from .views import *

urlpatterns = [
    path('personas/', PersonaListCreateView.as_view(), name='personas-list-create'),
    path('personas/<int:pk>/', PersonaRetrieveUpdateDestroyView.as_view(), name='personas-retrieve-update-destroy'),
    path('personas/numero_documento/<str:numero_documento>/', PersonaFilterByDocumentoView.as_view(), name='personas-filter-by-documento'),
    path('tareas/', TareaListCreateView.as_view(), name='tareas-list-create'),
    path('tareas/<int:pk>/', TareaRetrieveUpdateDestroyView.as_view(), name='tareas-retrieve-update-destroy'),
    path('tareas/fecha_limite/<str:fecha_limite>/', TareaFilterByFechaLimiteView.as_view(), name='tareas-filter-by-fecha_limite'),
    path('tareas/fecha_limite_range/', TareaFilterByFechaLimiteRangeView.as_view(), name='tareas-filter-by-fecha_limite-range'),
    path('tareas/persona/<str:tipo_documento>/<str:numero_documento>/', TareaFilterByPersonaView.as_view(), name='tareas-filter-by-persona'),
]



