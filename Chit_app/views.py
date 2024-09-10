from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from . import serializers
from . import models
from . import serializers_post



def Index(request):
   return render(request,'index.html')
@csrf_exempt
def All_data(request):
     if request.method=="GET":
         all_company_details=models.Company_model.objects.all()
         all_branch_details=models.Branch_model.objects.all()
         all_chitgroup_details=models.Chit_group.objects.all()
         all_agent_details=models.Agent_model.objects.all()
         all_customer_details=models.Customer_model.objects.all()
         company_serializer_value=serializers.Company_serializer(all_company_details,many=True).data
         branch_serializer_value=serializers.Branch_serializer(all_branch_details,many=True).data
         agent_serializer_value=serializers.Agent_serializer(all_agent_details,many=True).data
         chitgroup_serializer_value=serializers.Chit_group_serializer(all_chitgroup_details,many=True).data
         customer_serializer_value=serializers.Customer_serializer(all_customer_details,many=True).data
         return JsonResponse({
         'company':company_serializer_value,
          'branch':branch_serializer_value,
          'agent'  :agent_serializer_value,
           'group':chitgroup_serializer_value,
           'customer':customer_serializer_value
},safe=False)

def Get_branch(request, company_id):
    branches = list(models.Branch_model.objects.filter(company_id=company_id,status=1).values("id", "branch_name"))
    return JsonResponse(branches, safe=False)
def userCheck(req):
    user=list(models.User_Login.objects.all().values('id','user_name','password'))
    return JsonResponse(user,safe=False)
                 
@csrf_exempt
def Active_data(request):
     if request.method=="GET":
         all_company_details=models.Company_model.objects.filter(status=1)
         all_branch_details=models.Branch_model.objects.filter(status=1)
         all_agent_details=models.Agent_model.objects.filter(status=1)
         all_customer_details=models.Customer_model.objects.filter(status=1)
         all_group_details=models.Chit_group.objects.filter(status=1)
         if all_company_details.exists():             
              company_serializer_value=serializers.Company_serializer(all_company_details,many=True).data
         else:
             company_serializer_value={}
         if all_branch_details.exists():    
            branch_serializer_value=serializers.Branch_serializer(all_branch_details,many=True).data
         else:
             branch_serializer_value={}
         if all_group_details.exists():
             group_serializer_value=serializers.Chit_group_serializer(all_group_details,many=True).data
         else:
             group_serializer_value={}
         if all_agent_details.exists():             
            agent_serializer_value=serializers.Agent_serializer(all_agent_details,many=True).data
         else:
             agent_serializer_value={}
         if all_customer_details.exists():             
             customer_serializer_value=serializers.Customer_serializer(all_customer_details,many=True).data
         else :
             customer_serializer_value={}
         return JsonResponse({
         'company':company_serializer_value,
          'branch':branch_serializer_value,
          'agent'  :agent_serializer_value,
          'group':group_serializer_value,
            'customer':customer_serializer_value
},safe=False)
                    

