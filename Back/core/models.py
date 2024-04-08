from datetime import date
from django.db import models


# Create your models here.

#CREAMOS EL MODELO PERSONA
class Persona(models.Model):
    primer_nombre = models.CharField(max_length=100, default='')
    segundo_nombre = models.CharField(max_length=100, default='')
    primer_apellido = models.CharField(max_length=100, default='')
    segundo_apellido = models.CharField(max_length=100, default='')
    tipo_documento = models.CharField(max_length=100, default='')
    numero_documento = models.CharField(max_length=100, default='')
    correo = models.EmailField(max_length=254, default='')
    telefono = models.CharField(max_length=20, default='')
    pais_nacimiento = models.CharField(max_length=100, default='')
    genero = models.CharField(max_length=100, default='')
    estado_civil = models.CharField(max_length=100, default='')
    fecha_nacimiento = models.DateField(default=date.today)
    # Otros campos que desees agregar

    def __str__(self):
        return self.nombre



#CREAMOS EL MODELO TAREA
class Tarea(models.Model):
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE, related_name='tareas')
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    fecha_limite = models.DateField()

    def __str__(self):
        return self.titulo