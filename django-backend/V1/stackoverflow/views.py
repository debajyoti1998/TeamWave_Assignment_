from rest_framework.response import Response    
from rest_framework.views import APIView

from .utils import stackoverflow_search ,Retrive_Item_Redis ,Save_Item_Redis,URL_to_redis_key
from .helper import sanitize_data
import time




class index(APIView):
    def get(self,request):
        
        res ={
            "success": 0,
            "message" : "only POST method allowed"
        }
        return Response(res)
    
    def post(self,request,*args ,**kwargs):
        start_time = time.time()
        url='https://api.stackexchange.com/2.2/answers?site=stackoverflow'
        
        print(request.data)
        # 
        # 
        # 
        if request.data.get('page') != '' and request.data.get('page') != None:
            page=int(request.data.get('page'))
            if type(page) == int and page < 100:
                url += '&page='+str(page)
        

        # 
        # 
        #
        if request.data.get('pagesize') != '' and request.data.get('pagesize') != None:
            pagesize= int(request.data.get('pagesize'))
            if type(pagesize) == int and pagesize < 100:
                url += '&pagesize='+str(pagesize)
        

        # 
        # 
        #
        if request.data.get('fromdate') != '' and request.data.get('fromdate') != None : #dd/mm/yyyy
            fromdate=request.data.get('fromdate')
            url +=sanitize_data('fromdate',fromdate)
        
        # 
        # 
        #
        if request.data.get('order') == 'desc' :
            url += '&order=desc'
        else:
           url += '&order=asc'
        
        # 
        # 
        #
        if request.data.get('todate') != '' and request.data.get('todate') != None : #dd/mm/yyyy
            todate=request.data.get('todate')
            url +=sanitize_data('todate',todate)
        
        # 
        # 
        #
        if request.data.get('min') != '' and request.data.get('min') != None : #dd/mm/yyyy
            min_date=request.data.get('min')
            url +=sanitize_data('min',min_date)
            
        #   
        # 
        #
        if request.data.get('max') != '' and request.data.get('max') != None : #dd/mm/yyyy
            max_date=request.data.get('max')
            url +=sanitize_data('max',max_date)
            
        # 
        # 
        #
        if request.data.get('sort') == 'creation' :
            url += '&sort=creation'
        elif request.data.get('sort') == 'votes' :
            url += '&sort=votes'
        else:
           url += '&sort=activity'
        
        # 
    
        # if 'product' in cache:
        #     # get results from cache
        #     products = cache.get('product')
        # else:
           
        #     results = [product.to_json() for product in res]
        #     # store data in cache
        #     cache.set(product, results, timeout=CACHE_TTL)
        
        key= URL_to_redis_key(url)
        print(key)
        redis_data = Retrive_Item_Redis(key)
        return_data =None
        
        if redis_data == False:
            API_response_data = stackoverflow_search(url)
            redis_status = Save_Item_Redis(key,API_response_data,30)
            if redis_status :
                return_data = API_response_data
            print("adding dada to redis")
        else:
            return_data = redis_data
            print("getting data from redis")
        
        
        time_difference = str(time.time() - start_time)+' sec'
        
        if return_data == None:
            res ={      
                "success": 0,
                "message" : "no data received",
                "url": url,
                "response_time":time_difference
            }
            return Response(res)
        else:   
            res ={      
                "success": 1,
                "data" : return_data,
                "url": url,
                "response_time":time_difference
            }
            return Response(res)
        
                  
    