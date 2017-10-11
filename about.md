---
layout: default
title: {{ site.name }}
---

## About the team
{% assign image_files = site.static_files | where: "image", true %}
{% for myimage in image_files %}
  {% if myimage.path == '/assets/img/andreFoto.jpg' %}
    {% assign info = 'André Pinho		   Nºmecanográfico: 80313    Contacto: [andre.s.pinho@ua.pt](mailto:andre.s.pinho@ua.pt)' %}      
  {% endif %}
  {% if myimage.path == '/assets/img/brunoFoto.jpg' %}
    {% assign info = 'Bruno Ribeiro        Nºmecanográfico: 78060    Contacto: [bruno.rs.ribeiro@ua.pt](mailto:bruno.rs.ribeiro@ua.pt)' %}      
  {% endif %}
  {% if myimage.path == '/assets/img/diegoFoto.jpg' %}
    {% assign info = 'Diego Hernandez      Nºmecanográfico: 77013    Contacto: [dc.hernandez@ua.pt](mailto:dc.hernandez@ua.pt)' %}      
  {% endif %}
  {% if myimage.path == '/assets/img/miguelFoto.jpg' %}
    {% assign info = ' Miguel Carvalho     Nºmecanográfico: 80169    Contacto: [miguel.paz.carvalho@ua.pt](mailto:miguel.paz.carvalho@ua.pt)' %}      
  {% endif %}

  |![fotos]({{ myimage.path }}) | {{info}} |

{% endfor %}
