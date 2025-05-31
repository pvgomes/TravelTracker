import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUserByUsername } from '../../../lib/user';
import { hashPassword } from '../../../lib/auth';
import { insertUserSchema } from '../../../shared/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = insertUserSchema.parse(body);
    
    // Check if user already exists
    const existingUser = await getUserByUsername(validatedData.username);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 400 }
      );
    }

    // Hash the password and create the user
    const hashedPassword = await hashPassword(validatedData.password);
    const user = await createUser({
      ...validatedData,
      password: hashedPassword,
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}