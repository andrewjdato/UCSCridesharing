from django.contrib import admin
from .models import *


admin.site.register(PlannedTrips)
admin.site.register(ProposedTrips)
admin.site.register(RideProfile)
admin.site.register(RiderApproveTrip)
admin.site.register(DriverActive)
admin.site.register(RiderActive)