from rest_framework import serializers
from . import models

class User_serializer(serializers.ModelSerializer):
    class Meta:
        model=models.User_Login
        fields=(
                'id',
                'user_name',
                'password', 
                               
                'create_at',
                'update_at',
                'slug',
                'status'             
        )
class User_Post_serializer(serializers.ModelSerializer):
   class Meta:
        model=models.User_Login
        fields=(
                'id',
                'user_name',
                'role_type',
                'password',                
                'create_at',
                'update_at',
                'slug',
                'status'             
        )         

        
class Company_serializer(serializers.ModelSerializer):
    class Meta:
        model=models.Company_model
        fields=(
                'id', 
               'company_name',
                'email',
                'contact', 
                'create_at',
                'update_at',
                'status', 
                'slug',
                'user_login' 
        )
class Branch_serializer(serializers.ModelSerializer):
    class Meta:
        model=models.Branch_model                   
        fields=(
                'id', 
                'branch_name', 
                'email', 
                'contact',
                'status',
                'slug',
                'create_at', 
                'update_at',
                'company',
                'user_login' 
            )
class Chit_group_serializer(serializers.ModelSerializer):
    class Meta:
        model=models.Chit_group
        fields=(
                'id',
                'groups_name',
                'installment_amount',
                'min_bid_amount', 
                'max_bid_amount',
                'bank_details', 
                'status',
                'slug', 
                'create_at', 
                'update_at', 
                'branch', 
                'company'
        )        
class Customer_serializer(serializers.ModelSerializer):
    class Meta:
        model=models.Customer_model              
        fields=(
                'id',
                'status', 
                'customer_name',
                'account_details', 
                'email', 
                'contact',
                'slug', 
                'create_at',
                'update_at',
                'branch', 
                'company', 
                 
                'user_login',
        )               
class Agent_serializer(serializers.ModelSerializer):
    class Meta:
        model=models.Agent_model
        fields=(
                'id',
                'agent_name',
                'status',
                'email', 
                'contact',
                'collector_id',
                'slug',
                'create_at', 
                'update_at', 
                'branch',
                'company',
                'user_login'
            )
class Auction_serializer(serializers.ModelSerializer):
    class Meta:
        model=models.Auction
        fields=(
                'id', 
                'auction_time', 
                'winner_amount', 
                'slug', 
                'create_at',
                'update_at', 
                'group',
                'winner', 
        )                  