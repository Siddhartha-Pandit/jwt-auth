from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework import status
from .models import User
from rest_framework.exceptions import AuthenticationFailed
import jwt,datetime
from rest_framework.permissions import AllowAny



class RegisterView(APIView):
    def post(self,request):
        serializer=UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_UNAUTHORIZED)
        

class LoginView(APIView):
  def post(self, request):
    
    email = request.data['email']
    password = request.data['password']
    user = User.objects.filter(email=email).first()
    if user is None:
        raise AuthenticationFailed('User not Found')

    
    payload = {
        'id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        'iat': datetime.datetime.utcnow()
    }
    token = jwt.encode(payload, 'secret', algorithm='HS256')

    if not user.check_password(password):
        raise AuthenticationFailed('Incorrect password')

    response = Response()
    

        
        
    response.set_cookie(key='jwt', value=token, httponly=True)
    # # localStorage.setItem('token', token)
    response.data = {'token': token}
    return response


# class UserView(APIView):
#     # permission_classes = [AllowAny]

#     def get(self, request):
        
#         token = request.COOKIES.get('jwt')
       
#         print(token)
#         if not token:
#             print("dint get token")
#             raise AuthenticationFailed('Unauthenticated')

#         try:
#             payload = jwt.decode(token, 'secret', algorithms=['HS256'])

#         except jwt.ExpiredSignatureError:
           
#             raise AuthenticationFailed('Unauthenticated')

#         user = User.objects.filter(id=payload['id']).first()
#         serializer = UserSerializer(user)

#         # return Response(serializer.data)
#         return Response(serializer.data)



class UserView(APIView):
    def get(self, request):
        token = None
        # token = request.COOKIES.get('jwt')
        print(request.COOKIES)

        # Check if the Authorization header is present
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            # Split the header to extract the token
            token = auth_header.split(' ')[1]

        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')

        user = User.objects.filter(id=payload['id']).first()

        if not user:
            raise AuthenticationFailed('User not found')

        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class LogoutView(APIView):
    def post(self,request):
        response=Response()
        response.delete_cookie('jwt')
        response.data={
            "message":"You are log out"
        }
        return response
    
