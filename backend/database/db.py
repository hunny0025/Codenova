class Database:
    def __init__(self):
        # In a real app, this would connect to SQL/NoSQL
        # For this hackathon, we'll use in-memory storage or mock data
        self.users = {}
        self.recipes = {} 

db = Database()
