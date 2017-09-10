import sys
import json
from random import uniform, randint
from datetime import datetime
from wheels import db
from wheels.models import User, Vehicle, db_whoosh

def init_user_db():
	db.drop_all()
	db_whoosh()
	db.create_all()
	admin = User(email='admin@example.com',
					 phone='333-333-3333',
					 name='Admin',
					 surname='Admin',
					 password='pass123',
					 bday=datetime.strptime(datetime.now().strftime("%y-%m-%d"), '%y-%m-%d').date())
	db.session.add(admin)
	db.session.commit()
	users = User.query.all()
	print ('Email: {0}').format(users[0].email)

	with open('vehicle_base.json') as f:
		cars = json.load(f)
		for car in cars:
			v = Vehicle(brand=car['brand'],
						model=car['model'],
						year=car['year'],
						show_name=car['show_name'],
						price=car['price'],
						rating=uniform(1.0, 5.0),
						review_count=randint(1, 30),
						description=car['description'],
						owner=admin)
			print v.show_name, v.price, v.rating
			db.session.add(v)
		db.session.commit()

if __name__ == "__main__":
	if len(sys.argv) > 1:
		if sys.argv[1] == 'init':
			init_user_db()
	else:
		print 'Usage: flask/bin/python database.py init'