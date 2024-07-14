import os
import time
import requests
from requests.exceptions import RequestException

# Get environment variables
URL = os.getenv('PING_URL')
TIMEOUT = int(os.getenv('PING_TIMEOUT', 600))  # Default to 600 seconds (10 minutes)

def ping_service():
    try:
        response = requests.get(URL)
        print(f"Ping successful. Status code: {response.status_code}")
    except RequestException as e:
        print(f"Ping failed. Error: {str(e)}")

def main():
    print(f"Keep-alive service started. Pinging {URL} every {TIMEOUT} seconds.")
    while True:
        ping_service()
        time.sleep(TIMEOUT)

if __name__ == "__main__":
    main()