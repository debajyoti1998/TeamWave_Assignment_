from datetime import datetime ,timezone

def sanitize_data(name ,input_value) :
    # print(input_value)
    try:
        my_date = datetime.strptime(input_value, '%Y-%m-%d')
        my_timestamp = int(datetime.timestamp(my_date))
        return('&'+name+'='+str(my_timestamp))
    except ValueError:
        return('')