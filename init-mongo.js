// Init script for MongoDB
db = db.getSiblingDB('admin');

// Xác thực với root user
db.auth('admin', 'password123');

// Tạo database food_delivery và collections
db = db.getSiblingDB('food_delivery');

// Tạo collections (để database hiển thị)
db.createCollection('users');
db.createCollection('restaurants');
db.createCollection('orders');

// Tạo user cho database food_delivery
db.createUser({
    user: 'admin',
    pwd: 'password123',
    roles: [
        {
            role: 'readWrite',
            db: 'food_delivery'
        }
    ]
});

console.log('✅ MongoDB initialized with database: food_delivery');
console.log('✅ Created collections: users, restaurants, orders');

