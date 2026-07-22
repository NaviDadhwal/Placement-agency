const mongoose = require('mongoose');
const dns = require('dns');

if (dns.setDefaultResultOrder) dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '1.1.1.1']);

// Use tlsAllowInvalidCertificates=true to bypass local Windows SSL filter / SSL alert 80
const uri = 'mongodb+srv://Navi:cuA3BhRZqqthxkwA@makemyaim.hgaexfh.mongodb.net/makemyaim?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true';

async function testAtlas() {
  console.log('Connecting with TLS bypass to MongoDB Atlas...');
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('🎉 LIVE MONGO DB ATLAS CONNECTED SUCCESSFULLY!');
    console.log('Host:', mongoose.connection.host);

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections in database:', collections.map(c => c.name));

    // Test Write Document
    const result = await mongoose.connection.db.collection('candidateleads').insertOne({
      fullName: 'Live Atlas Verification Candidate',
      phone: '9876543210',
      preferredLocation: 'Ludhiana',
      industry: 'IT & Software',
      status: 'NEW',
      isSolved: false,
      createdAt: new Date()
    });

    console.log('✅ Document created in live MongoDB Atlas! Inserted ID:', result.insertedId);
    process.exit(0);
  } catch (err) {
    console.error('❌ MONGODB ERROR:', err.message);
    process.exit(1);
  }
}

testAtlas();
