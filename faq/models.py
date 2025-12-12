from django.db import models

class FAQ(models.Model):
    pergunta = models.TextField()
    resposta = models.TextField()
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.pergunta[:50]

