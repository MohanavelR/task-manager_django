from rest_framework import serializers
from . import models

class User_getserializer(serializers.ModelSerializer):
    class Meta:
        model=models.User_Login
        fields=(
                'id',
                'user_name',
                'password',
                'role_type',
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
                'branch', 
                'company',
        )        
class Customer_serializer(serializers.ModelSerializer):
    class Meta:
        model=models.Customer_model              
        fields=(
                'id', 
                'customer_name',
                'account_details', 
                'email', 
                'contact',
                'branch', 
                'company', 
                'group', 
                'user_login',
        )               
class Agent_serializer(serializers.ModelSerializer):
    class Meta:
        model=models.Agent_model
        fields=(
                'id',
                'agent_name',
                'email', 
                'contact',
                'collector_id',
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
                'group',
                'winner', 
        )                          