@csrf_exempt
def Login_view(req):
    if req.method=="POST":
        # react post method geting value
        login_data=JSONParser().parse(req)      
        serializer_post_value=serializers.User_serializer(data=login_data)            
        # Checking value is valid or not
        if serializer_post_value.is_valid():
           user_login_check=models.User_Login.objects.filter(user_name=login_data['user_name'],password=login_data['password']).exists()         
            # Checking value
           if user_login_check:
              user_login_information=models.User_Login.objects.get(user_name=login_data['user_name'],password=login_data['password'])
              # geting role
              
              # type company
              if user_login_information.role_type=='company':
                   company_details=models.Company_model.objects.get(user_login_id=user_login_information.id)                 
                   customer_details_check=models.Customer_model.objects.filter(company_id=company_details.id).exists()
                   # geting customer value
                   if customer_details_check:
                        customer_details=models.Customer_model.objects.filter(company_id=company_details.id)                                                    
                        customer_serializer_value=serializers.Customer_serializer(customer_details,many=True).data
                   else:
                        customer_serializer_value={} 
                   # getting branch value
                   branch_details_check=models.Branch_model.objects.filter(company_id=company_details.id).exists()
                   if branch_details_check:
                       branch_details=models.Branch_model.objects.filter(company_id=company_details.id)                                                    
                       branch_serializer_value=serializers.Branch_serializer(branch_details,many=True).data
                   else:
                        branch_serializer_value={}
                   # getting Agent Value
                   agent_details_check=models.Agent_model.objects.filter(company_id=company_details.id).exists()
                   if agent_details_check:
                       agent_details=models.Agent_model.objects.filter(company_id=company_details.id)                                                    
                       agent_serializer_value=serializers.Agent_serializer(agent_details,many=True).data
                   else:
                       agent_serializer_value={}
                   # getting chit groups
                   chitgroup_details_check=models.Chit_group.objects.filter(company_id=company_details.id).exists()
                   if  chitgroup_details_check:
                       chitgroup_details=models.Chit_group.objects.filter(company_id=company_details.id)                                                    
                       chitgroup_serializer_value=serializers.Chit_group_serializer( chitgroup_details,many=True).data
                   else:
                       chitgroup_serializer_value={}                       
                   company_serializer_value=serializers.Company_serializer(company_details)                               
                   return JsonResponse({'company':company_serializer_value.data,
                                        'customer':customer_serializer_value,
                                        'branch':branch_serializer_value,
                                        'agent':agent_serializer_value,
                                        'chitgroup':chitgroup_serializer_value,
                                        'role':'company'                                             
                                        },safe=False,status=200)
              
              # type branch
              elif user_login_information.role_type=='branch':
                   branch_details=models.Branch_model.objects.get(user_login_id=user_login_information.id)
                   customer_details_check=models.Customer_model.objects.filter(branch_id=branch_details.id).exists()
                   if customer_details_check:
                       customer_details=models.Customer_model.objects.filter(branch_id=branch_details.id)
                       customer_serializer_value=serializers.Customer_serializer(customer_details,many=True).data
                   else:
                       customer_serializer_value={}    
                   chitgroup_details_check=models.Chit_group.objects.filter(branch_id=branch_details.id).exists()
                   if chitgroup_details_check:
                       chitgroup_details=models.Chit_group.objects.filter(branch_id=branch_details.id)
                       chitgroup_serializer_value=serializers.Chit_group_serializer(chitgroup_details,many=True).data
                   else:
                       chitgroup_serializer_value={}
                   company_details_check=models.Company_model.objects.filter(id=branch_details.company_id).exists()
                   if company_details_check:
                       company_details=models.Company_model.objects.get(id=branch_details.company_id)
                       company_serializer_value=serializers.Company_serializer(company_details).data
                   else:
                       company_serializer_value={}
                   agent_details_check=models.Agent_model.objects.filter(branch_id=branch_details.id)
                   if agent_details_check.exists():
                       agent_serializer_value=serializers.Agent_serializer(agent_details_check,many=True).data               
                   else:
                       agent_serializer_value={}
                   branch_serializer_value=serializers.Branch_serializer(branch_details).data    
                   return JsonResponse({'customer':customer_serializer_value,
                                        'chitgroup':chitgroup_serializer_value,
                                        'company':company_serializer_value,
                                        'agent':agent_serializer_value,
                                        'branch':branch_serializer_value,
                                        'role':'branch'} ,safe=False,status=200)
              elif user_login_information.role_type=='agent':
                    agent_details=models.Agent_model.objects.get(user_login_id=user_login_information.id)
                    company_details_check=models.Company_model.objects.filter(id=agent_details.company_id)
                    if company_details_check.exists():
                        company_details=models.Company_model.objects.get(id=agent_details.company_id)
                        company_serializer_value=serializers.Company_serializer(company_details).data
                    else:
                        company_serializer_value={}
                    branch_details_check=models.Branch_model.objects.filter(id=agent_details.branch_id)
                    if branch_details_check.exists():
                        branch_details=models.Branch_model.objects.get(id=agent_details.branch_id)
                        branch_serializer_value=serializers.Branch_serializer(branch_details).data        
                    else:
                        branch_serializer_value={}
                    customer_details=models.Customer_model.objects.filter(branch_id=branch_details.id)
                    if customer_details.exists():
                        customer_serializer_value=serializers.Customer_serializer(customer_details,many=True).data
                    else:
                        customer_serializer_value={}
                    chitgroup_details=models.Chit_group.objects.filter(branch_id=branch_details.id)
                    if chitgroup_details.exists():
                        chitgroup_serializer_value=serializers.Chit_group_serializer(chitgroup_details,many=True).data
                    else:
                        chitgroup_serializer_value={}
                    agent_serializer_value=serializers.Agent_serializer(agent_details).data                  
                    return JsonResponse({'agent':agent_serializer_value,
                                'branch':branch_serializer_value,
                                'customer':customer_serializer_value,
                                'company':company_serializer_value,
                                'role':'agent',
                                'chitgroup':chitgroup_serializer_value},safe=False,status=200)                      
              elif user_login_information.role_type=='customer':
                     customer_details=models.Customer_model.objects.get(user_login_id=user_login_information.id)
                     branch_details_check=models.Branch_model.objects.filter(id=customer_details.branch_id)
                     if branch_details_check.exists():
                         branch_details=models.Branch_model.objects.get(id=customer_details.branch_id)
                         branch_serializer_value=serializers.Branch_serializer(branch_details).data
                     else:
                         branch_serializer_value={}
                     company_details_check=models.Company_model.objects.filter(id=customer_details.company_id)
                     if company_details_check.exists():
                         company_details=models.Company_model.objects.get(id=customer_details.company_id)
                         company_serializer_value=serializers.Company_serializer(company_details).data
                     else:
                         company_serializer_value={}
                     chitgroup_details_check=models.Chit_group.objects.filter(id=customer_details.group_id)
                     if chitgroup_details_check.exists():
                         chitgroup_details=models.Chit_group.objects.get(id=customer_details.group_id)                                              
                         chitgroup_serializer_value=serializers.Chit_group_serializer(chitgroup_details).data
                     else:
                         chitgroup_serializer_value={}    
                     customer_serializer_value=serializers.Customer_serializer(customer_details).data
                     return JsonResponse({
                                'role':'customer',
                                'branch':branch_serializer_value,
                                'customer':customer_serializer_value,
                                'company':company_serializer_value,
                                'chitgroup':chitgroup_serializer_value},safe=False,status=200)                           
           return JsonResponse({'error':'Incorrect Username or Password'},safe=False,status=400)        
        else:
          return JsonResponse({'error':'Invaild Password or Username'},safe=False,status=400)
    else:
        return JsonResponse({'error':'Server Crashed Please Information officer'},safe=False,status=400)

