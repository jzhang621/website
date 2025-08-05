import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {

  try {
    const body = await request.json();
    const { path } = body;
    
    if (!path) {
      return NextResponse.json(
        { message: 'Path is required' },
        { status: 400 }
      );
    }
    
    revalidatePath(path);
    
    return NextResponse.json({
      message: `Path ${path} revalidated successfully`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Failed to revalidate' },
      { status: 500 }
    );
  }
}

export async function GET() {

  try {
    revalidatePath('/isr-path-test');
    
    return NextResponse.json({
      message: 'Path /isr-path-test revalidated successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Failed to revalidate' },
      { status: 500 }
    );
  }
}