#!/usr/bin/env python3
"""Initialize database tables with proper schema"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import engine, Base
from app.models.user import User
from sqlalchemy import text

def recreate_tables():
    """Drop and recreate all tables"""
    try:
        print("Dropping existing tables...")
        Base.metadata.drop_all(bind=engine)
        print("✅ Tables dropped")
        
        print("Creating new tables...")
        Base.metadata.create_all(bind=engine)
        print("✅ Tables created")
        
        # Test basic functionality
        with engine.connect() as conn:
            result = conn.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"))
            tables = [row[0] for row in result]
            print(f"✅ Created tables: {tables}")
            
        return True
        
    except Exception as e:
        print(f"❌ Table recreation failed: {e}")
        import traceback
        print(traceback.format_exc())
        return False

if __name__ == "__main__":
    recreate_tables()
