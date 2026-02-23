import requests
import os
from dotenv import load_dotenv
import json
import pandas as pd
load_dotenv()

# Load the API URL from environment variables
API_URL = os.getenv("VITE_GOOGLE_SCRIPT_URL")

# Ensure the API_URL is set
if not API_URL:
    print("Error: API_URL environment variable not set.")
    exit() 

# 1. FETCH DATA
try:
    
    response = requests.get(API_URL)
    response.raise_for_status()
    data = response.json()
    invited_list = data.get('invited', [])
    rsvp_raw = data.get('rsvpMap', {})
    rsvp_data = list(rsvp_raw.values())
    print(rsvp_data)
    
    
    
    print(f"Successfully loaded {len(data)} records.")
except Exception as e:
    print(f"Error fetching data: {e}")
    exit()


for person in invited_list:
    name = person.get('name')
    party_id = person.get('partyId')
    print(f"Checking invited guest: {name} (Party: {party_id})")


