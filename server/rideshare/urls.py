from django.conf.urls import url
from rideshare import views

urlpatterns = [
    url(r'^rideshare/user_registration/$', views.user_registration),
    url(r'^rideshare/user_login/$', views.user_login),
    url(r'^rideshare/new_planned_trip/$', views.new_planned_trip),
]