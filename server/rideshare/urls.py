from django.conf.urls import url
from rideshare import views

urlpatterns = [
    url(r'^rideshare/user_registration/$', views.user_registration),
    url(r'^rideshare/user_login/$', views.user_login),
    url(r'^rideshare/new_planned_trip/$', views.new_planned_trip),
    url(r'^rideshare/new_proposed_trip/$', views.new_proposed_trip),
    url(r'^rideshare/get_all_planned_trips/$', views.get_all_planned_trips),
    url(r'^rideshare/ride_join_trip/$', views.ride_join_trip),
    url(r'^rideshare/get_driver_planned_trips/$', views.get_driver_planned_trips),
    url(r'^rideshare/get_riders_on_trip/$', views.get_riders_on_trip),
    url(r'^rideshare/rider_apprival/$', views.rider_apprival),
    url(r'^rideshare/driver_ondemand_change/$', views.driver_ondemand_change),
    url(r'^rideshare/driver_ondemand_get_rider/$', views.driver_ondemand_get_rider),
    url(r'^rideshare/decide_rider_ondemand/$', views.decide_rider_ondemand),
]