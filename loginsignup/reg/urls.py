from django.contrib import admin
from django.urls import path,include
from .views import LoginView,LogoutView,RegisterView,UserView

urlpatterns = [
  path('register',RegisterView.as_view()),
  # path('register', register_view),
  path('login/', LoginView.as_view(), name='token_obtain_pair'),
  path('logout/', LogoutView.as_view(), name='token_refresh'),
  path('user/',UserView.as_view()),
]
