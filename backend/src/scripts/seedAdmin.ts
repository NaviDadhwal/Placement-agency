import mongoose from 'mongoose';
import dns from 'dns';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { env } from '../config/env.js';

const seedAdmin = async () => {
  try {
    try {
      if (dns.setDefaultResultOrder) dns.setDefaultResultOrder('ipv4first');
      dns.setServers(['8.8.8.8', '1.1.1.1']);
    } catch {}
    await mongoose.connect(env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas for seeding...');

    const email = 'admin@nextstepplacements.com';
    const existing = await User.findOne({ email });

    if (existing) {
      console.log(`ℹ️ Admin user (${email}) already exists.`);
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash('AdminPass123!', 10);
    const admin = await User.create({
      email,
      passwordHash,
      role: 'ADMIN',
    });

    console.log(`✅ Admin user seeded successfully!`);
    console.log(`📧 Email: ${admin.email}`);
    console.log(`🔑 Password: AdminPass123!\n`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding admin user:', err);
    process.exit(1);
  }
};

seedAdmin();
