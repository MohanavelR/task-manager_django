from django.db import models
import datetime
from django.utils.text import slugify



def createSlug():
        date=datetime.datetime.now()
        return date

# Login model

class User_Login(models.Model):
    user_name=models.CharField(max_length=50,blank=False,null=False)
    password=models.CharField(max_length=50,blank=False,null=False)
    role_type=models.CharField(max_length=50,blank=False,null=False)
    create_at=models.DateTimeField(auto_now_add=True,serialize=False)
    update_at=models.CharField(max_length=50,blank=True,null=True,serialize=False)
    slug=models.SlugField(unique=True,serialize=False)
    status=models.BooleanField(default=True,help_text='0-hidden,1-show',serialize=False)
    def save(self,*args,**kwargs):
      self.slug=slugify(createSlug())
      super().save(*args,**kwargs)    
    def __str__(self):
        return self.user_name
    
#company Models 

class Company_model(models.Model):
    user_login=models.ForeignKey(User_Login,on_delete=models.CASCADE)    
    company_name=models.CharField(max_length=200,blank=False,null=False)
    email=models.CharField(max_length=100,null=False,blank=False)
    contact=models.CharField(max_length=100,null=False,blank=False)
    create_at=models.DateTimeField(auto_now_add=True,serialize=False)
    update_at=models.CharField(max_length=50,blank=True,null=True,serialize=False)
    status=models.BooleanField(serialize=False,default=True,help_text='0-hidden,1-show')
    slug=models.SlugField(serialize=False,unique=True)
    def save(self,*args,**kwargs):
      self.slug=slugify(createSlug())
      super().save(*args,**kwargs)    
    def __str__(self):
        return self.company_name

# Branch Model

class Branch_model(models.Model):
    user_login=models.ForeignKey(User_Login,on_delete=models.CASCADE)
    company=models.ForeignKey(Company_model,on_delete=models.CASCADE)
    branch_name=models.CharField(max_length=100,null=False,blank=False)
    email=models.CharField(max_length=100,null=False,blank=False)
    contact=models.CharField(max_length=100,null=False,blank=False)    
    create_at=models.DateTimeField(auto_now_add=True,serialize=False)
    update_at=models.CharField(max_length=50,blank=True,null=True,serialize=False)
    status=models.BooleanField(serialize=False,default=True,help_text='0-hidden,1-show')
    slug=models.SlugField(serialize=False,unique=True)
    def save(self,*args,**kwargs):
      self.slug=slugify(createSlug())
      super().save(*args,**kwargs)    
    def __str__(self):
        return self.branch_name

# Chit group model

class Chit_group(models.Model):
    groups_name=models.CharField(max_length=100,null=False)
    company=models.ForeignKey(Company_model,on_delete=models.CASCADE)
    branch=models.ForeignKey(Branch_model,on_delete=models.CASCADE)
    installment_amount=models.CharField(max_length=10,null=False,blank=False)
    min_bid_amount=models.CharField(max_length=10,null=False,blank=False)
    max_bid_amount=models.CharField(max_length=10,null=False,blank=False)
    bank_details=models.TextField(max_length=500,null=False,blank=False)
    create_at=models.DateTimeField(auto_now_add=True,serialize=False)
    update_at=models.CharField(max_length=50,blank=True,null=True,serialize=False)
    status=models.BooleanField(serialize=False,default=True,help_text='0-hidden,1-show')
    slug=models.SlugField(serialize=False,unique=True)   
    def save(self,*args,**kwargs):
      self.slug=slugify(createSlug())
      super().save(*args,**kwargs)   
    def __str__(self):
        return self.groups_name

# Customer Model

class Customer_model(models.Model):
    user_login=models.ForeignKey(User_Login,on_delete=models.CASCADE)
    group=models.ForeignKey(Chit_group,serialize=False,blank=True,null=True,on_delete=models.CASCADE)
    company=models.ForeignKey(Company_model,on_delete=models.CASCADE)
    branch=models.ForeignKey(Branch_model,on_delete=models.CASCADE)
    #  status=models.BooleanField(default=True,help_text='0-hidden,1-show')
    customer_name=models.CharField(max_length=100,blank=False,null=False)
    account_details=models.TextField(max_length=100)
    email=models.CharField(max_length=100,null=False,blank=False)
    contact=models.CharField(max_length=100,null=False,blank=False)    
    create_at=models.DateTimeField(auto_now_add=True,serialize=False)
    update_at=models.CharField(max_length=50,blank=True,null=True,serialize=False)
    status=models.BooleanField(serialize=False,default=True,help_text='0-hidden,1-show')
    slug=models.SlugField(serialize=False,unique=True)   
    def save(self,*args,**kwargs):
      self.slug=slugify(createSlug())
      super().save(*args,**kwargs)    
    def __str__(self):
        return self.customer_name

                  # Agent model

# Agent model

class Agent_model(models.Model):
    user_login=models.ForeignKey(User_Login,on_delete=models.CASCADE)
    agent_name=models.CharField(max_length=100,null=True,blank=True)
    company=models.ForeignKey(Company_model,on_delete=models.CASCADE)
    # status=models.BooleanField(default=True,help_text='0-hidden,1-show')
    branch=models.ForeignKey(Branch_model,on_delete=models.CASCADE)
    email=models.CharField(max_length=100,null=False,blank=False)
    contact=models.CharField(max_length=100,null=False,blank=False)    
    collector_id=models.CharField(max_length=500,null=False,blank=False)
    create_at=models.DateTimeField(auto_now_add=True,serialize=False)
    update_at=models.CharField(max_length=50,blank=True,null=True,serialize=False)
    status=models.BooleanField(serialize=False,default=True,help_text='0-hidden,1-show')
    slug=models.SlugField(serialize=False,unique=True)   
    def save(self,*args,**kwargs):
      self.slug=slugify(createSlug())
      super().save(*args,**kwargs)    
    def __str__(self):
        return self.agent_name
    # 

# Auction model

class Auction(models.Model):
    group=models.ForeignKey(Chit_group,blank=True,null=True,on_delete=models.CASCADE)
    auction_time=models.CharField(max_length=30,blank=False,null=False)
    winner=models.ForeignKey(Customer_model,on_delete=models.CASCADE)
    winner_amount=models.CharField(max_length=10)            
    create_at=models.DateTimeField(auto_now_add=True,serialize=False)
    update_at=models.CharField(max_length=50,blank=True,null=True,serialize=False)
    status=models.BooleanField(serialize=False,default=True,help_text='0-hidden,1-show')
    slug=models.SlugField(serialize=False,unique=True) 
    def save(self,*args,**kwargs):
      self.slug=slugify(createSlug())
      super().save(*args,**kwargs)   
    def __str__(self):
        return self.agent_name    