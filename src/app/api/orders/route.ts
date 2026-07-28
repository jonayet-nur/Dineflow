// src/app/api/orders/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 📩 ফন্টএন্ড থেকে আসা অর্ডারের ডেটা পাওয়া যাবে এখানে
    console.log('New Order Received:', body);

    // 💡 এখানে আপনার ডাটাবেসে (MongoDB/Prisma/PostgreSQL) সেভ করার লজিক লিখবেন
    /* 
      Example with MongoDB/Mongoose:
      await dbConnect();
      const newOrder = await Order.create(body);
    */

    return NextResponse.json(
      { success: true, message: 'Order placed successfully!', order: body },
      { status: 201 }
    );
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to place order' },
      { status: 500 }
    );
  }
}