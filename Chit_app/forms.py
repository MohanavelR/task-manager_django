from django import forms
class Login_form(forms.Form):
    user_name=forms.CharField(label='username',max_length=50)
    password=forms.CharField(label='password',max_length=50)
     