@csrf_exempt
def Post_data(request):
    if request.method=="POST":
       Post_Value=JSONParser().parse(request)
       user_name=Post_Value['user_name']
       password=Post_Value['password']
       role=Post_Value['role']
       user_post_value={
           'user_name':user_name,
           'password':password,
           'role_type':role
       }
       user_serializer=serializers.User_Post_serializer(data=user_post_value)
       if user_serializer.is_valid():
           user_serializer.save()
           del Post_Value['user_name']
           del Post_Value['password']         
           del Post_Value['role']
           new_user_id=models.User_Login.objects.get(user_name=user_name,password=password)
        #    new_user_id_serializers=serializers_post.User_getserializer(new_user_id).data
           Post_Value['user_login']=new_user_id.id
           if role=='company':               
               new_company_details=serializers.Company_serializer(data=Post_Value)
               if new_company_details.is_valid():
                   new_company_details.save()
                   return JsonResponse({'success':"successfully Registered."},safe=False) 
               else:
                   new_user_id.delete()
                   return JsonResponse({'error':"Unsuccess Your Registraction.",'data':Post_Value},safe=False)   
           elif role=='branch':
            #    company_id=models.Company_model.objects.get(company_name=Post_Value['company'])                              
              
               new_branch_details=serializers.Branch_serializer(data=Post_Value)
               if new_branch_details.is_valid():
                   new_branch_details.save()
                   return JsonResponse({'success':'successfully Registered.'})
               else:
                   new_user_id.delete()
                   return JsonResponse({'error':"Unsuccess Your Registraction."},safe=False)   
           elif role=='agent':
            #    company_id=models.Company_model.objects.get(company_name=Post_Value['company'])                              
            #    branch_id=models.Branch_model.objects.get(branch_name=Post_Value['branch'])
            #    Post_Value['branch']=branch_id.id
            #    Post_Value['company']=company_id.id
               new_agent_details=serializers.Agent_serializer(data=Post_Value)
               if new_agent_details.is_valid():
                   new_agent_details.save()
                   return JsonResponse({'success':'successfully Registered.'},safe=False)
               else:
                   new_user_id.delete()
                   return JsonResponse({'faliure':"Your Registraction Faliure"},safe=False)
           elif role=='customer':
            #    company_id=models.Company_model.objects.get(company_name=Post_Value['company'])                              
            #    branch_id=models.Branch_model.objects.get(branch_name=Post_Value['branch'])
            #    Post_Value['branch']=branch_id.id
            #    Post_Value['company']=company_id.id
               new_customer_details=serializers.Customer_serializer(data=Post_Value)
               if new_customer_details.is_valid():
                   new_customer_details.save()
                   return JsonResponse({'success':'Successfully Registered.'})
               else:
                   new_user_id.delete()                                              
                   return JsonResponse({'faliure':"Your Registraction Faliure"},safe=False)
       else:
           return JsonResponse({'error':'Invalid Username or Password'},safe=False)         
       