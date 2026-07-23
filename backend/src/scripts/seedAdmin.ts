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
    const altEmail = 'admin@makemyaim.com';
    const passwordHash = await bcrypt.hash('AdminPass123!', 10);

    // Upsert primary admin user
    await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { email: email.toLowerCase(), passwordHash, role: 'ADMIN' },
      { upsert: true, new: true }
    );

    // Upsert alt admin user
    await User.findOneAndUpdate(
      { email: altEmail.toLowerCase() },
      { email: altEmail.toLowerCase(), passwordHash, role: 'ADMIN' },
      { upsert: true, new: true }
    );

    console.log(`✅ Admin user credentials updated in live MongoDB Atlas!`);
    console.log(`📧 Email: ${email} OR ${altEmail}`);
    console.log(`🔑 Password: AdminPass123!\n`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding admin user:', err);
    process.exit(1);
  }
};

seedAdmin();
