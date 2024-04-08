

# Create your views here.

from rest_framework import generics
from .models import Persona, Tarea
from .serializers import PersonaSerializer, TareaSerializer

class PersonaListCreateView(generics.ListCreateAPIView):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer

class PersonaRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer

class PersonaFilterByDocumentoView(generics.ListAPIView):
    serializer_class = PersonaSerializer

    def get_queryset(self):
        numero_documento = self.kwargs['numero_documento']
        return Persona.objects.filter(numero_documento=numero_documento)

class TareaListCreateView(generics.ListCreateAPIView):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer

class TareaRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer

class TareaFilterByFechaLimiteView(generics.ListAPIView):
    serializer_class = TareaSerializer

    def get_queryset(self):
        fecha_limite = self.kwargs['fecha_limite']
        return Tarea.objects.filter(fecha_limite=fecha_limite)

from django.utils.dateparse import parse_date

#CLASE PARA FILTRAR TAREAS POR RANGO DE FECHA
class TareaFilterByFechaLimiteRangeView(generics.ListAPIView):
    serializer_class = TareaSerializer

    def get_queryset(self):
        fecha_inicio_str = self.request.GET.get('fecha_inicio', None)
        fecha_fin_str = self.request.GET.get('fecha_fin', None)

        try:
            fecha_inicio = parse_date(fecha_inicio_str) if fecha_inicio_str else None
            fecha_fin = parse_date(fecha_fin_str) if fecha_fin_str else None
        except ValueError:
            return Tarea.objects.none()

        if fecha_inicio and fecha_fin:
            return Tarea.objects.filter(fecha_limite__range=[fecha_inicio, fecha_fin])
        elif fecha_inicio:
            return Tarea.objects.filter(fecha_limite__gte=fecha_inicio)
        elif fecha_fin:
            return Tarea.objects.filter(fecha_limite__lte=fecha_fin)
        else:
            return Tarea.objects.all()


class TareaFilterByPersonaView(generics.ListAPIView):
    serializer_class = TareaSerializer

    def get_queryset(self):
        tipo_documento = self.kwargs['tipo_documento']
        numero_documento = self.kwargs['numero_documento']
        return Tarea.objects.filter(persona__tipo_documento=tipo_documento, persona__numero_documento=numero_documento)

